// Форма авторизации
export const getAuthForm = () => {
    return `
    <form class="mui-form" id="auth-form">
        <div class="mui-textfield mui-textfield--float-label">
            <input type="email" id="email" required>
            <label for="email">Email</label>
        </div>
        <div class="mui-textfield mui-textfield--float-label">
            <input type="password" id="password" required>
            <label for="password">Пароль</label>
        </div>
        <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary">
            Войти
        </button>
    </form>
    `
}

// авторизация в FireBase
export const authWidthEmailAndPassword = (email, password) => {
    const apiKey = 'AIzaSyAC29v13SbdmFVpc3zq4rUKzU7MwO7Eh2o'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => data.idToken)
}