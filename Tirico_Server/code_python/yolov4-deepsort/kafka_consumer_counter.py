import json
from kafka import KafkaConsumer


# Define the consumer monitoring the store's capacity
consumer = KafkaConsumer("store-counter", bootstrap_servers='localhost:9092')

for message in consumer:
    # Get information from json message
    person = json.loads(message.value.decode())
    trackID = person['trackID']
    date = person['date']
    time = person['time']

    print("Store counter at {} : {}".format(time, trackID))
    

    #print("{}{} {} ({})".format("+" if count_diff > 0 else "",count_diff, station["address"], contract))
    #Disponibility : Occupancy - (surface totale / 8m2)

    