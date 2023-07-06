'use strict';
document.addEventListener('DOMContentLoaded', () => {
  // модальные окна
  const handleModalPopup = (btn, blockModal) => {
    const btns = document.querySelectorAll(btn);
    const modal = document.querySelector(blockModal);
    const overlay = document.querySelector('.overlay');
    const arrCloseButton = document.querySelectorAll('.js-close');

    if (btns && modal) {
      btns.forEach((btnItem) => {
        btnItem.addEventListener('click', (evt) => {
          evt.preventDefault();
          modal.classList.add('active');
          overlay.classList.add('active');
          document.body.classList.add('no-scroll');
        });
      });

      arrCloseButton.forEach((closeButton) => {
        closeButton.addEventListener('click', (evt) => {
          evt.preventDefault();
          modal.classList.remove('active');
          overlay.classList.remove('active');
          document.body.classList.remove('no-scroll');
        });
      });

      overlay.addEventListener('click', (evt) => {
        evt.preventDefault();
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });

      if (window.screen.width > 767) {
        document.addEventListener('keydown', (evt) => {
          if (evt.key === 'Escape') {
            evt.preventDefault();
            modal.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
          }
        });
      }
    }
  };
  handleModalPopup('.js-qr-btn', '.js-qr-modal');

  // Показать/Скрыть пароль
  const togglePassword = () => {
    const authForm = document.querySelector('.auth__form');
    if (authForm) {
      const inputs = authForm.querySelectorAll('.auth__input[type="password"]');
      const btn = authForm.querySelector('.auth__password-icon');

      const handleBtnClick = (evt) => {
        evt.preventDefault();
        inputs.forEach((input) => {
          input.type = input.type === 'password' ? 'text' : 'password';
        });
        btn.classList.toggle('active');
      };

      btn.addEventListener('click', handleBtnClick);
    }
  };

  togglePassword();

  // Валидация и отправка формы НЕ в модальном окне
  const handleFormSubmitPage = (formItem) => {
    const form = document.querySelector(formItem);

    if (form) {
      const pristine = new Pristine(form);

      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const valid = pristine.validate();
        if (valid) {
          evt.preventDefault();

          const formData = Object.fromEntries(new FormData(evt.target).entries());
          console.log(formData);
          // evt.target.submit()
        }
      });
    }
  };

  handleFormSubmitPage('form[name="auth_form"]');
  handleFormSubmitPage('form[name="registr_form"]');
});
