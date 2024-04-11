// Функция для отправки данных на сервер при регистрации
document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    // Получаем значения из полей формы
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const telephone = document.getElementById("telephone").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const birthday = document.getElementById("birthday").value;
    const sex = document.getElementById("sex").value;
    
    // Отправляем данные на сервер
    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, surname, telephone, email, password, birthday, sex })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Ошибка сервера");
        }
        return response.json();
    })
    .then(data => {
        console.log("Успешная регистрация:", data);
        // После успешной регистрации можно выполнить дополнительные действия, например, перенаправить пользователя на страницу личного кабинета
        window.location.href = "/cabinet.html"; // Перенаправляем пользователя на страницу личного кабинета
    })
    .catch(error => {
        console.error("Ошибка регистрации:", error.message);
        document.getElementById("error-message").textContent = "Ошибка регистрации. Пожалуйста, попробуйте еще раз.";
    });
});
