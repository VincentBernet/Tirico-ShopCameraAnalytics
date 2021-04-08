@echo Run YoloV4-deepsort


@echo Kafka Initialization
pip install kafka-python
start cmd.exe /k "echo Run Zookeeper & cd C:\Apache\apache-zookeeper-3.6.1-bin\bin & zkserver"
timeout /t 20 /nobreak > NUL
start cmd.exe /k "echo Run Kafka server & cd C:\Apache\kafka_2.13-2.7.0\bin\windows & kafka-server-start.bat C:\Apache\kafka_2.13-2.7.0\config\server.properties"
timeout /t 5 /nobreak > NUL
start cmd.exe /c "echo Create Kafka Topic : capacity-counter & cd C:\Apache\kafka_2.13-2.7.0\bin\windows & kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic capacity-counter"
@echo End of Kafka Initialization


@echo Environment configuration & Run yolov4 deepsort object tracker on video
@echo If a problem occurs, launch run_first_batch.bat
conda activate yolov4-gpu & python object_tracker.py --video ./data/video/test.mp4 --output ./outputs/demo.avi --model yolov4