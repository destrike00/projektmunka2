from django.contrib import admin
from .models import TblParkingSpot,TblVehicleOwner
from django.contrib.auth.admin import UserAdmin

@admin.register(TblParkingSpot)
class TblParkingSpotGroupAdmin(admin.ModelAdmin):
	list_display=('parking_slot_location','parking_slot_id','parking_slot_number','parking_slot_status')

admin.site.register(TblVehicleOwner, UserAdmin)