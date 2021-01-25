import sys


print('1Hello from Python!')
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
                     "x": "Horraire"
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
fig.write_image(file='Affluence.png', format='.png')









