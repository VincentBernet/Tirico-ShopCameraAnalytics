# Tirico-ShopCameraAnalytics

## Elevator pitch 

<p align="justify"> Tirico is a web-based decision support application for all store managers. It allows, from the analysis of camera images, to obtain valuable information, statistics and graphs on customer behavior, allowing your store managers to make the best decisions on the layout of the shelves. Notably on the customer journey in your shelves, via for example heat maps, or graphs on the relationship between the time spent in a department and the money spent at the cash register for the products of this same department. All our studies aim to put into perspective the correlation between the customer behavior analyzed via our camera and the analysis of the receipts. Finally, our AI-generated tips help you to better decipher our graphs and suggest possible initiatives.
 </p>

We help you to better understand your customers behaviors, in order to optimize your sales!

Solution realized with :
- **Electron** for the front-end part (html, css, js)
- **Tenserflow** for the image analysis and the machine learning part (with some python for the IA part)

---

## Table of Contents 

- **[Application](#application)**
- **[Installation](#installation)**
- **[Functionalities](#features)**
- **[Team's Contact](#team)**
- **[Licence](#Licences)**

---
<a name='application'></a>
## Application

***Find all the data in the form of graphs :***
<p align="center"><img src="Tirico_Client/ressource/demo/dash_commwhite.JPG"\></p>

***Select your sales area and indicate the types of products sold :***
<p align="center"><img src="Tirico_Client/ressource/demo/selection_zone.gif"\></p>

***Find your heat maps of the different zones according to their popularity and the correlation with their specifics sells :***
<p align="center"><img src="Tirico_Client/ressource/demo/heatmap.JPG"\></p>

***Demo of the tracking system in a street :***
<p align="center"><img src="Tirico_Server/code_python/yolov4-deepsort/data/helpers/demo.gif"\></p>

---
<a name='installation'></a>
## Installation

In your installation folder, create your git and connect it to this repository : 
``` python
git init
git remote add origin https://github.com/VincentBernet/Tirico-ShopCameraAnalitics
git pull origin master
```
 
To then install all the components necessary for the application :
``` python
npm install
Installer dans Tirico_Server/code_python/data le fichier suivant : 
https://drive.google.com/open?id=1cewMfusmPjYWbrnuJRuKhPMwRe_b9PaT (yolov4.weights)
```

To start the web-app :
``` javascript
npm start
```
 
For the python part (allowing generation of heat map, AI generated tips etc.) :  
Install pip or anaconda to install libraries more easily :

``` javascript
pip install pandas                         (pour réaliser les graphes)
pip install plotly                         (pour réaliser les graphes)
pip install -c plotly plotly-orca          (pour save en png les graphes)
pip install seaborn                        (pour réaliser la HeatMap)
```
Connection Data set : 
- Identifiant : vb@gmail.com | Mot de Passe : 123

---
<a name='features'></a>
## Functionalities
On this application we have implemented multiple features such as :
 - Login/Register/Logout/ForgottenPassword to access your account and your various shop analyses.
 - Several analytics such as heat maps, affluence graphs, purchase conversion in relation to the time spent by the customer in each department, department analysis etc. 
 
---
<a name='team'></a>
## Team

> The whole application was realized by a team of seven students during their engineering course at EFREI PARIS : <br> 

 - **[Jean Hecke](https://www.linkedin.com/in/jean-hecke-92060015b/)** & **[Louis Gailhac](https://www.linkedin.com/in/gailhac-louis/)** & **[Serge Nicolas Excoffier](https://www.linkedin.com/in/serge-excoffier/)**
 - **[Hélène Boersma](https://www.linkedin.com/in/h%C3%A9l%C3%A8ne-boersma-a0a16b17b/)** & **[Emeline Bagoris](https://www.linkedin.com/in/emeline-bagoris-116905142/)**
 - **[Sébastien Friedberg](https://www.linkedin.com/in/sebastien-friedberg/)** & **[Vincent Bernet](https://www.linkedin.com/in/vincent-bernet/)**

> Feel free to contact us on Github or on Linkedin

---
<a name='Licences'></a>
## Licence

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2021 © **[Tirico's Team](#team)**.
