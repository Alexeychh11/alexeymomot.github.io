// Анимация чисел в статистике
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounter = (counter) => {
    const target = +counter.innerText;
    const count = 0;
    const increment = target / speed;
    
    const updateCount = () => {
        const value = +counter.innerText;
        if (value < target) {
            counter.innerText = Math.ceil(value + increment);
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target;
        }
    };
    
    updateCount();
};

// Запускаем анимацию счетчиков при прокрутке
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            animateCounter(counter);
            observer.unobserve(counter);
        }
    });
}, observerOptions);

counters.forEach(counter => observer.observe(counter));

// Фильтрация портфолио
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Удаляем активный класс у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс нажатой кнопке
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === itemCategory) {
                gsap.to(item, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3,
                    display: 'block',
                    ease: 'power2.out'
                });
            } else {
                gsap.to(item, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.3,
                    display: 'none',
                    ease: 'power2.in'
                });
            }
        });
    });
});

// Анимация при наведении на работы
portfolioItems.forEach(item => {
    const overlay = item.querySelector('.portfolio-overlay');
    const content = item.querySelector('.portfolio-content img');

    item.addEventListener('mouseenter', () => {
        gsap.to(overlay, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
        gsap.to(content, {
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(overlay, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in'
        });
        gsap.to(content, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.in'
        });
    });
});

// Форма обратной связи
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    // Анимация кнопки при отправке
    submitButton.textContent = 'Отправка...';
    submitButton.disabled = true;

    try {
        // Здесь должен быть ваш URL для обработки формы
        const response = await fetch('your-server-endpoint', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            showNotification('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Ошибка отправки');
        }
    } catch (error) {
        showNotification('Произошла ошибка. Пожалуйста, попробуйте позже.', 'error');
    } finally {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
});

// Функция показа уведомлений
function showNotification(message, type) {
    // Удаляем предыдущие уведомления
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });

    // Создаем новое уведомление
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Добавляем уведомление на страницу
    document.body.appendChild(notification);

    // Анимируем появление
    gsap.fromTo(notification,
        {
            opacity: 0,
            y: -100
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        }
    );

    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
        gsap.to(notification, {
            opacity: 0,
            y: -100,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => notification.remove()
        });
    }, 3000);
}

// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Учитываем высоту шапки
                behavior: 'smooth'
            });

            // Закрываем мобильное меню при клике
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        }
    });
});

// Анимация при прокрутке
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
        header.style.background = 'transparent';
    }
});

// Предзагрузка изображений
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const image = new Image();
            image.src = src;
        }
    });
});
