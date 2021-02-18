import sys,json
data = sys.stdin.readlines()
data = json.loads(data[0])
print(data[0]+" : Recue")
sys.stdout.flush()

import os
os.system('python object_tracker.py --video ./data/video/test.mkv --output ./outputs/demo.avi --model yolov4 --info')
print("Run_debug 1] : Debug final")
sys.stdout.flush()

