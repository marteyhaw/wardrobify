from django.db import models
from django.urls import reverse

class BinVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField()
    bin_size = models.PositiveSmallIntegerField()

    def __str__(self):
        return f'{self.import_href} {self.closet_name} ID#{self.id}'

    class Meta:
        verbose_name_plural = "Bin VOs"


class Shoe(models.Model):
    manufacturer = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=100)
    picture_url = models.URLField(null=True)
    created = models.DateTimeField(auto_now_add=True)

    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_show_shoe", kwargs={"pk": self.pk})

    def __str__(self):
        return self.model_name

    class Meta:
        ordering = ("manufacturer", "model_name")
