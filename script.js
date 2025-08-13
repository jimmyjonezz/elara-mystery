// script.js

const chatHistory = document.getElementById('chat-history');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

// Функция для добавления сообщения в чат
function addMessage(role, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    
    if (role === 'user') {
        messageDiv.classList.add('message--user');
        messageDiv.innerHTML = `
            <div class="message__avatar">Ты</div>
            <div class="message__content"><p>${text}</p></div>
        `;
    } else if (role === 'elara') {
        messageDiv.classList.add('message--elara');
        // Разбиваем текст на абзацы
        const paragraphs = text.split('\n').filter(p => p.trim() !== '').map(p => `<p>${p}</p>`).join('');
        messageDiv.innerHTML = `
            <div class="message__avatar">Э</div>
            <div class="message__content">${paragraphs}</div>
        `;
    } else if (role === 'system') {
        messageDiv.classList.add('message--system');
        messageDiv.innerHTML = `
            <div class="message__avatar">Система</div>
            <div class="message__content"><p><em>${text}</em></p></div>
        `;
        // Сообщения системы будем прокручивать автоматически
    }

    chatHistory.appendChild(messageDiv);
    // Прокрутка вниз
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Функция для имитации ответа Элары (временно)
async function getElaraResponse(userMessage) {
    // Здесь позже будет логика вызова API
    // Пока просто эмулируем задержку и возвращаем заглушку
    addMessage('system', 'Подключаюсь к серверу Элары...');
    
    // Имитация задержки
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Убираем сообщение системы
    chatHistory.removeChild(chatHistory.lastChild);

    // Временный ответ для демонстрации
    const responses = [
        "Это интересный вопрос... Позволь мне вспомнить те дни.",
        "Ты знаешь, в полярной ночи время теряет смысл. Возможно, я немного путаю детали...",
        "Память играет с нами странные шутки. Но чувства, описанные в книге, — они настоящие.",
        "Зачем ты спрашиваешь об этом? Тебе не нравится моя история?",
        "Важно не то, что было, а то, что я почувствовала. Разве нет?",
        "Иногда истина сложнее, чем кажется на первый взгляд."
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return randomResponse;
}

// Обработчик отправки формы
chatForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const message = userInput.value.trim();
    if (!message) return;

    // Добавляем сообщение пользователя
    addMessage('user', message);
    // Очищаем поле ввода и блокируем его
    userInput.value = '';
    userInput.disabled = true;
    chatForm.querySelector('button').disabled = true;

    try {
        // Получаем ответ от Элары
        const response = await getElaraResponse(message);
        addMessage('elara', response);
    } catch (error) {
        console.error("Ошибка при получении ответа:", error);
        addMessage('system', 'Произошла ошибка при соединении. Попробуйте позже.');
    } finally {
        // Разблокируем поле ввода
        userInput.disabled = false;
        chatForm.querySelector('button').disabled = false;
        userInput.focus();
    }
});

// Фокус на поле ввода при загрузке
window.addEventListener('DOMContentLoaded', (event) => {
    userInput.focus();
});
