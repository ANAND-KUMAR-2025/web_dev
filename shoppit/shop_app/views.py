from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Product
from  .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework import status
from .serializers import DetailedProductSerializer
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem
from .serializers import CartSerializer,CartItemSerializer,DetailedProductSerializer,SimpleCartSerializer



# Create your views here.


@api_view(["GET"])
def products(request):
    products=Product.objects.all()
    serializer=ProductSerializer(products, many=True)
    lookup_field='slug'
    return Response(serializer.data)

@api_view(['GET'])                                               # Allow only GET requests for this view
def get_product_detail(request, slug):                           # View to fetch product details using slug from URL
    product = get_object_or_404(Product, slug=slug)              # Fetch product or return 404 if not found
    serializer = DetailedProductSerializer(product, many=False)  # Serialize the single product object
    return Response(serializer.data)                             # Return serialized product data as JSON response

#!-----------------------cart-----------------------------------
@api_view(['POST'])
def add_item(request):
    cart_code = request.data.get("cart_code")
    product_id = request.data.get("product_id")

    if not cart_code or not product_id:
        return Response({"error": "cart_code and product_id are required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

    # Get or create the cart
    cart, _ = Cart.objects.get_or_create(cart_code=cart_code)

    # Get or create the cart item
    cartitem, created = CartItem.objects.get_or_create(cart=cart, product=product)

    if not created:
        cartitem.quantity += 1  # increment quantity if already exists
    else:
        cartitem.quantity = 1  # initialize quantity

    cartitem.save()

    serializer = CartItemSerializer(cartitem)
    return Response({
        "data": serializer.data,
        "message": "CartItem created or updated successfully"
    }, status=status.HTTP_201_CREATED)


@api_view(['PATCH'])
def update_cart_item_quantity(request, item_id):
    """
    PATCH request to increase or decrease quantity of a CartItem
    """
    try:
        item = CartItem.objects.get(id=item_id)
    except CartItem.DoesNotExist:
        return Response({'error': 'CartItem not found'}, status=status.HTTP_404_NOT_FOUND)

    quantity = request.data.get('quantity')

    if quantity is None or int(quantity) < 0:
        return Response({'error': 'Quantity must be a non-negative integer'}, status=status.HTTP_400_BAD_REQUEST)

    quantity = int(quantity)

    if quantity == 0:
        item.delete()
        return Response({'message': 'Item removed from cart'}, status=status.HTTP_204_NO_CONTENT)

    item.quantity = quantity
    item.save()
    serializer = CartItemSerializer(item)
    return Response(serializer.data, status=status.HTTP_200_OK)

#!-------------cart_code--------------------------------
@api_view(['GET'])
def get_cart_items(request, cart_code):
    try:
        cart = Cart.objects.get(cart_code=cart_code)
    except Cart.DoesNotExist:
        return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)

    items = CartItem.objects.filter(cart=cart)
    serializer = CartItemSerializer(items, many=True)
    return Response({"cart_code": cart_code, "items": serializer.data}, status=status.HTTP_200_OK)

#!-------------------------to delete the item --------------------------------------------
@api_view(['DELETE'])
def delete_cart_item(request, item_id):
    try:
        item = CartItem.objects.get(id=item_id)
        item.delete()
        return Response({"message": "Item deleted"}, status=status.HTTP_204_NO_CONTENT)
    except CartItem.DoesNotExist:
        return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)

#!----------------to clear Cart----------------------------------------------

@api_view(['DELETE'])
def clear_cart(request, cart_code):
    try:
        cart = Cart.objects.get(cart_code=cart_code)
        CartItem.objects.filter(cart=cart).delete()
        return Response({"message": "Cart cleared"}, status=status.HTTP_204_NO_CONTENT)
    except Cart.DoesNotExist:
        return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)

#!--------------------------to check product in cart-------------------------------------

@api_view(['GET'])
def product_in_cart(request):
    cart_code = request.query_params.get("cart_code")
    product_id = request.query_params.get("product_id")

    cart = Cart.objects.get(cart_code=cart_code)
    product = Product.objects.get(id=product_id)

    product_exists_in_cart = CartItem.objects.filter(cart=cart, product=product).exists()

    return Response({"product_in_cart": product_exists_in_cart})

#!--------------------------------to update cart icon- item no------------------

@api_view(['GET'])
def get_cart_stat(request):
    cart_code = request.GET.get("cart_code")
    cart = get_object_or_404(Cart, cart_code=cart_code)
    items = CartItem.objects.filter(cart=cart)

    serializer = CartItemSerializer(items, many=True)
    return Response({
        "cart_code": cart.cart_code,
        "num_of_items": sum(item.quantity for item in items),
        "items": serializer.data

    })


#!-------------------------------to get cart for cart item------------------------
@api_view(['GET'])
def get_cart(request):
    try:
        cart_code = request.GET.get('cart_code')
        cart = Cart.objects.get(cart_code=cart_code)
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    except Exception as e:
        import traceback
        print("❌ Error in get_cart:", e)
        traceback.print_exc()
        return Response({"error": str(e)}, status=500)
