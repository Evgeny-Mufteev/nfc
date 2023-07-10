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
  const togglePassword = (form) => {
    const authForm = document.querySelector(form);
    if (authForm) {
      const inputs = authForm.querySelectorAll('.js-check-input');
      const btns = authForm.querySelectorAll('.js-icon');

      const handleBtnClick = (evt) => {
        evt.preventDefault();
        inputs.forEach((input) => {
          input.type = input.type === 'password' ? 'text' : 'password';
        });
        btns.forEach((btn) => {
          btn.classList.toggle('active');
        });
      };

      btns.forEach((btn) => {
        btn.addEventListener('click', handleBtnClick);
      });
    }
  };

  togglePassword('.auth__form');
  togglePassword('.registr__form');

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
  handleFormSubmitPage('form[name="change_data_form"]');

  // Показать форму регистрации
  const showRegistrationForm = () => {
    const formAuth = document.querySelector('.auth');
    const formRegistr = document.querySelector('.registr');
    const btn = document.querySelector('.js-swipe-form');

    if (formAuth && formRegistr && btn) {
      btn.addEventListener('click', (evt) => {
        evt.preventDefault();

        if (!formAuth.classList.contains('hide')) {
          formAuth.classList.add('hide');
        }

        if (!formRegistr.classList.contains('show')) {
          formRegistr.classList.add('show');
        }
      });
    }
  };

  showRegistrationForm();

  // Отображение изображения в форме
  const displayImage = () => {
    const form = document.querySelector('form[name="change_data_form"]');
    if (form) {
      const fileInput = document.querySelector('input[name="change_data_img"]');
      fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          const img = document.createElement('img');
          img.src = e.target.result;
          const container = document.querySelector('#image-preview');
          container.innerHTML = '';
          container.appendChild(img);
        };
        reader.readAsDataURL(file);
      });
    }
  };
  displayImage();

  // Маска телефона
  const handlePhoneMask = (input) => {
    let matrix = '+7 (___) ___-__-__',
      i = 0,
      def = matrix.replace(/\D/g, ''),
      val = input.value.replace(/\D/g, '');
    if (def.length >= val.length) val = def;
    input.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });
  };
  const numbers = document.querySelectorAll('input[type="tel"]');
  numbers.forEach((number) => {
    number.addEventListener('input', handlePhoneMask.bind(null, number));
    number.addEventListener('focus', handlePhoneMask.bind(null, number));
    number.addEventListener('blur', handlePhoneMask.bind(null, number));
  });
});
