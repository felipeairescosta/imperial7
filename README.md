# imperial7

Gestão da liga Imperial7.

## Dashboard de Gestão

Foram criados arquivos para um painel administrativo de inscrições usando Python Flask:

- `app.py` - Aplicação Flask principal
- `templates/dashboard.html` - Template HTML
- `static/dashboard.css` - Estilos CSS
- `static/dashboard.js` - Lógica JavaScript
- `requirements.txt` - Dependências Python

### Como executar

1. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```

2. Execute a aplicação:
   ```bash
   python app.py
   ```

3. Abra o navegador em `http://127.0.0.1:5000/`

### Funcionalidades

- **Aba Gestão**: Lista de inscrições com filtros, estatísticas e ações
- **Aba Competição**: Tabela de classificação e artilheiros
- Dados servidos via API REST (endpoints `/api/teams`, `/api/competition`, `/api/scorers`)

### Estrutura

- Dados mockados no `app.py` para demonstração
- Frontend responsivo com abas
- Integração frontend-backend via fetch API

Este dashboard é um protótipo que pode ser integrado a um banco de dados real ou APIs externas.
