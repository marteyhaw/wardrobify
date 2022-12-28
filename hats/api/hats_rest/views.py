from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import LocationVO, Hat


class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "closet_name",
        "section_number",
        "shelf_number",
        "import_href"]

class HatListEncoder(ModelEncoder):
    model = Hat
    properties = ["id","style","fabric","color","picture_url"]

    def get_extra_data(self, o):
        return {"location": o.location.closet_name}

class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = ["fabric","style","color","picture_url","created","location",]
    encoders = { "location": LocationVODetailEncoder(),}


@require_http_methods(["GET", "POST"])
def api_list_hat(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id is not None:
            hat = Hat.objects.filter(location=location_vo_id)
        else:
            hat = Hat.objects.all()
        return JsonResponse(
            {"hats": hat},
            encoder=HatListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            location_href = f'/api/locations/{content["location"]}/'
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET","DELETE"])
def api_show_hat(request, pk):
    if request.method == "GET":
        try:
            hat = Hat.objects.get(id=pk)
            return JsonResponse(
                hat,
                encoder=HatDetailEncoder,
                safe=False,
            )
        except Hat.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Hat ID"},
                status = 400,
            )
    else:
        count, _ = Hat.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods(["GET"])
def api_locationVO(request):
    if request.method == "GET":
            location = LocationVO.objects.all()
            return JsonResponse(
                location,
                encoder=LocationVODetailEncoder,
                safe=False
            )

@require_http_methods(["DELETE"])
def api_delete_locationVO(request, pk):
    count, _ = LocationVO.objects.filter(id=pk).delete()
    return JsonResponse({"deleted": count > 0})
