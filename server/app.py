from flask import Flask, jsonify, request
from flask_cors import CORS
import torch
import torch.nn as nn
import json
from torch.nn import functional as F

app = Flask(__name__)
CORS(app)

# Load vocabulary and create encoding/decoding functions
with open('chars.json', 'r', encoding='utf-8') as f:
    chars = json.load(f)
stoi = {ch:i for i, ch in enumerate(chars)}
itos = {i:ch for i, ch in enumerate(chars)}
vocab_size = len(chars)
block_size = 32  # Should match training parameter

def decode(l):
    return ''.join([itos[i] for i in l])

# Load model configuration
with open('model_args.json', 'r') as f:
    model_args = json.load(f)

# Define complete model architecture
class Head(nn.Module):
    def __init__(self, head_size):
        super().__init__()
        self.key = nn.Linear(model_args['n_embd'], head_size, bias=False)
        self.query = nn.Linear(model_args['n_embd'], head_size, bias=False)
        self.value = nn.Linear(model_args['n_embd'], head_size, bias=False)
        self.register_buffer('tril', torch.tril(torch.ones(block_size, block_size)))
        self.dropout = nn.Dropout(0.0)

    def forward(self, x):
        B,T,C = x.shape
        k = self.key(x)
        q = self.query(x)
        wei = q @ k.transpose(-2,-1) * C**-0.5
        wei = wei.masked_fill(self.tril[:T, :T] == 0, float('-inf'))
        wei = F.softmax(wei, dim=-1)
        wei = self.dropout(wei)
        v = self.value(x)
        out = wei @ v
        return out

class MultiHeadAttention(nn.Module):
    def __init__(self, num_heads, head_size):
        super().__init__()
        self.heads = nn.ModuleList([Head(head_size) for _ in range(num_heads)])
        self.proj = nn.Linear(model_args['n_embd'], model_args['n_embd'])
        self.dropout = nn.Dropout(0.0)

    def forward(self, x):
        out = torch.cat([h(x) for h in self.heads], dim=-1)
        out = self.dropout(self.proj(out))
        return out

class FeedFoward(nn.Module):
    def __init__(self, n_embd):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(n_embd, 4 * n_embd),
            nn.ReLU(),
            nn.Linear(4 * n_embd, n_embd),
            nn.Dropout(0.0),
        )

    def forward(self, x):
        return self.net(x)

class Block(nn.Module):
    def __init__(self, n_embd, n_head):
        super().__init__()
        head_size = n_embd // n_head
        self.sa = MultiHeadAttention(n_head, head_size)
        self.ffwd = FeedFoward(n_embd)
        self.ln1 = nn.LayerNorm(n_embd)
        self.ln2 = nn.LayerNorm(n_embd)

    def forward(self, x):
        x = x + self.sa(self.ln1(x))
        x = x + self.ffwd(self.ln2(x))
        return x

class BigramLanguageModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.token_embedding_table = nn.Embedding(model_args['vocab_size'], model_args['n_embd'])
        self.position_embedding_table = nn.Embedding(model_args['block_size'], model_args['n_embd'])
        self.blocks = nn.Sequential(*[Block(model_args['n_embd'], model_args['n_head']) 
                                    for _ in range(model_args['n_layer'])])
        self.ln_f = nn.LayerNorm(model_args['n_embd'])
        self.lm_head = nn.Linear(model_args['n_embd'], model_args['vocab_size'])

    def forward(self, idx, targets=None):
        B, T = idx.shape
        tok_emb = self.token_embedding_table(idx)
        pos_emb = self.position_embedding_table(torch.arange(T, device=idx.device))
        x = tok_emb + pos_emb
        x = self.blocks(x)
        x = self.ln_f(x)
        logits = self.lm_head(x)
        return logits, None

    def generate(self, idx, max_new_tokens):
        for _ in range(max_new_tokens):
            idx_cond = idx[:, -block_size:]
            logits, _ = self(idx_cond)
            logits = logits[:, -1, :]
            probs = F.softmax(logits, dim=-1)
            idx_next = torch.multinomial(probs, num_samples=1)
            idx = torch.cat((idx, idx_next), dim=1)
        return idx

# Initialize and load model
model = BigramLanguageModel()
model.load_state_dict(torch.load('model.pth', map_location='cpu'))
model.eval()

@app.route('/generate', methods=['POST'])
def generate_text():
    data = request.get_json()
    prompt = data.get('prompt', '')
    max_tokens = data.get('max_tokens', 200)
    
    # Encode input and convert to tensor
    context = torch.tensor([stoi[c] for c in prompt], dtype=torch.long).unsqueeze(0)
    
    # Generate text
    with torch.no_grad():
        generated = model.generate(context, max_new_tokens=max_tokens)
    
    # Decode and return result
    generated_text = decode(generated[0].tolist())
    return jsonify({'generated_text': generated_text})

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
        "status": "не прочитана",
        "description": "Лежит на полке"
    },
    {
        "id": 2,
        "name": "Дубровский",
        "genre": [
            {
                "id": 1,
                "name": "Роман"
            },
            {
                "id": 3,
                "name": "Драма"
            }
        ],
        "author": "Александр Сергеевич Пушкин",
        "status": "отдана"
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

@app.route('/generate', methods=['POST'])
def generate():
    prompt = request.json['prompt']
    context = torch.tensor([stoi[c] for c in prompt], dtype=torch.long).unsqueeze(0)
    generated = model.generate(context, max_new_tokens=200)[0].tolist()
    return jsonify({'text': decode(generated)})

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