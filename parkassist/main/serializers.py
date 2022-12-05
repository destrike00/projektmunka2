from rest_framework import serializers

from members.models import TblVehicleOwner
class RegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(max_length=128,min_length=6,write_only=True)
    class Meta:
        model=TblVehicleOwner
        fields="__all__"


    def create(self,validated_data):
         return TblVehicleOwner.objects.create_user(**validated_data)