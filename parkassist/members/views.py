from django.http import HttpResponse
from django.template import loader
from rest_framework import generics
from rest_framework import serializers
from rest_framework.response import Response
from .models import TblParkingSpot
from main.serializers import RegisterSerializer
import json
from django.core.exceptions import ValidationError

from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from django.contrib.auth import get_user_model
User = get_user_model()

class RegisterAPIView(generics.GenericAPIView):
	serializer_class=RegisterSerializer
	def post(self,request):
		serializers=self.serializer_class(data=request.data)
		print("\n\n\n",serializers)
		if serializers.is_valid():
			serializers.save()

			return Response("User created!")

		return Response("Error")

class LoginAPIView(generics.GenericAPIView):

	def post(self,request):
		data = {}
		reqBody = json.loads(request.body)
		email = reqBody['email']
		password = reqBody['password']
		try:

			Account = User.objects.get(email=email)
		except BaseException as e:
			raise ValidationError({"400": f'{str(e)}'})

		token = Token.objects.get_or_create(user=Account)[0].key
		print(token)

		if not Account.check_password(password):
			raise ValidationError({"message": "Incorrect Login credentials"})

		if Account:
			if Account.is_active:
				print(request.user)
				login(request, Account)
				data["message"] = "user logged in"
				data["email_address"] = Account.email

				Res = {"data": data, "token": token}

				return Response(Res)

			else:
				raise ValidationError({"400": f'Account not active'})

		else:
			raise ValidationError({"400": f'Account doesnt exist'})

class ParkingSerializer(serializers.ModelSerializer):
	class Meta:
		model=TblParkingSpot
		fields='__all__'

		
class ParkingSlotView(generics.ListAPIView):
	serializer_class=ParkingSerializer
	
	def get_queryset(self):
		
		queryset=TblParkingSpot.objects.all().order_by('parking_slot_id')
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
