import requests
import paho.mqtt.client as mqtt
broker_address="broker.emqx.io"
client = mqtt.Client(protocol=mqtt.MQTTv311)
client.username_pw_set("parking_socket","1a2s3d4f")
client = mqtt.Client("P1")
client.connect(broker_address)
id = "1"
client.publish("parkingslots/update","{}. parkolóhely állapota megváltozott!".format(id))#publish

def update_parking_slot():
    requests.post('http://localhost:8000/updateparkingslots/{}/'.format(id))
update_parking_slot()

