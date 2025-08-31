from rest_framework import serializers
from .models import Product
from .models import Cart, CartItem



#!--------------------------------------------------------------------------------------
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'description', 'price', 'image','descriptionProduct','details']

class DetailedProductSerializer(serializers.ModelSerializer):
    similar_products = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id", "name", "price", "slug", "image", "description", "similar_products",'descriptionProduct','details']

    def get_similar_products(self, product):
        # ✅ Use 'product' (not 'products') in the method parameter
        similar = Product.objects.filter(category=product.category).exclude(id=product.id)[:5]  # Optional limit
        serializer = ProductSerializer(similar, many=True, context=self.context)  # ✅ context is important for absolute URLs
        return serializer.data



#?------------------cart----------------------------------------------------
#! CartItem Serializer

class CartItemSerializer(serializers.ModelSerializer):
    product_title = serializers.ReadOnlyField(source='product.title')
    product_price = serializers.ReadOnlyField(source='product.price')
    total_price = serializers.SerializerMethodField()
    product = ProductSerializer(read_only=True)
    product_slug = serializers.ReadOnlyField(source='product.slug')


    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'product', 'quantity', 'total_price','product_price','product_title','product_slug']

    def get_total_price(self, obj):
        if obj.product:
            return obj.quantity * obj.product.price
        return 0  # ✅ corrected


#!------------------------------  Cart Serializer-----------------------------
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)  # related_name="items" assumed
    total_price = serializers.SerializerMethodField()
    num_of_items = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'cart_code', 'user', 'paid', 'created_at', 'modified_at', 'items', 'total_price', 'num_of_items']
        read_only_fields = ['cart_code', 'created_at', 'modified_at', 'total_price']

    def get_total_price(self, obj):
        # ✅ Sum the total of all items in the cart
        total_price=sum(item.quantity * item.product.price for item in obj.items.all() if item.product )
        return total_price

    def get_num_of_items(self, obj):
        # ✅ Sum total quantity of items in the cart
        num_of_items=sum(item.quantity for item in obj.items.all())
        return num_of_items



#!--------------------------------to update cart icon- item no----------------------------

class SimpleCartSerializer(serializers.ModelSerializer):
    num_of_items = serializers.SerializerMethodField()  # ✅ Declare method field

    class Meta:
        model = Cart
        fields = ["id", "cart_code", "num_of_items","items"]

    def get_num_of_items(self, cart):
        num_of_items=sum([item.quantity for item in cart.items.all()])
        return num_of_items
