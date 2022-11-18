from django.contrib import admin
from .models import ParkingSlot


@admin.register(ParkingSlot)
class ParkingSlotGroupAdmin(admin.ModelAdmin):
	list_display=('id','parking_slot_number','parking_slot_status')