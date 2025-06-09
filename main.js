document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.querySelector('.back-to-top');
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.testimonial').length;

    // Función para manejar el scroll
    function handleScroll() {
        // Header con fondo al hacer scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Botón de volver arriba
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }

        // Activar enlaces de navegación según la sección visible
        const scrollPosition = window.scrollY;

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Menú móvil toggle
    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Slider de testimonios
    function showSlide(index) {
        // Validar el índice para asegurar que esté dentro del rango
        if (index < 0) {
            currentSlide = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }

        // Aplicar la transformación con una transición suave
        testimonialSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Actualizar indicadores si existen
        updateIndicators();
        
        // Añadir clase activa al testimonio actual y removerla de los demás
        const testimonials = document.querySelectorAll('.testimonial');
        testimonials.forEach((testimonial, i) => {
            if (i === currentSlide) {
                testimonial.classList.add('active');
                testimonial.style.opacity = '1';
                testimonial.style.transform = 'scale(1)';
                testimonial.style.filter = 'blur(0)';
            } else {
                testimonial.classList.remove('active');
                testimonial.style.opacity = '0.7';
                testimonial.style.transform = 'scale(0.9)';
                testimonial.style.filter = 'blur(1px)';
            }
        });
    }

    // Función para crear indicadores de testimonios
    function createIndicators() {
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'testimonial-indicators';
        
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('span');
            indicator.className = 'testimonial-indicator';
            if (i === 0) indicator.classList.add('active');
            
            // Añadir atributo de datos para identificar el índice
            indicator.setAttribute('data-index', i);
            
            // Mejorar la interactividad con el evento click
            indicator.addEventListener('click', function() {
                // Pausar el intervalo automático
                clearInterval(testimonialInterval);
                
                // Mostrar la diapositiva correspondiente
                showSlide(parseInt(this.getAttribute('data-index')));
                
                // Reiniciar el intervalo después de un tiempo
                setTimeout(() => {
                    testimonialInterval = setInterval(() => {
                        showSlide(currentSlide + 1);
                    }, 5000);
                }, 1000);
            });
            
            indicatorsContainer.appendChild(indicator);
        }
        
        const testimonialControls = document.querySelector('.testimonial-controls');
        testimonialControls.insertBefore(indicatorsContainer, testimonialControls.firstChild);
    }

    // Función para actualizar los indicadores
    function updateIndicators() {
        const indicators = document.querySelectorAll('.testimonial-indicator');
        if (indicators.length > 0) {
            indicators.forEach((indicator, index) => {
                if (index === currentSlide) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
    }

    // Mejorar la interactividad de los botones de navegación
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            // Pausar el intervalo automático
            clearInterval(testimonialInterval);
            
            // Mostrar la diapositiva anterior
            showSlide(currentSlide - 1);
            
            // Reiniciar el intervalo después de un tiempo
            setTimeout(() => {
                testimonialInterval = setInterval(() => {
                    showSlide(currentSlide + 1);
                }, 5000);
            }, 1000);
        });

        nextBtn.addEventListener('click', () => {
            // Pausar el intervalo automático
            clearInterval(testimonialInterval);
            
            // Mostrar la siguiente diapositiva
            showSlide(currentSlide + 1);
            
            // Reiniciar el intervalo después de un tiempo
            setTimeout(() => {
                testimonialInterval = setInterval(() => {
                    showSlide(currentSlide + 1);
                }, 5000);
            }, 1000);
        });
    }

    // Crear indicadores para los testimonios
    createIndicators();

    // Cambiar automáticamente los testimonios cada 5 segundos
    let testimonialInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
    
    // Pausar el intervalo cuando el usuario interactúa con los controles
    const testimonialSection = document.querySelector('.testimonials');
    testimonialSection.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialSection.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    });

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aquí iría la lógica para enviar el formulario
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            contactForm.reset();
        });
    }

    // Animación de elementos al hacer scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
            }
        });
    }

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Inicializar funciones
    handleScroll();
    animateOnScroll();
    
    // Inicializar el carrusel de testimonios
    if (testimonialSlider && totalSlides > 0) {
        // Establecer la opacidad inicial para todos los testimonios
        const testimonials = document.querySelectorAll('.testimonial');
        testimonials.forEach((testimonial, i) => {
            if (i === 0) {
                testimonial.style.opacity = '1';
            } else {
                testimonial.style.opacity = '0.5';
            }
        });
        
        // Mostrar la primera diapositiva
        showSlide(0);
    }
});