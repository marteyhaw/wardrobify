from django.urls import path

from .api_views import api_list_shoes, api_show_shoe, api_delete_binVO

urlpatterns = [
    path("shoes/", api_list_shoes, name="api_create_shoes"),
    path(
        "bins/<int:bin_vo_id>/shoes/",
        api_list_shoes,
        name="api_list_shoes",
    ),
    path("shoes/<int:pk>/", api_show_shoe, name="api_show_shoe"),
    path("bins/<int:pk>/", api_delete_binVO, name="api_delete_binVO"),
]
