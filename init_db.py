import sqlite3

conn = sqlite3.connect('database.db')
print("Opened database successfully")

with open('create.sql') as f:
    conn.executescript(f.read())
conn.commit()
conn.close()