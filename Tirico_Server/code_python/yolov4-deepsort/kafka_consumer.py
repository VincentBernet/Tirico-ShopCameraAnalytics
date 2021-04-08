import json
from kafka import KafkaConsumer
import mysql.connector

# Connection to the mySql database

db = mysql.connector.connect(
 host="mysql-pa8.alwaysdata.net",
  user="pa8_acc",
  password="5wtE3Cx8W",
  database="pa8_bddv2")

mycursor = db.cursor()


# Define the consumer monitoring the store's capacity
consumer = KafkaConsumer("store-capacity", bootstrap_servers='localhost:9092')

for message in consumer:
    # Get information from json message
    person = json.loads(message.value.decode())
    trackID = person['trackID']
    frame = person['frame']
    count = person['count']
    time = person['time']

    # Push information into the database
    sql = "UPDATE Local SET Ccap = %s WHERE ID = %s"
    val = (count, 2)
    mycursor.execute(sql, val)
    db.commit()

    print("Store occupancy at {} : {}".format(time, count))
    

    #print("{}{} {} ({})".format("+" if count_diff > 0 else "",count_diff, station["address"], contract))
    #Disponibility : Occupancy - (surface totale / 8m2)

    