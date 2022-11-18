from django.contrib import admin
from .models import TblParkingSpot


@admin.register(TblParkingSpot)
class TblParkingSpotGroupAdmin(admin.ModelAdmin):
	list_display=('parking_slot_id','parking_slot_number','parking_slot_status')