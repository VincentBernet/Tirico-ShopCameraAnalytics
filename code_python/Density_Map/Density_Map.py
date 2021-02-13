import sys,json
data = sys.stdin.readlines()
data = json.loads(data[0])
print(data[0]+" : Recue")



# PA8 : Density Map
import pandas as pd
import seaborn as sb
import numpy as np
from scipy.stats.kde import gaussian_kde 
import matplotlib.pyplot as plt

## Chargement des données
df = pd.read_csv('./ressource/data/output.csv')
df.head(3)

## Pré-traitement des données
### Nettoyage
df.dropna(inplace=True)

### Matrice de données pour la carte de chaleur 
#### 2D array avec les données centrales de chaque bounding box
xpos = (df['xmax'] + df['xmin']) / 2
ypos = (df['ymax'] + df['ymin']) / 2

data = np.array([xpos, ypos])
x, y = data

## Calcul de densité
### Noyau avec filtre de Gauss
k = gaussian_kde(np.vstack([x,y]))
xi, yi = np.mgrid[x.min():x.max():x.size**0.5*1j,y.min():y.max():y.size**0.5*1j]
zi = k(np.vstack([xi.flatten(), yi.flatten()]))

## Density Map
#fig = plt.figure(figsize=(7,8))
#ax1 = fig.add_subplot(211)
fig, ax2 = plt.subplots()
#ax2 = fig.add_subplot(212)

# alpha=0.5 pour mettre les cartes semi-transparentes
#ax1.pcolormesh(xi, yi, zi.reshape(xi.shape), alpha=0.5)
ax2.contourf(xi, yi, zi.reshape(xi.shape), alpha=0.5)

# Définit les axes de la carte
#ax1.set_xlim(x.min(), x.max())
#ax1.set_ylim(y.max(), y.min())
ax2.set_xlim(x.min(), x.max())
ax2.set_ylim(y.max(), y.min())

print("Density_Map 1] Debug Creation + Supperposition HeatMap")
# Superpose la density map avec l'image du magasin
im = plt.imread('./ressource/data/Heatmap_fond.png')
#ax1.imshow(im, extent=[x.min(), x.max(), y.max(), y.min()], aspect='auto')
ax2.imshow(im, extent=[x.min(), x.max(), y.max(), y.min()], aspect='auto')

print("Density_Map 2] Debug Telechargement HeatMap = ok")
# Telechargment de la HeatMap
fig.savefig('./code_python/Density_Map/HeatMap.png')

sys.stdout.flush()