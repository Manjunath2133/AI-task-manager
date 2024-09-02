# backend/app.py

from flask import Flask, request, jsonify

app = Flask(__name__)

tasks = []







@app.route('/')
def index():
    return 'Welcome to the AI Task Manager!'

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    task = request.json
    tasks.append(task)
    return jsonify(task), 201

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = next((t for t in tasks if t['id'] == task_id), None)
    if task:
        data = request.json
        task.update(data)
        return jsonify(task)
    return jsonify({'error': 'Task not found'}), 404

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    tasks = [t for t in tasks if t['id'] != task_id]
    return jsonify({'result': 'Task deleted'})

@app.route('/tasks/prioritize', methods=['POST'])
def prioritize():
    tasks_to_prioritize = request.json
    prioritized_tasks = prioritize_tasks(tasks_to_prioritize)
    return jsonify(prioritized_tasks)

def prioritize_tasks(tasks):
    return sorted(tasks, key=lambda x: x['deadline'])

if __name__ == '__main__':
    app.run(debug=True, port=5001)
