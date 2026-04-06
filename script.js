/**
 * ==========================================================================
 * LARPVPN OPERATIONAL KERNEL v4.0.0 [STABLE]
 * CORE LOGIC ENGINE / SESSION MANAGEMENT / DYNAMIC UI
 * ==========================================================================
 */

"use strict";

// Конфигурация системных констант
const SYSTEM_CONFIG = {
    PROJECT_NAME: "LarpVPN",
    VERSION: "4.0.0",
    STORAGE_KEY: "user",
    TICKET_KEY: "tickets",
    AUTH_PAGES: ["dashboard.html", "support.html"],
    REDIRECT_HOME: "index.html",
    REDIRECT_LOGIN: "login.html"
};

/**
 * Инициализация системы при загрузке DOM
 */
document.addEventListener('DOMContentLoaded', () => {
    LarpKernel.bootSequence();
});

const LarpKernel = {
    /**
     * Последовательность загрузки ядра
     */
    bootSequence: function() {
        console.log(`%c [${SYSTEM_CONFIG.PROJECT_NAME}] : INITIALIZING KERNEL v${SYSTEM_CONFIG.VERSION}... `, "color: #00ffa3; font-weight: bold; background: #05070a; padding: 5px;");
        
        this.syncSession();
        this.renderNavigation();
        this.applySecurityProtocols();
        this.initGlobalEffects();
        
        console.log(`%c [${SYSTEM_CONFIG.PROJECT_NAME}] : SYSTEM_READY_STATE: OK `, "color: #00ffa3; font-weight: bold;");
    },

    /**
     * Синхронизация текущей сессии оператора
     */
    syncSession: function() {
        const userData = localStorage.getItem(SYSTEM_CONFIG.STORAGE_KEY);
        this.currentUser = userData ? JSON.parse(userData) : null;
        
        if (this.currentUser) {
            console.log(`%c [AUTH] : SESSION_ACTIVE: ${this.currentUser.login.toUpperCase()} `, "color: #00d1ff;");
        } else {
            console.log("%c [AUTH] : SESSION_INACTIVE: STANDBY_MODE ", "color: #8b949e;");
        }
    },

    /**
     * Динамическая отрисовка навигационного меню
     * Подставляет нужные ссылки в зависимости от статуса авторизации
     */
    renderNavigation: function() {
        const navMenu = document.getElementById('nav-menu');
        if (!navMenu) return; // Если на странице нет меню (например, login.html), пропускаем

        if (this.currentUser) {
            // Интерфейс для авторизованного оператора
            navMenu.innerHTML = `
                <a href="support.html" class="nav-link btn-premium">ЦЕНТР ПОДДЕРЖКИ</a>
                <a href="dashboard.html" class="nav-link">ТЕРМИНАЛ</a>
                <a href="#" id="terminate-link" class="nav-link" style="color: var(--error-red);">ВЫЙТИ</a>
            `;
            
            // Привязываем событие выхода
            document.getElementById('terminate-link').addEventListener('click', (e) => {
                e.preventDefault();
                this.processLogout();
            });
        } else {
            // Интерфейс для гостя
            navMenu.innerHTML = `
                <a href="login.html" class="nav-link">ВХОД</a>
                <a href="register.html" class="nav-link btn-premium">РЕГИСТРАЦИЯ</a>
            `;
        }
    },

    /**
     * Протоколы безопасности: редирект неавторизованных пользователей
     */
    applySecurityProtocols: function() {
        const currentPage = window.location.pathname.split("/").pop();
        
        // Если страница требует авторизации, а пользователя нет - выкидываем на логин
        if (SYSTEM_CONFIG.AUTH_PAGES.includes(currentPage) && !this.currentUser) {
            console.warn("[SECURITY] : UNAUTHORIZED ACCESS DETECTED. REDIRECTING...");
            window.location.href = SYSTEM_CONFIG.REDIRECT_LOGIN;
        }
    },

    /**
     * Процесс терминации сессии (Выход)
     */
    processLogout: function() {
        if (confirm("[WARNING] : ИНИЦИИРОВАТЬ РАЗРЫВ СОЕДИНЕНИЯ С ТЕРМИНАЛОМ?")) {
            console.warn("[AUTH] : DESTRUCTING SESSION...");
            localStorage.removeItem(SYSTEM_CONFIG.STORAGE_KEY);
            window.location.href = SYSTEM_CONFIG.REDIRECT_HOME;
        }
    },

    /**
     * Глобальные UI-эффекты (Прелоадер и плавные переходы)
     */
    initGlobalEffects: function() {
        const preloader = document.getElementById('preloader') || document.getElementById('loader');
        
        if (preloader) {
            // Искусственная задержка для "солидности"
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800);
            }, 1200);
        }
    }
};

/**
 * Вспомогательная функция для смены пароля (вызывается из дашборда)
 */
function processPassChange() {
    const newPassInput = document.getElementById('new-password');
    if (!newPassInput) return;

    const newPass = newPassInput.value;
    
    if (newPass.length < 5) {
        alert("[CRITICAL_ERROR] : КЛЮЧ ДОСТУПА СЛИШКОМ КОРОТКИЙ. МИНИМУМ 5 СИМВОЛОВ.");
        return;
    }

    let user = JSON.parse(localStorage.getItem(SYSTEM_CONFIG.STORAGE_KEY));
    if (user) {
        user.password = newPass;
        localStorage.setItem(SYSTEM_CONFIG.STORAGE_KEY, JSON.stringify(user));
        
        newPassInput.value = '';
        alert("[SYSTEM_NOTICE] : БАЗА ДАННЫХ ОБНОВЛЕНА. НОВЫЙ КЛЮЧ АКТИВИРОВАН.");
        console.log("%c [DATABASE] : PASSWORD_UPDATE: SUCCESS ", "color: #70e000;");
    }
}

/**
 * Terminal UI Helpers: Кастомные уведомления (имитация)
 */
const TerminalAlert = {
    show: function(msg) {
        // Здесь можно дописать создание красивого модального окна в стиле киберпанк
        alert(msg);
    }
};

// Конец файла script.js