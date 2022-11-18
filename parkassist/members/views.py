from django.http import HttpResponse
from django.template import loader
from rest_framework import generics
from rest_framework import serializers
from rest_framework.response import Response
from .models import TblParkingSpot


class ParkingSerializer(serializers.ModelSerializer):
	class Meta:
		model=TblParkingSpot
		fields='__all__'

		
class ParkingSlotView(generics.ListAPIView):
	serializer_class=ParkingSerializer
	
	def get_queryset(self):
		
		queryset=TblParkingSpot.objects.all()
		return queryset
		

def ModifyParkingSlot(request,id):
	data = request.POST
	parkingslot=TblParkingSpot.objects.get(pk=id)

	if parkingslot.parking_slot_status==0:
		parkingslot.parking_slot_status=1
	else:
		parkingslot.parking_slot_status=0
	print(parkingslot.parking_slot_status, '\n')
	parkingslot.save()
	print(parkingslot.parking_slot_status, '\n')

	return HttpResponse("Parking Slot Update is responding")

class FreeSlotView(generics.GenericAPIView):

	def get(self, request):

		queryset=TblParkingSpot.objects.filter(parking_slot_status=0)
		return Response(queryset.count())
