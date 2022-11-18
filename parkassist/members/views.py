from django.http import HttpResponse
from django.template import loader
from rest_framework import generics
from rest_framework import serializers
from rest_framework.response import Response
from .models import ParkingSlot


class ParkingSerializer(serializers.ModelSerializer):
	class Meta:
		model=ParkingSlot
		fields='__all__'

		
class ParkingSlotView(generics.ListAPIView):
	serializer_class=ParkingSerializer
	
	def get_queryset(self):
		
		queryset=ParkingSlot.objects.all()
		return queryset
		

def ModifyParkingSlot(request,id):
	data = request.POST
	parkingslot=ParkingSlot.objects.get(pk=id)
	
	if parkingslot.parking_slot_status=='f':
		parkingslot.parking_slot_status='s'
	else:
		parkingslot.parking_slot_status='f'
	parkingslot.save()
	return HttpResponse("Parking Slot Update is responding")
	

class FreeSlotView(generics.GenericAPIView):
	
	def get(self, request):
		
		queryset=ParkingSlot.objects.filter(parking_slot_status='s')
		return Response(queryset.count())