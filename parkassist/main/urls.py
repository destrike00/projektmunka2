from django.contrib import admin
from django.urls import include, path
from members.views import ParkingSlotView
from members.views import ModifyParkingSlot
from members.views import FreeSlotView


urlpatterns = [
	path('admin/', admin.site.urls),
	path('test/', ParkingSlotView.as_view()),
	path('update/<int:id>/',ModifyParkingSlot, name="modify-parkingslot"),
	path('free/', FreeSlotView.as_view()),
]