from django.db import models
from django.utils.text import slugify
from django.conf import settings


#!----------product------------------------------------------------------
class Product(models.Model):
    CATEGORY = (
        ("Electronics", "ELECTRONICS"),
        ("Groceries", "GROCERIES"),
        ("Clothings", "CLOTHINGS"),
    )

    name = models.CharField(max_length=100)
    slug = models.SlugField(blank=True, null=True)
    image = models.ImageField(upload_to='img/')
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=15, choices=CATEGORY, blank=True, null=True)
    descriptionProduct = models.JSONField(null=True, blank=True)  # store list of bullet points
    details = models.JSONField(null=True, blank=True)      # store dict of product details

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            unique_slug = base_slug
            counter = 1
            while Product.objects.filter(slug=unique_slug).exists():
                unique_slug = f'{base_slug}-{counter}'
                counter += 1
            self.slug = unique_slug
        super().save(*args, **kwargs)

#!--------------------cart---------------------------------------------------------
#! Cart Model
class Cart(models.Model):
    cart_code = models.CharField(max_length=50, unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,null=True,blank=True)
    paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    class Meta:
        unique_together = ('user', 'paid')  # ✅ Enforce one unpaid cart per user

    def __str__(self):
        return self.cart_code

    def total_price(self):
        return sum(item.total_price() for item in self.items.all())


#! CartItem Model
class CartItem(models.Model):
    cart = models.ForeignKey(Cart,related_name="items", on_delete=models.CASCADE )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)



    def __str__(self):
        return f"{self.quantity} x {self.product.name}"

    def total_price(self):
        return self.quantity * self.product.price
