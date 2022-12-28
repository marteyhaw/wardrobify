from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
import requests

from common.json import ModelEncoder
from .models import Shoe, BinVO


class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = ["closet_name", "bin_number", "bin_size", "import_href", "id"]


class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = ["manufacturer", "model_name", "color","picture_url"]

    def get_extra_data(self, o):
        return {"bin": o.bin.id, "closet_name": o.bin.closet_name}


class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "created",
        "bin",
    ]
    encoders = {
        "bin": BinVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_shoes(request, bin_vo_id=None):

    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoe.objects.filter(bin=bin_vo_id)
        else:
            shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            bin_href = f'/api/bins/{content["bin"]}/'
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid input for bin, or bin not found"},
                status=400,
            )

        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_show_shoe(request, pk):
    if request.method == "GET":
        try:
            shoe = Shoe.objects.get(id=pk)
            return JsonResponse(
                shoe,
                encoder=ShoeDetailEncoder,
                safe=False,
            )
        except Shoe.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid shoe id"},
                status=400,
            )
    else:
        count, _ = Shoe.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["DELETE"])
def api_delete_binVO(request, pk):
    count, _ = BinVO.objects.filter(id=pk).delete()
    return JsonResponse({"deleted": count > 0})
