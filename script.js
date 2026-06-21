document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. ПЕРЕКЛЮЧАТЕЛЬ ЦВЕТОВОЙ ТЕМЫ --- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';

  // Установка начальной темы
  document.documentElement.setAttribute('data-theme', currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });


  /* --- 2. МОБИЛЬНОЕ МЕНЮ (БУРГЕР) --- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    // Блокируем скролл при открытом мобильном меню
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
  };

  hamburger.addEventListener('click', toggleMenu);

  // Закрываем меню при клике на любой пункт
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        toggleMenu();
      }
    });
  });


  /* --- 3. ПОДСВЕТКА АКТИВНОГО ПУНКТА МЕНЮ ПРИ СКРОЛЛЕ --- */
  const sections = document.querySelectorAll('section');
  const header = document.getElementById('header');

  const scrollActive = () => {
    const scrollY = window.pageYOffset;

    // Стилизация шапки при скролле
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // Смещение для точности перехода
      const sectionId = current.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href*=${sectionId}]`);

      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', scrollActive);
  scrollActive(); // Вызываем один раз при загрузке


  /* --- 4. ИНТЕРАКТИВНЫЙ БЛОК ПРОГРЕССА (ТОЧКА А → ТОЧКА Б) --- */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.progress-content-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabTarget = button.getAttribute('data-tab');

      // Переключаем кнопки
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Переключаем панели
      panels.forEach(panel => {
        if (panel.getAttribute('id') === tabTarget) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });


  /* --- 5. ФИЛЬТРАЦИЯ ПРОЕКТОВ (МОИ РАБОТЫ) --- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.getAttribute('data-filter');

      // Активная кнопка фильтра
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Фильтруем карточки
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          // Небольшой эффект плавного появления
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  /* --- 6. РАБОТА С ФОРМОЙ ОБРАТНОЙ СВЯЗИ И МОДАЛЬНЫМ ОКНОМ --- */
  const contactForm = document.getElementById('contact-form');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Предотвращаем перезагрузку страницы

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (name && email && message) {
        // Имитируем отправку на бэкенд и сохраняем локально
        const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
        messages.push({ name, email, message, date: new Date().toISOString() });
        localStorage.setItem('contact_messages', JSON.stringify(messages));

        // Показываем модальное окно успеха
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Сбрасываем форму
        contactForm.reset();
      }
    });
  }

  // Закрытие модального окна
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  // Закрытие модального окна при клике на темный фон
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }


  /* --- 7. КНОПКА СКРОЛЛА НАВЕРХ --- */
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  const checkScrollTop = () => {
    if (window.pageYOffset > 400) {
      scrollTopBtn.classList.add('active');
    } else {
      scrollTopBtn.classList.remove('active');
    }
  };

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', checkScrollTop);
  checkScrollTop(); // Вызов один раз на старте
});
