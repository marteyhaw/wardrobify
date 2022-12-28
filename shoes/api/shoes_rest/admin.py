from django.contrib import admin

from .models import Shoe, BinVO

@admin.register(Shoe)
class ShoeAdmin(admin.ModelAdmin):
    pass

@admin.register(BinVO)
class BinVOAdmin(admin.ModelAdmin):
    pass
