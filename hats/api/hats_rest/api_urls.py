from django.urls import path

from .views import api_list_hat, api_show_hat, api_locationVO, api_delete_locationVO

urlpatterns = [
    path("hats/", api_list_hat, name="api_create_hats"),
    path(
        "locations/<int:location_vo_id>/hats/",
        api_list_hat,
        name="api_list_hats",
    ),
    path("hats/<int:pk>/", api_show_hat, name="api_show_hat"),
    path("locations", api_locationVO, name="api_location"),
    path("locations/<int:pk>/", api_delete_locationVO, name="api_delete_locationVO"),
]
