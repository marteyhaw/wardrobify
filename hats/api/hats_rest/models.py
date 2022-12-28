from django.db import models
from django.urls import reverse

class LocationVO(models.Model):
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()
    import_href = models.CharField(max_length=200, unique=True, null= True)

    def __str__(self):
        return self.closet_name

class Hat(models.Model):
    fabric = models.CharField(max_length=250)
    style = models.CharField(max_length=250)
    color = models.CharField(max_length=250)
    picture_url = models.URLField()
    created = models.DateTimeField(auto_now_add=True)

    location = models.ForeignKey(
        LocationVO,
        related_name="hat",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_show_hat", kwargs={"pk": self.pk})

    def __str__(self):
        return self.style

    class Meta:
        ordering = ("style","fabric")
