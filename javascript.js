

// Función para detectar la sección activa
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    const scrollPosition = window.scrollY + 100; // Offset para activar antes
    
    // Encontrar la sección más cercana al scroll actual
    let closestSection = '';
    let minDistance = Infinity;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionCenter = sectionTop + (sectionHeight / 2);
        
        // Calcular distancia desde el centro de la sección al scroll position
        const distance = Math.abs(scrollPosition - sectionCenter);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            closestSection = section.getAttribute('id');
            minDistance = 0; 
        } else if (distance < minDistance) {
            closestSection = section.getAttribute('id');
            minDistance = distance;
        }
    });
    

    navLinks.forEach(link => {
        link.classList.remove('nav__link--active');
    });
    

    if (closestSection) {
        const activeLink = document.querySelector(`.nav__link[href="#${closestSection}"]`);
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
        const offsetTop = targetSection.offsetTop - 80; 
        
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
    updateActiveNavLink(); 
    smoothScroll(); 
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

// Funcion para animacion de secciones 
const reveal = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, {
    threshold: 0.3,
});

reveal.forEach((el) => observer.observe(el));