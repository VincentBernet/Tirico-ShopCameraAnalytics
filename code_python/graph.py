import sys

print('Creating the "Affluence" analytics from the csv file')
sys.stdout.flush()

import pandas as pd
                    from matplotlib import pyplot as plt
                    import plotly.express as px

                    df = pd.read_csv("../../ressource/data/output.csv", usecols = ['time', 'class','trackID'])
                    datetime = pd.to_datetime(df['time'])
                    df = df.set_index(pd.DatetimeIndex(datetime))
                    df.head(3)

                    affluence = df.groupby(df.index.second).trackID.nunique()
                    affluence.head(3)
                    x = df.index.second.unique()
                    y = affluence
                    fig = px.bar(df, x, y, title='Affluence/Seconde',
                        labels={
                            "y": "Nombre de badauds",
                            "x": "Horaire (en seconde)"
                        },)

                    fig.update_layout(plot_bgcolor="rgba(0,0,0,0)",
                        paper_bgcolor="rgba(0,0,0,0)",
                        font_family="Taoma",
                        font_color="white",
                        font_size=15,
                        title_font_family="Taoma",
                        title_font_color="white",
                        title_font_size=30,
                        legend_title_font_color="green",
                        width= 1248,
                        height= 648)

                        fig.write_image(file='Affluence.png', format='.png')
                        fig.show()

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









