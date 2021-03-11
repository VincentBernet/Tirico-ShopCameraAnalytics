import os
print('Requirement installation')
os.system('pip install -r requirements.txt')
print('Requirement installed')
print('Saving model as a tensorflow model')
os.system('python save_model.py --model yolov4 ')
print('Model saved')
print('Start tracking')
os.system('python object_tracker.py --video 0 --output ./outputs/webcam.avi --model yolov4 --info')
