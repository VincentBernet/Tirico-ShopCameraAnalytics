#!/usr/bin/env python
# coding: utf-8

# In[1]:


# This is a sample Python script.

# Press Maj+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import mysql.connector
import datetime
from datetime import datetime

db = mysql.connector.connect(
 host="mysql-pa8.alwaysdata.net",
  user="pa8_acc",
  password="5wtE3Cx8W",
  database="pa8_bddv2",)


# In[2]:


def  Création_liste():
    maxi = 0
    tab_1 = []
    heure = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    h = 3600
    jour = 3600*24
    semaine = 3600*24*7
    for k in range (0,10):
        tab_1 = []
        for i in range (0,24):
            
    
            cursor = db.cursor()
            Vdate = datetime.datetime.fromtimestamp(1577836800 + (h*i) +(jour*k)+ (semaine*0))
            cursor.execute("""SELECT NombreDePassage FROM Stats JOIN StatsToLoc on Stats.ID = StatsToLoc.IDStats WHERE IDLoc = %s AND DateTime = %s""", ( 1 ,Vdate, ))
            a = cursor.fetchone()
            a = a[0]
            
            tab_1.append(a)
            
        
        maxi = tab_1[0]
        for y in tab_1:
            if y >= maxi:
                maxi = y
        
        for p in range (0,24):
            if p == tab_1.index(maxi) : heure[p] = (heure[p]+1)
                
        
    
    maximum = tab_1[0]
    for e in tab_1:
        if e >= maximum:
            maximum = e
    print("l'heure a laquelle le pic de clientèle sera observé demain",  (tab_1.index(maximum)+1))


# In[3]:


def coef_event():
    coef_event1 = 1
    p= datetime.now()
    print(p)
coef_event()


# In[4]:


def Conseil_stocks( coef_event):
    ID = 100
    
    while ID>2 or ID<0 : 
        print ("entrez l'ID de l'objet que vous souhaitez récupérer")
        ID = int(input())
    cursor = db.cursor()
    cursor.execute("""SELECT Nom FROM Item  WHERE ID = %s """, ( ID , ))
    objet = cursor.fetchone()
    objet = objet [0]
    
    cursor.execute("""SELECT Vente_mois FROM Item  WHERE ID = %s """, ( ID , ))
    moy_mois = cursor.fetchone()
    moy_mois = moy_mois[0]
    
    cursor.execute("""SELECT Vente_troisj FROM Item  WHERE ID = %s """, ( ID , ))
    moy_trois_jours = cursor.fetchone()
    moy_trois_jours = moy_trois_jours[0]
    
    valeur_stock = ((moy_mois)-(moy_trois_jours))*(coef_event)
    if valeur_stock<0.90 : print('Il faut augmenter le stock en prévision d’une hausse de consommation future de ',objet)
    elif 0.90<valeur_stock<1.10 : print("Il faut continuer d’alimenter les stocks de manière constante, rien ne va bouger pour le produit ", objet)
    elif valeur_stock>1.10 : print (".Il faut cesser d’alimenter les stocks de ", objet ," ce produit sera en perte de vitesse sur les prochains jours")

Conseil_stocks(1)


# In[ ]:




