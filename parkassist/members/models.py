from django.db import models

class ParkingSlot(models.Model):
	id=models.IntegerField(primary_key=True)
	parking_slot_number=models.IntegerField()
	parking_slot_status=models.CharField(max_length=1)