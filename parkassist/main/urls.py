from django.contrib import admin
from django.urls import include, path
from members.views import ParkingSlotView
from members.views import ModifyParkingSlot
from members.views import FreeSlotView
from members.views import RegisterAPIView

from members.views import LoginAPIView


urlpatterns = [
	path('admin/', admin.site.urls),
	path('test/', ParkingSlotView.as_view()),
	path('update/<int:id>/',ModifyParkingSlot, name="modify-parkingslot"),
	path('free/', FreeSlotView.as_view()),
	path('register/',RegisterAPIView.as_view()),
	path('login/',LoginAPIView.as_view())
]