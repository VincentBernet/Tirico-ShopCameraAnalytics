import sys

print('Creating the "Affluence" analytics from the csv file')
sys.stdout.flush()

import pandas as pd
df = pd.read_csv("../ressource/data/output.csv")
from matplotlib import pyplot as plt
import plotly.express as px
df['time'].unique()
df['date'].unique()
x =df['time'].value_counts().index
y =df['time'].value_counts().values
fig = px.bar(df, x , y, title='Affluence/heure',
            labels={
                     "y": "Nombre de badeaux",
                     "x": "Horaire"
                 },)
fig.update_layout(
    plot_bgcolor="rgba(0,0,0,0)",
    paper_bgcolor="rgba(0,0,0,0)",
    font_family="Taoma",
    font_color="white",
    title_font_family="Taoma",
    title_font_color="white",
    title_font_size=30,
    legend_title_font_color="green")

print('Saving this anylitic on your machine, replace the last version if already existing')
fig.write_image(file='Affluence/Affluence.png', format='.png')

""" Code HeatMap
df.dropna(inplace=True)
print(df)

from sklearn.preprocessing import MinMaxScaler
# Pour supprimer une colonne df_t = df.drop(columns=['class'])
#scaler = MinMaxScaler()
#df[['xmin', 'ymin', 'xmax', 'ymax']] = scaler.fit_transform(df[['xmin', 'ymin', 'xmax', 'ymax']])
df.describe()

matrix = pd.DataFrame()
matrix['xpos'] = (df['xmax'] + df['xmin']) / 2
matrix['ypos'] = (df['ymax'] + df['ymin']) / 2
matrix.describe()

import numpy as np
m = pd.DataFrame()
m['x'] = np.arange(0,1.1, 0.1)
m['y'] = np.arange(0,1.1, 0.1)
m['count'] = 0
test = pd.DataFrame()
test['xpos'] = [0.05, 0.65, 0.67, 0.12]
test['ypos'] = [0.05, 0.65, 0.67, 0.12]

a = np.array([])
b = np.array([])

for i in m.index:
   if((i-1) >= 0):
      maskX = (matrix['xpos'] < m['x'][i]) & (matrix['xpos'] >= m['x'][i-1]) 
      maskY = (matrix['ypos'] < m['y'][i]) & (matrix['ypos'] >= m['y'][i-1])

      countX = matrix[maskX].count()
      countY = matrix[maskY].count()

      a = np.append(a, countX[0])
      b = np.append(b, countY[0])
    
a = np.append(a, sum(a))
b = np.append(b, sum(b))

m['countX'] = a
m['countY'] = b


import numpy as np 

uniform_data = np.random.rand(4, 6)
uniform_data

import seaborn as sb
import numpy as np
sb.heatmap(uniform_data)

htest = pd.DataFrame(m, columns =['x', 'y', 'countX']) 

sb.heatmap(m)


# ---------------- LN HELL ZONE -------------------

a = np.array([])

for i in m.index:
    if((i-1) >= 0):
        for j in m.index:
            if((j-1) >= 0):
                mask = (matrix['xpos'] < m['x'][i] ) & (matrix['xpos'] >= m['x'][i-1]) & (matrix['ypos'] < m['y'][j]) & (matrix['ypos'] >= m['y'][j-1])
                count = matrix[mask].count()
                print("x=[", m['x'][i-1], ",", m['x'][i], "] & y=[", m['y'][j-1], ",", m['y'][j],"] : count=", count[0])
                a = np.append(a, count[0])

print(a.size)



## Emeline WAR ZONE ##

war = pd.DataFrame()
war['x'] = [1,1,2,5,4,2]
war['y'] = [2,3,2,1,3,4]
war['c'] = [1,2,3,4,5,6]

# group by month and year, get th1e average
war = war.groupby(['x','y']).sum()
war.head()


matrix['c'] = 1
matrix = matrix.round({'xpos': -1, 'ypos': -1, 'c' : 0})
matrix = matrix.groupby(['xpos','ypos']).sum()
matrix

matrix = matrix.unstack(level=-2)
matrix

HeatMap = sb.heatmap(matrix, vmin=0, vmax=10, square = False)
#cmap = 'blues', linewidth = 0.3

figure = HeatMap.get_figure()    
figure.savefig('Heatmap/HeatMap.png', dpi=400)
"""

print('Everything work, loading it on the app')
sys.stdout.flush()









