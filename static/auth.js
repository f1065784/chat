const form = document.getElementById('register-form');

  
  const submitButton = form.querySelector('.register-form__button');

  submitButton.addEventListener('click', function(event) {
    event.preventDefault(); 

    const loginValue = document.getElementById('login').value;
    const passwordValue = document.getElementById('password').value;
    const passwordRepeatValue = document.getElementById('passwordRepeat').value;

    
    console.log('Логин:', loginValue);
    console.log('Пароль:', passwordValue);
    console.log('Повторите пароль:', passwordRepeatValue);
  });