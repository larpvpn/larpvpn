// Динамическое меню на главной
function updateNav() {
    const nav = document.getElementById('nav-menu');
    if (!nav) return;
    
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
        nav.innerHTML = `
            <a href="dashboard.html">Личный кабинет</a>
            <a href="#" onclick="logout()">Выйти</a>
        `;
    } else {
        nav.innerHTML = `
            <a href="login.html">Вход</a>
            <a href="register.html">Регистрация</a>
        `;
    }
}

// Регистрация
function register() {
    const loginInput = document.getElementById('reg-login').value;
    const passwordInput = document.getElementById('reg-password').value;

    if (loginInput && passwordInput) {
        const user = { login: loginInput, password: passwordInput };
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    } else {
        alert('Заполните все поля!');
    }
}

// Вход
function login() {
    const loginInput = document.getElementById('login-input').value;
    const passwordInput = document.getElementById('password-input').value;
    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (savedUser && savedUser.login === loginInput && savedUser.password === passwordInput) {
        window.location.href = 'dashboard.html';
    } else {
        alert('Неверный логин или пароль!');
    }
}

// Выход
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Инициализация при загрузке страницы
window.onload = updateNav;
function updateNav() {
    const nav = document.getElementById('nav-menu');
    if (!nav) return;
    
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
        // Добавлена ссылка на поддержку ПЕРЕД личным кабинетом
        nav.innerHTML = `
            <a href="support.html" style="color: var(--accent); border: 1px solid var(--accent); padding: 5px 15px; border-radius: 4px;">ПОДДЕРЖКА</a>
            <a href="dashboard.html">ЛИЧНЫЙ КАБИНЕТ</a>
            <a href="#" onclick="logout()">ВЫЙТИ</a>
        `;
    } else {
        nav.innerHTML = `
            <a href="login.html">ВХОД</a>
            <a href="register.html">РЕГИСТРАЦИЯ</a>
        `;
    }
}