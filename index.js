document.addEventListener('DOMContentLoaded', function() {
    const cookiePopup = document.getElementById('cookie-popup');
    const closeCookiePopup = document.getElementById('close-cookie-popup');

    // Показываем всплывающее окно при загрузке страницы
    cookiePopup.style.display = 'block';

    // Закрываем всплывающее окно при нажатии на кнопку "Закрыть"
    closeCookiePopup.addEventListener('click', function() {
        cookiePopup.style.display = 'none';
    });
});