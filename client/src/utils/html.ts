export function html(strings: TemplateStringsArray, ...values: any[]): string {
    return strings.reduce((result, str, i) => {
        const value = values[i] !== undefined ? values[i] : '';
        return result + str + value;
    }, '');
}

export function layout(content: string, title: string = 'L_Shop'): string {
    return `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title} - L_Shop</title>
            <link rel="stylesheet" href="/src/styles/main.css">
        </head>
        <body>
            <header>
                <div class="container header-content">
                    <div class="logo">
                        <a href="/">L_Shop</a>
                    </div>
                    <nav>
                        <ul>
                            <li><a href="/">Главная</a></li>
                            <li class="non-auth hidden"><a href="/auth">Вход</a></li>
                            <li class="auth-required hidden"><a href="/cart" class="cart-link">
                                Корзина <span id="cart-counter">0</span>
                            </a></li>
                            <li class="auth-required hidden"><a href="#" id="logout-btn">Выход</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main class="container">
                ${content}
            </main>

            <footer>
                <div class="container">
                    <p>&copy; 2024 L_Shop. Все права защищены.</p>
                </div>
            </footer>
        </body>
        </html>
    `;
}