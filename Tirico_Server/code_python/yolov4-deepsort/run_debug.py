import os
print('Start tracking')
os.system('python ./code_python/yolov4-deepsort/object_tracker.py --video 0 --output ./outputs/webcam.avi --model yolov4 --info')
print('End of tracking')
