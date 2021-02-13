import sys,json
data = sys.stdin.readlines()
data = json.loads(data[0])
print(data[0]+" : Recue")

import pandas as pd
from matplotlib import pyplot as plt
import plotly.express as px
print("Affluence 1]  Debug")

df = pd.read_csv("./ressource/data/output.csv", usecols = ['time', 'class','trackID'])
datetime = pd.to_datetime(df['time'])
df = df.set_index(pd.DatetimeIndex(datetime))
df.head(3)
print("Affluence 2]  Debug")


affluence = df.groupby(df.index.second).trackID.nunique()
affluence.head(3)
print("Affluence 3]  Debug")


x = df.index.second.unique()
y = affluence
print("Affluence 4]  Debug")


fig = px.bar(df, x, y, title='Affluence/Seconde',
            labels={
                     "y": "Nombre de badauds",
                     "x": "Horaire (en seconde)"
                 },)
fig.update_layout(
    plot_bgcolor="rgba(0,0,0,0)",
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

print("Affluence 5]  Debug Creation Graphique = ok  ")
sys.stdout.flush()

#Pour assurer qu'orca est bien utilisé, est une solution potentiel mais ne fonctionne pas
#call(['orca', 'graph', json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)])
#print("6] Debug Tentative de call 'orca' pour save plus loins")
#sys.stdout.flush()

#fig.write_image(file='Affluence.png', format='.png')
#print("7] Debug, figure to png")
#sys.stdout.flush()