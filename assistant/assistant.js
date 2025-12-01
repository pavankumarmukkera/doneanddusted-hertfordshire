document.addEventListener('DOMContentLoaded', () => {
    // Inject Chat HTML
    const chatWidget = document.createElement('div');
    chatWidget.id = 'assistant-widget';
    chatWidget.innerHTML = `
        <button id="assistant-toggle" class="assistant-toggle">
            <i class="fas fa-comment-dots"></i>
        </button>
        <div id="assistant-box" class="assistant-box">
            <div class="assistant-header">
                <div class="assistant-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="assistant-info">
                    <h3>Assistant</h3>
                    <p>Online</p>
                </div>
                <button id="assistant-close" class="assistant-close">&times;</button>
            </div>
            <div id="assistant-messages" class="assistant-messages">
                <div class="message bot">
                    <p>Hello Admin 👋 How can I help today?</p>
                </div>
            </div>
            <div class="assistant-input">
                <input type="text" id="assistant-input-field" placeholder="Type a message...">
                <button id="assistant-send"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    `;
    document.body.appendChild(chatWidget);

    // Elements
    const toggleBtn = document.getElementById('assistant-toggle');
    const chatBox = document.getElementById('assistant-box');
    const closeBtn = document.getElementById('assistant-close');
    const sendBtn = document.getElementById('assistant-send');
    const inputField = document.getElementById('assistant-input-field');
    const messagesContainer = document.getElementById('assistant-messages');

    // Toggle Chat
    toggleBtn.addEventListener('click', () => {
        chatBox.classList.toggle('active');
        if (chatBox.classList.contains('active')) {
            inputField.focus();
        }
    });

    closeBtn.addEventListener('click', () => {
        chatBox.classList.remove('active');
    });

    // Send Message
    function sendMessage() {
        const text = inputField.value.trim();
        if (!text) return;

        // User Message
        addMessage(text, 'user');
        inputField.value = '';

        // Bot Response
        setTimeout(() => {
            const response = getBotResponse(text);
            addMessage(response, 'bot');
        }, 800);
    }

    sendBtn.addEventListener('click', sendMessage);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Helper: Add Message
    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.innerHTML = `<p>${text}</p>`;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Helper: Bot Logic
    function getBotResponse(input) {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
            return "I'll assist you with dashboard tasks.";
        } else if (lowerInput.includes('booking')) {
            return "You can manage bookings in the 'Bookings' tab.";
        } else if (lowerInput.includes('client')) {
            return "Client details are available in the 'Clients' section.";
        } else if (lowerInput.includes('report') || lowerInput.includes('stat')) {
            return "Check the 'Reports' section for analytics.";
        } else {
            return "I'm here to help! You can ask about bookings, clients, or reports.";
        }
    }
});
