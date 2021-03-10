import pandas as pd
import sys,json
data = sys.stdin.readlines()
data = json.loads(data[0])

df = pd.read_csv("./ressource/data/output.csv", usecols = ['trackID'])
Count=df['trackID'].max()
print(data[0]+str(Count))
sys.stdout.flush()
