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

print('Everything work, loading it on the app')
sys.stdout.flush()









