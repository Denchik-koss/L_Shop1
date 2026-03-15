import { router } from './utils/router';
import { authAPI } from './api/auth';
import { cartAPI } from './api/cart';

export interface AppState {
    user: any | null;
    isAuthenticated: boolean;
    cartItemsCount: number;
}

export const state: AppState = {
    user: null,
    isAuthenticated: false,
    cartItemsCount: 0
};

export async function updateState() {
    try {
        const isAuth = await cartAPI.checkAuth();
        state.isAuthenticated = isAuth;
        
        if (isAuth) {
            const userData = await authAPI.getCurrentUser();
            state.user = userData.user;
            
            const cart = await cartAPI.getCart();
            state.cartItemsCount = cart.totalItems;
        } else {
            state.user = null;
            state.cartItemsCount = 0;
        }
        
        updateUI();
    } catch (error) {
        console.error('Failed to update state:', error);
    }
}

function updateUI() {
    const cartCounter = document.getElementById('cart-counter');
    if (cartCounter) {
        cartCounter.textContent = state.cartItemsCount.toString();
    }
    
    const authElements = document.querySelectorAll('.auth-required');
    authElements.forEach(el => {
        if (state.isAuthenticated) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });
    
    const nonAuthElements = document.querySelectorAll('.non-auth');
    nonAuthElements.forEach(el => {
        if (!state.isAuthenticated) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });
}

async function initApp() {
    router
        .addRoute('/', () => '<h1>Главная страница (в разработке)</h1>', 'Главная')
        .addRoute('/auth', () => '<h1>Страница авторизации (в разработке)</h1>', 'Вход / Регистрация')
        .addRoute('/cart', () => '<h1>Корзина (в разработке)</h1>', 'Корзина')
        .addRoute('*', () => '<h1>404 - Страница не найдена</h1>');

    router.init();

    await updateState();
}

document.addEventListener('DOMContentLoaded', initApp);