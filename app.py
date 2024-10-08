from flask import Flask, render_template, redirect, url_for, request
import sqlite3

app = Flask(__name__)

def get_db_connection():
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    return connection

@app.route('/')
def index():
    connection = get_db_connection()
    tasks = connection.execute('SELECT * FROM TASK ORDER BY POSITION').fetchall()
    connection.close()
    return render_template('index.html', tasks=tasks)

@app.route('/create')
def create():
    return render_template('create.html')

@app.route('/store', methods=['POST'])
def store():
    name = request.form['name']
    description = request.form['description']
    connection = get_db_connection()

    last_position = connection.execute('SELECT MAX(POSITION) FROM TASK').fetchone()[0]
    if last_position is None:
        last_position = 0

    connection.execute('INSERT INTO TASK (NAME, DESCRIPTION, STATUS, POSITION) VALUES (?, ?, ?, ?)', (name, description, False, last_position + 1))
    connection.commit()
    connection.close()
    return redirect(url_for('index'))

@app.route('/show/<int:task_id>')
def show(task_id):
    connection = get_db_connection()
    result = connection.execute('SELECT * FROM TASK WHERE ID = ?', (task_id,)).fetchone()
    connection.close()
    return render_template('show.html', task=result)

@app.route('/toggle_status/<int:task_id>', methods=['POST'])
def toggle_status(task_id):
    connection = get_db_connection()
    current_status_str = request.form.get('status')
    current_status = current_status_str == 'True'
    new_status = not current_status
    connection.execute('UPDATE TASK SET STATUS = ? WHERE ID = ?', (new_status, task_id))
    connection.commit()
    connection.close()
    return redirect(url_for('index'))

@app.route('/edit/<int:task_id>')
def edit(task_id):
    connection = get_db_connection()
    result = connection.execute('SELECT * FROM TASK WHERE ID = ?', (task_id,)).fetchone()
    connection.close()
    return render_template('edit.html', task=result)

@app.route('/update/<int:task_id>', methods=['POST'])
def update(task_id):
    name = request.form['name']
    description = request.form['description']

    connection = get_db_connection()
    connection.execute('UPDATE TASK SET NAME = ?, DESCRIPTION = ? WHERE ID = ?', (name, description, task_id))
    connection.commit()
    connection.close()
    return redirect(url_for('index'))

@app.route('/delete/<int:task_id>', methods=['POST'])
def delete(task_id):
    connection = get_db_connection()
    connection.execute('DELETE FROM TASK WHERE ID = ?', (task_id,))
    connection.commit()
    connection.close()
    return redirect(url_for('index'))

@app.route('/update_task_order', methods=['POST'])
def update_task_order():
    task_order = request.json.get('order', [])    
    connection = get_db_connection()
    for task in task_order:
        connection.execute('UPDATE TASK SET POSITION = ? WHERE ID = ?',(task['position'], task['id']))
    connection.commit()
    connection.close()

    return '', 204


if __name__ == '__main__':
    app.run(debug=True)
