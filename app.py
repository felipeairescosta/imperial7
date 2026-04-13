from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Dados mockados para inscrições
teams = [
    {
        'id': 1,
        'time': 'Imperial Strikers',
        'categoria': 'futebol',
        'status': 'confirmado',
        'capitão': 'Carlos Silva',
        'contato': 'carlos@imperial7.com.br',
        'telefone': '(11) 98765-4321',
        'valor': 'R$ 450,00',
        'inscrição': '2026-04-05',
    },
    {
        'id': 2,
        'time': 'Dragões do Vôlei',
        'categoria': 'volei',
        'status': 'aguardando-pagamento',
        'capitão': 'Mariana Santos',
        'contato': 'mariana.santos@email.com',
        'telefone': '(21) 99876-1234',
        'valor': 'R$ 380,00',
        'inscrição': '2026-04-09',
    },
    {
        'id': 3,
        'time': 'Basquete Royals',
        'categoria': 'basquete',
        'status': 'pendente',
        'capitão': 'Pedro Oliveira',
        'contato': 'pedro@royals.com',
        'telefone': '(31) 91234-5678',
        'valor': 'R$ 420,00',
        'inscrição': '2026-04-11',
    },
    {
        'id': 4,
        'time': 'Fúria Imperial',
        'categoria': 'futebol',
        'status': 'confirmado',
        'capitão': 'Luana Ferreira',
        'contato': 'luana@furiatim.com',
        'telefone': '(41) 98712-3456',
        'valor': 'R$ 450,00',
        'inscrição': '2026-04-12',
    },
]

# Dados mockados para competição
competition_data = [
    {
        'posicao': 1,
        'time': 'Imperial Strikers',
        'jogos': 8,
        'vitorias': 6,
        'empates': 1,
        'derrotas': 1,
        'golsPro': 18,
        'golsContra': 7,
        'saldo': 11,
        'pontos': 19,
    },
    {
        'posicao': 2,
        'time': 'Fúria Imperial',
        'jogos': 8,
        'vitorias': 5,
        'empates': 2,
        'derrotas': 1,
        'golsPro': 16,
        'golsContra': 9,
        'saldo': 7,
        'pontos': 17,
    },
    {
        'posicao': 3,
        'time': 'Basquete Royals',
        'jogos': 8,
        'vitorias': 4,
        'empates': 1,
        'derrotas': 3,
        'golsPro': 14,
        'golsContra': 12,
        'saldo': 2,
        'pontos': 13,
    },
    {
        'posicao': 4,
        'time': 'Dragões do Vôlei',
        'jogos': 8,
        'vitorias': 3,
        'empates': 2,
        'derrotas': 3,
        'golsPro': 12,
        'golsContra': 13,
        'saldo': -1,
        'pontos': 11,
    },
]

# Dados mockados para artilheiros
top_scorers = [
    {'nome': 'João Silva', 'time': 'Imperial Strikers', 'gols': 12},
    {'nome': 'Maria Santos', 'time': 'Fúria Imperial', 'gols': 10},
    {'nome': 'Pedro Oliveira', 'time': 'Basquete Royals', 'gols': 8},
    {'nome': 'Ana Ferreira', 'time': 'Dragões do Vôlei', 'gols': 7},
    {'nome': 'Carlos Lima', 'time': 'Imperial Strikers', 'gols': 6},
]

@app.route('/')
def dashboard():
    return render_template('dashboard.html')

@app.route('/api/teams')
def get_teams():
    return jsonify(teams)

@app.route('/api/competition')
def get_competition():
    return jsonify(competition_data)

@app.route('/api/scorers')
def get_scorers():
    return jsonify(top_scorers)

if __name__ == '__main__':
    app.run(debug=True)
