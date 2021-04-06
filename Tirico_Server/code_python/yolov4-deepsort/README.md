# Be carefull, this program is not meant to be run in standalone mode, the client call this subprogram, it will not work by itself, you have to correct the path if you want to run it alone

Object tracking implemented with YOLOv4, DeepSort, and TensorFlow. YOLOv4 is a state of the art algorithm that uses deep convolutional neural networks to perform object detections. We can take the output of YOLOv4 feed these object detections into Deep SORT (Simple Online and Realtime Tracking with a Deep Association Metric) in order to create a highly accurate object tracker.

- [Requirement](#Getting-Started)
- [Downloading Official YOLOv4 Pre-trained Weights](#Downloading-Official-YOLOv4-Pre-trained-Weights)
- [Running the Tracker](Running-the-Tracker-with-YOLOv4)
- [Editing key parameters and presets](#Editing-key-parameters-and-presets)

# Getting Started
To get started, you need pyhon 3 and pip 19.0 at least installed and added to your system path.



## Downloading Official YOLOv4 Pre-trained Weights
Our object tracker uses YOLOv4 to make the object detections, which deep sort then uses to track. There exists an official pre-trained YOLOv4 object detector model that is able to detect 80 classes. For easy demo purposes we will use the pre-trained weights for our tracker.
Download pre-trained yolov4.weights file: https://drive.google.com/open?id=1cewMfusmPjYWbrnuJRuKhPMwRe_b9PaT

Copy and paste yolov4.weights from your downloads folder into the 'data' folder of this repository.


## Running the Tracker with YOLOv4
To implement the object tracking using YOLOv4, first we convert the .weights into the corresponding TensorFlow model which will be saved to a checkpoints folder. Then all we need to do is run the object_tracker.py script to run our object tracker with YOLOv4, DeepSort and TensorFlow.

We have automatize the set up, configuration, parameter for the installation and usage. It save the model the first time then run the object tracker with presetted parameters. Original code can be found here : https://github.com/theAIGuysCode/yolov4-deepsort

### If you run the code for the first time :
```bash
python first_run_debug.py
```
It will install dependencies with pip and save the model before starting the actual object tracker.
### Else use :
```bash
python run_debug.py
```
## Editing key parameters and presets
If you want to modify settings modify the following line in run_debug.py :
```bash
os.system('python ./code_python/yolov4-deepsort/object_tracker.py --video 0 --output ./outputs/webcam.avi --model yolov4 --info')
```
If you move file or folders don't forget to change the first argument wich is the relative path of your object_tracker.py .

To select a specific webcam select the index of your webcam :
```bash
# instead of :
os.system('python ./code_python/yolov4-deepsort/object_tracker.py --video 0 --output ./outputs/webcam.avi --model yolov4 --info')

# use : 
os.system('python ./code_python/yolov4-deepsort/object_tracker.py --video 1 --output ./outputs/webcam.avi --model yolov4 --info')
# to select your second webcam
```
If you do not want to generate an output video just delete the output arguments : 
```bash
os.system('python ./code_python/yolov4-deepsort/object_tracker.py --video 0  --model yolov4 --info')
```
info argument is needed to generate a cvs file since we implement our csv information generation in the info function.

## Command Line Args Reference

```bash
save_model.py:
  --weights: path to weights file
    (default: './data/yolov4.weights')
  --output: path to output
    (default: './checkpoints/yolov4-416')
  --[no]tiny: yolov4 or yolov4-tiny
    (default: 'False')
  --input_size: define input size of export model
    (default: 416)
  --framework: what framework to use (tf, trt, tflite)
    (default: tf)
  --model: yolov3 or yolov4
    (default: yolov4)
    
 object_tracker.py:
  --video: path to input video (use 0 for webcam)
    (default: './data/video/test.mp4')
  --output: path to output video (remember to set right codec for given format. e.g. XVID for .avi)
    (default: None)
  --output_format: codec used in VideoWriter when saving video to file
    (default: 'XVID)
  --[no]tiny: yolov4 or yolov4-tiny
    (default: 'false')
  --weights: path to weights file
    (default: './checkpoints/yolov4-416')
  --framework: what framework to use (tf, trt, tflite)
    (default: tf)
  --model: yolov3 or yolov4
    (default: yolov4)
  --size: resize images to
    (default: 416)
  --iou: iou threshold
    (default: 0.45)
  --score: confidence threshold
    (default: 0.50)
  --dont_show: dont show video output
    (default: False)
  --info: print detailed info about tracked objects
    (default: False)
```

### References  

https://github.com/theAIGuysCode/yolov4-deepsort
