from django.urls import path
from .  import  views


urlpatterns=[
    path("products",views.products , name="products"),
    path("product_detail/<slug:slug>",views.get_product_detail,name="product_detail"),

    # Cart operations
    path("cart/add/", views.add_item, name="add_item"),
    path("cart/update/<int:item_id>/", views.update_cart_item_quantity, name="update_cart_item_quantity"),
    path("cart/<str:cart_code>/", views.get_cart_items, name="get_cart_items"),
    path("cart/item/delete/<int:item_id>/", views.delete_cart_item, name="delete_cart_item"),
    path("cart/clear/<str:cart_code>/", views.clear_cart, name="clear_cart"),
    path("product_in_cart",views.product_in_cart,name="product_in_cart"),

    path('get_cart_stat', views.get_cart_stat, name='get_cart_stat'),
    path('get_cart', views.get_cart, name='get_cart'),
    


]

#fetching all_products=http://127.0.0.1:8001/products