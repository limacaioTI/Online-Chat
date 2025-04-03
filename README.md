💬 Chat em Tempo Real com WebSockets
Este é um projeto de chat em tempo real utilizando WebSockets. Ele permite que múltiplos usuários conversem de forma dinâmica através de um servidor WebSocket.

🚀 Tecnologias Utilizadas
Node.js
WebSockets (ws)
JavaScript (Frontend e Backend)
HTML & CSS
dotenv (para variáveis de ambiente)

📂 Estrutura do Projeto
bash
Copiar
Editar
📂 chat-app
 ├── 📁 src
 │   ├── server.js  # Servidor WebSocket
 │   ├── package.json  # Dependências do projeto
 │   ├── .env  # Variáveis de ambiente (PORT)
 │
 ├── 📁 public
 │   ├── index.html  # Interface do chat
 │   ├── css/style.css  # Estilos do chat
 │   ├── js/script.js  # Lógica do frontend
 │   ├── images/  # Assets visuais
 │
 ├── README.md  # Documentação do projeto

⚙️ Como Rodar o Projeto

1️⃣ Clonar o Repositório
bash
Copiar
Editar
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

2️⃣ Instalar Dependências
bash
Copiar
Editar
npm install
3️⃣ Configurar Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto e defina a porta:
ini
Copiar
Editar
PORT=8080

4️⃣ Iniciar o Servidor
Para rodar o servidor em modo normal:
bash
Copiar
Editar
npm start
Ou em modo de desenvolvimento (com watch):
bash
Copiar
Editar
npm run dev
O servidor WebSocket será iniciado e estará ouvindo conexões na porta especificada.

5️⃣ Rodar o Frontend
Basta abrir o index.html no navegador para testar o chat.

📜 Funcionalidades
✅ Login com nome de usuário personalizado
✅ Envio de mensagens em tempo real
✅ Mensagens diferenciadas para o usuário e outros participantes
✅ Exibição do horário de cada mensagem
✅ Mensagem de entrada para novos usuários
✅ Estilização moderna e responsiva
