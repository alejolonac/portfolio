

// Función para detectar la sección activa
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100; // Offset para activar antes
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Remover clase activa de todos los enlaces
    navLinks.forEach(link => {
        link.classList.remove('nav__link--active');
    });
    
    // Agregar clase activa al enlace correspondiente
    if (currentSection) {
        const activeLink = document.querySelector(`.nav__link[href="#${currentSection}"]`);
        if (activeLink) {
            activeLink.classList.add('nav__link--active');
        }
    }
}

// Función para scroll suave personalizado
function smoothScrollTo(targetPosition, duration = 800) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Función para scroll suave a una sección específica
function smoothScrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    
    if (targetSection) {
        // Calcular la posición de la sección
        const offsetTop = targetSection.offsetTop - 80; // 80px de offset para el nav fijo
        
        // Scroll suave con animación personalizada
        smoothScrollTo(offsetTop, 800);
    }
}

// Función para scroll suave al hacer clic
function smoothScroll() {
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            smoothScrollToSection(targetId);
        });
    });
}

// Ejecutar cuando la página carga
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNavLink(); // Verificar sección inicial
    smoothScroll(); // Activar scroll suave
});

// Ejecutar cuando el usuario hace scroll
window.addEventListener('scroll', updateActiveNavLink);

// Función para toggle de descripción "ver más"
function toggleDescripcion(button) {
    const descripcionTexto = button.previousElementSibling;
    const isExpanded = descripcionTexto.classList.contains('expandido');
    
    if (isExpanded) {
        descripcionTexto.classList.remove('expandido');
        button.textContent = 'Ver más...';
    } else {
        descripcionTexto.classList.add('expandido');
        button.textContent = 'Ver menos';
    }
}
