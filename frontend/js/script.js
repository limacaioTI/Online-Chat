// Seleção de elementos do login
const login = document.querySelector(".login");
const loginForm = login.querySelector(".login__form");
const loginInput = login.querySelector(".login__input");

// Seleção de elementos do chat
const chat = document.querySelector(".chat");
const chatForm = chat.querySelector(".chat__form");
const chatInput = chat.querySelector(".chat__input");
const chatMessages = chat.querySelector(".chat__messages");

const colors = [
    "cadetblue",
    "darkgoldenrod",
    "cornflowerblue",
    "darkkhaki",
    "hotpink",
    "gold"
];

const user = { id: "", name: "", color: "" };
let websocket;

const createMessageSelfElement = (content, time) => {
    const div = document.createElement("div");
    const textSpan = document.createElement("span");
    const timeSpan = document.createElement("span");

    div.classList.add("message--self");
    textSpan.innerHTML = content;
    
    timeSpan.classList.add("message--time");
    timeSpan.innerHTML = time;
    
    div.appendChild(textSpan);
    div.appendChild(timeSpan);

    return div;
};

const createMessageOtherElement = (content, sender, senderColor, time) => {
    const div = document.createElement("div");
    const senderSpan = document.createElement("span");
    const textSpan = document.createElement("span");
    const timeSpan = document.createElement("span");

    div.classList.add("message--other");
    senderSpan.classList.add("message--sender");
    senderSpan.style.color = senderColor;
    senderSpan.innerHTML = sender;

    textSpan.innerHTML = content;
    
    timeSpan.classList.add("message--time");
    timeSpan.innerHTML = time;
    
    div.appendChild(senderSpan);
    div.appendChild(textSpan);
    div.appendChild(timeSpan);

    return div;
};

const createJoinMessageElement = (sender) => {
    const div = document.createElement("div");
    div.classList.add("message--join");
    div.innerHTML = `${sender} entrou na conversa.`;
    div.style.textAlign = "center";
    div.style.fontStyle = "italic";
    return div;
};

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};

const scrollScreen = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
};

const processMessage = ({ data }) => {
    const { userId, userName, userColor, content, time, isJoinMessage } = JSON.parse(data);

    // Se for uma mensagem de entrada, mostramos ela sem a parte do "enviado"
    if (isJoinMessage) {
        const joinMessage = createJoinMessageElement(userName);
        chatMessages.appendChild(joinMessage);
    } else {
        const message =
            userId == user.id
                ? createMessageSelfElement(content, time)
                : createMessageOtherElement(content, userName, userColor, time);
        chatMessages.appendChild(message);
    }
    scrollScreen();
};

// Enviar mensagem quando alguém entra
const sendJoinMessage = () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });

    // Enviando a mensagem de "entrou na conversa" para o servidor
    const joinMessage = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: `${user.name} entrou na conversa.`,
        time: formattedTime,
        isJoinMessage: true // Flag para identificar que é uma mensagem de entrada
    };

    websocket.send(JSON.stringify(joinMessage));
};

const handleLogin = (event) => {
    event.preventDefault();

    user.id = crypto.randomUUID();
    user.name = loginInput.value.trim();
    if (!user.name) return;
    user.color = getRandomColor();

    login.style.display = "none";
    chat.style.display = "flex";

    websocket = new WebSocket("wss://chat-backend-ysgf.onrender.com");
    websocket.onopen = () => {
        console.log("Conectado ao servidor WebSocket");
        sendJoinMessage(); // Enviar a mensagem de "entrou na conversa" quando a pessoa entrar
    };
    websocket.onmessage = processMessage;
    websocket.onerror = (error) => console.error("Erro no WebSocket:", error);
    websocket.onclose = () => console.log("Conexão encerrada");
};

const sendMessage = (event) => {
    event.preventDefault();
    if (!chatInput.value.trim()) return;

    const now = new Date();
    const formattedTime = now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });

    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value.trim(),
        time: formattedTime
    };

    websocket.send(JSON.stringify(message));
    chatInput.value = "";
};

loginForm.addEventListener("submit", handleLogin);
chatForm.addEventListener("submit", sendMessage);
