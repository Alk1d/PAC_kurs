from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
fakeBooksData = [
    {
        "id": 1,
        "name": "Евгений Онегин",
        "genre": [
            {
                "id": 2,
                "name": "Роман в стихах"
            }
        ],
        "author": "Александр Сергеевич Пушкин",
        "status": 0,
        "description": "Лежит на полке"
    },
    {
        "id": 2,
        "name": "Дубровский",
        "genre": [
            {
                "id": 1,
                "name": "Роман"
            }
        ],
        "author": "Александр Сергеевич Пушкин",
        "status": 1
    },
    {
        "id": 3,
        "name": "Мертвые души",
        "genre": [],
        "author": "Николай Васильевич Гоголь",
        "status": 2
    },
    {
        "id": 4,
        "name": "Преступление и наказание",
        "author": "Фёдор Достоевский",
        "status": 2,
        "description": "Отдал Ивану Ивановичу"
    }
]

fakeResponseUserData =  {
        "access_token": "token_user",
        "username": "user",
        "role": "user"
    }

fakeResponseGuestData =  {
        "access_token": "token_guest",
        "username": "guest",
        "role": "guest"
    }

@app.route('/login', methods=['POST'])
def handle_login():
    request_body = request.get_json()
    if (request_body['login'] == "user" and request_body['password'] == "123"):
        return jsonify(fakeResponseUserData)
    if (request_body['login'] == "guest" and request_body['password'] == "123"):
        return jsonify(fakeResponseGuestData)
    return jsonify({"message": "Invalid username or password"}), 401

@app.route('/books', methods=['GET'])
def handle_getBooks():
    if request.method == 'GET':
        return jsonify(fakeBooksData), 200
    else:
        return jsonify({"message": "Request handled"}), 200
    
@app.route('/books/book', methods=['POST', 'PUT', 'DELETE'])
def handle_books():
    return jsonify({"message": "Request handled"}), 200
    
if __name__ == '__main__':
    app.run(debug=True, port=5000)