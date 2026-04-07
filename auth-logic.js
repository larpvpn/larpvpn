document.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('userLogin');
    const authBtn = document.getElementById('auth-btn');
    const nav = document.getElementById('main-nav');

    if (user && authBtn) {
        authBtn.innerText = 'ВЫХОД';
        authBtn.style.color = 'var(--error)';
        authBtn.style.borderColor = 'var(--error)';
        authBtn.onclick = (e) => {
            e.preventDefault();
            localStorage.removeItem('userLogin');
            window.location.reload();
        };

        const dash = document.createElement('a');
        dash.href = 'dashboard.html';
        dash.className = 'nav-item';
        dash.innerText = 'ДАШБОРД';
        dash.style.color = 'var(--accent)';
        nav.appendChild(dash);
    }
});