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
fig = px.bar(df, x, y, title='Affluence/heure')
fig.write_image(file='Affluence.png', format='.png')








