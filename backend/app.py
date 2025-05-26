from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tasks = [
    {
        "id": 1,
        "title": "Buy groceries",
        "description": "Milk, Bread, Eggs",
        "category": "Shopping",
        "priority": "High",
        "dueDate": "2025-06-01",
        "completed": False
    },
    {
        "id": 2,
        "title": "Finish project report",
        "description": "Due by end of the week",
        "category": "Work",
        "priority": "Medium",
        "dueDate": "2025-05-30",
        "completed": False
    }
]

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.json
    new_task = {
        "id": max(t['id'] for t in tasks) + 1 if tasks else 1,
        **data
    }
    tasks.append(new_task)
    return jsonify(new_task), 201

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.json
    for task in tasks:
        if task['id'] == task_id:
            task.update(data)
            return jsonify({"message": "Task updated"})
    return jsonify({"message": "Task not found"}), 404

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task['id'] != task_id]
    return jsonify({"message": "Task deleted"})

if __name__ == '__main__':
    app.run(debug=True)
