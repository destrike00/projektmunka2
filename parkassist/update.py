import requests

id = "1"
def update_parking_slot():
    requests.post('http://localhost:8000/update/{}/'.format(id))
update_parking_slot()
