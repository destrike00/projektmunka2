# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

from django.contrib.auth.models import AbstractUser

class TblBooking(models.Model):
    booking_id = models.AutoField(primary_key=True)
    customer = models.ForeignKey('TblVehicleOwner', models.DO_NOTHING)
    vehicle = models.ForeignKey('TblVehicle', models.DO_NOTHING)
    duration_of_booking = models.IntegerField()
    slot = models.ForeignKey('TblParkingSpot', models.DO_NOTHING)
    booking_status = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'tbl_booking'


class TblParkingSpot(models.Model):
    parking_slot_id = models.AutoField(primary_key=True)
    parking_slot_location = models.CharField(max_length=40)
    parking_slot_number = models.IntegerField()
    parking_slot_status = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'tbl_parking_spot'


class TblVehicle(models.Model):
    vehicle_id = models.AutoField(primary_key=True)
    vehicle_category = models.ForeignKey('TblVehicleCategory', models.DO_NOTHING)
    vehicle_plate_number = models.CharField(unique=True, max_length=7)
    vehicle_owner = models.ForeignKey('TblVehicleOwner', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'tbl_vehicle'


class TblVehicleCategory(models.Model):
    vehicle_category_id = models.AutoField(primary_key=True)
    vehicle_category_name = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'tbl_vehicle_category'


class TblVehicleOwner(AbstractUser):
    vehicle_owner_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=150)
    vehicle_owner_contact = models.IntegerField()
    email = models.CharField(max_length=30)


    class Meta:
        managed = False
        db_table = 'tbl_vehicle_owner'