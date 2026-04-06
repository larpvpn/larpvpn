/* 
   SYSTEM CORE LOGIC | LARPVPN 
   OPERATOR: KLYARSKIY
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. СИСТЕМА ПОДКЛЮЧЕНИЯ (DASHBOARD) ---
    const connectBtn = document.querySelector('.btn-main');
    const statusText = document.querySelector('.terminal-card h3');
    const logoIcon = document.querySelector('.logo-icon');

    if (connectBtn && statusText) {
        connectBtn.addEventListener('click', () => {
            if (connectBtn.innerText === 'INITIALIZE SECURE TUNNEL') {
                // Имитация процесса подключения
                connectBtn.innerText = 'ESTABLISHING...';
                connectBtn.style.opacity = '0.5';
                statusText.innerText = 'CONNECTING...';
                statusText.style.color = 'var(--warning)';

                setTimeout(() => {
                    connectBtn.innerText = 'TERMINATE CONNECTION';
                    connectBtn.style.opacity = '1';
                    connectBtn.style.borderColor = 'var(--error)';
                    connectBtn.style.color = 'var(--error)';
                    
                    statusText.innerText = 'CONNECTED';
                    statusText.style.color = 'var(--accent)';
                    
                    if(logoIcon) {
                        logoIcon.style.filter = 'grayscale(0)';
                        logoIcon.style.boxShadow = '0 0 20px var(--accent)';
                        logoIcon.style.opacity = '1';
                    }
                }, 2000);
            } else {
                // Отключение
                connectBtn.innerText = 'INITIALIZE SECURE TUNNEL';
                connectBtn.style.borderColor = 'var(--accent)';
                connectBtn.style.color = 'var(--accent)';
                statusText.innerText = 'DISCONNECTED';
                statusText.style.color = 'var(--error)';
                if(logoIcon) {
                    logoIcon.style.filter = 'grayscale(1)';
                    logoIcon.style.opacity = '0.5';
                }
            }
        });
    }

    // --- 2. ВЫБОР СЕРВЕРА ---
    const serverBtns = document.querySelectorAll('.terminal-card .btn-main');
    serverBtns.forEach(btn => {
        if (btn.innerText.includes('GERMANY') || btn.innerText.includes('USA')) {
            btn.addEventListener('click', () => {
                serverBtns.forEach(b => b.style.background = 'transparent');
                btn.style.background = 'rgba(0, 255, 163, 0.1)';
                console.log(`Node Selected: ${btn.innerText.split('-')[0].trim()}`);
            });
        }
    });

    // --- 3. ЭФФЕКТ ПЕЧАТИ (ДЛЯ ЗАГОЛОВКОВ) ---
    const glitchedText = document.querySelector('.logo-text span');
    if (glitchedText) {
        setInterval(() => {
            const originalText = glitchedText.innerText;
            const chars = '!@#$%^&*()_+';
            const randomChar = chars[Math.floor(Math.random() * chars.length)];
            glitchedText.innerText = randomChar;
            setTimeout(() => glitchedText.innerText = originalText, 100);
        }, 4000);
    }

    // --- 4. УВЕДОМЛЕНИЯ (TOASTS) ---
    window.showSystemAlert = (msg, type = 'info') => {
        const toast = document.createElement('div');
        toast.className = 'terminal-card';
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.zIndex = '9999';
        toast.style.padding = '15px 25px';
        toast.style.borderColor = type === 'error' ? 'var(--error)' : 'var(--accent)';
        toast.innerHTML = `<span style="font-family: 'JetBrains Mono'; font-size: 0.8rem;">[SYSTEM_MSG]: ${msg}</span>`;
        
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };
});

// ПРОВЕРКА СОСТОЯНИЯ СЕТИ (ДЛЯ ГЛАВНОЙ)
if (window.location.pathname.includes('index.html')) {
    console.warn("SYSTEM_ALERT: Server nodes are currently under maintenance.");
}