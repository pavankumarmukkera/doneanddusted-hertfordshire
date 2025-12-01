document.addEventListener('DOMContentLoaded', () => {
    // Inject Chat HTML
    const chatWidget = document.createElement('div');
    chatWidget.innerHTML = `
        <button id="dusted-chat-btn" class="dusted-chat-btn">
            <i class="fas fa-comments"></i>
        </button>
        <div id="dusted-chat-window" class="dusted-chat-window">
            <div class="chat-header">
                <div class="chat-avatar">
                    <img src="assets/images/dusted-assistant.png" alt="Dusted Assistant">
                </div>
                <div class="chat-info">
                    <h3>Dusted Assistant</h3>
                    <p><span class="status-dot"></span> Online</p>
                </div>
            </div>
            <div id="chat-messages" class="chat-messages"></div>
            <div class="typing-indicator" id="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
            <div class="chat-input-area">
                <input type="text" id="chat-input" placeholder="Type a message...">
                <button id="chat-send-btn" class="chat-send-btn">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(chatWidget);

    // Elements
    const chatBtn = document.getElementById('dusted-chat-btn');
    const chatWindow = document.getElementById('dusted-chat-window');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send-btn');
    const typingIndicator = document.getElementById('typing-indicator');

    // State
    let isOpen = false;
    let bookingStep = 0;
    let bookingData = {};

    // Load History
    const history = JSON.parse(localStorage.getItem('dustedChatHistory')) || [];
    if (history.length === 0) {
        // Initial Greeting
        addMessage('bot', "Hi 👋 I’m Dusted Assistant. How can I help you today? I can help with quotes, booking, or questions about our services!");
    } else {
        history.forEach(msg => renderMessage(msg.sender, msg.text));
    }

    // Toggle Chat
    chatBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        chatWindow.classList.toggle('active', isOpen);
        chatBtn.classList.toggle('open', isOpen);
        if (isOpen) {
            chatInput.focus();
            scrollToBottom();
        }
    });

    // Send Message
    function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage('user', text);
        chatInput.value = '';

        showTyping();

        // Simulate AI Delay
        setTimeout(() => {
            hideTyping();
            processMessage(text.toLowerCase());
        }, 1000 + Math.random() * 1000);
    }

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    // Core Logic
    function processMessage(text) {
        let response = "";

        // Booking Flow
        if (bookingStep > 0) {
            handleBookingFlow(text);
            return;
        }

        // Keyword Matching
        if (text.includes('price') || text.includes('cost') || text.includes('quote') || text.includes('much')) {
            response = "Our pricing is tailored to your needs! \n\n🏠 **Domestic**: From £18/hr\n🏢 **Commercial**: Custom quotes\n✨ **Deep Clean**: 3-bed from £120\n\nWould you like to book a specific service?";
        } else if (text.includes('book') || text.includes('appointment') || text.includes('schedule')) {
            bookingStep = 1;
            response = "Great! I can help you book. First, what is your **full name**?";
        } else if (text.includes('deep') || text.includes('spring')) {
            response = "Our Deep Cleans are perfect for spring cleaning! We cover everything from skirting boards to inside cupboards. Would you like a quote?";
        } else if (text.includes('end of tenancy') || text.includes('moving')) {
            response = "Moving out? Our End of Tenancy cleans come with a pass guarantee! 🔑 We work with estate agents to ensure you get your deposit back.";
        } else if (text.includes('supplies') || text.includes('equipment') || text.includes('bring')) {
            response = "Yes, we bring all our own professional equipment and eco-friendly supplies! 🌿 You don't need to provide a thing.";
        } else if (text.includes('insured') || text.includes('insurance')) {
            response = "Absolutely! All our cleaners are fully insured and background checked for your peace of mind. ✅";
        } else if (text.includes('contact') || text.includes('phone') || text.includes('email') || text.includes('call')) {
            response = "You can reach us directly at:\n📞 **01923 549026**\n📧 **info@doneanddusted.co.uk**";
        } else if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
            response = "Hello there! 👋 How can I make your day cleaner?";
        } else {
            response = "I'm not sure about that specific detail, but I'd love to help! You can ask about **prices**, **services**, or **book a clean** directly with me.";
        }

        addMessage('bot', response);
    }

    function handleBookingFlow(text) {
        let response = "";

        if (bookingStep === 1) { // Name
            bookingData.name = text;
            bookingStep = 2;
            response = `Nice to meet you, ${bookingData.name}! What **service** are you looking for? (e.g., Domestic, Deep Clean, End of Tenancy)`;
        } else if (bookingStep === 2) { // Service
            bookingData.service = text;
            bookingStep = 3;
            response = "Got it. And what is your **email address** so we can send the confirmation?";
        } else if (bookingStep === 3) { // Email
            bookingData.email = text;
            bookingStep = 4;
            response = "Almost done! What is your preferred **date** for the clean?";
        } else if (bookingStep === 4) { // Date
            bookingData.date = text;
            bookingStep = 0; // Reset
            response = `Perfect! 🎉 I've noted your request:\n\n👤 **${bookingData.name}**\n🧹 **${bookingData.service}**\n📅 **${bookingData.date}**\n📧 **${bookingData.email}**\n\nOne of our team members will call you shortly to confirm the details. Is there anything else I can help with?`;

            // Save to LocalStorage (Simulating Database)
            const bookings = JSON.parse(localStorage.getItem('dd_bookings') || '[]');
            const newId = bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1;

            const newBooking = {
                id: newId,
                name: bookingData.name,
                email: bookingData.email,
                phone: "Not Provided (Chat)", // Chat flow doesn't ask for phone yet
                service: bookingData.service,
                date: bookingData.date,
                status: 'Pending',
                notes: 'Booked via Dusted Assistant Chat',
                timestamp: new Date().toISOString()
            };

            bookings.push(newBooking);
            localStorage.setItem('dd_bookings', JSON.stringify(bookings));

            console.log("Booking Saved:", newBooking);
        }

        addMessage('bot', response);
    }

    // UI Helpers
    function addMessage(sender, text) {
        const msg = { sender, text, timestamp: new Date().toISOString() };
        history.push(msg);
        localStorage.setItem('dustedChatHistory', JSON.stringify(history));
        renderMessage(sender, text);
    }

    function renderMessage(sender, text) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;

        // Convert newlines to <br> and bold markdown to <strong>
        let formattedText = text.replace(/\n/g, '<br>');
        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        div.innerHTML = formattedText;
        chatMessages.appendChild(div);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTyping() {
        typingIndicator.classList.add('active');
        chatMessages.appendChild(typingIndicator); // Move to bottom
        scrollToBottom();
    }

    function hideTyping() {
        typingIndicator.classList.remove('active');
    }
});
