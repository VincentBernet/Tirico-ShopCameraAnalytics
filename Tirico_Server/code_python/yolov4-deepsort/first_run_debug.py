import os
print('Requirement installation')
os.system('pip install -r requirements.txt')
print('Requirement installed')
print('Saving model as a tensorflow model')
os.system('python save_model.py --model yolov4 ')
print('Model saved')
