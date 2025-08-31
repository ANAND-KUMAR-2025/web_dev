import { useEffect,useState } from "react";
import api from "../api";



function useCartdata (){
      const cart_code = localStorage.getItem("cart_code");
      const [CartItems, setCartItems] = useState([]);
      const subtotal = CartItems.reduce((acc, item) => acc + item.total_price, 0);
      const [loading,setloading]=useState(false)
    
    
      useEffect(() => {
        if (cart_code) {
          setloading(true)
          api.get(`get_cart_stat?cart_code=${cart_code}`)
            .then(res => {
              setCartItems(res.data.items);
              setloading(false)
            })
            .catch(err => {
              console.log("Failed to fetch cart stats:", err.message);
              setloading(false)
            });
        }
      }, []);
}