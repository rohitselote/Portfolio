document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for reaching out! I will get back to you soon.');
            form.reset();
        });
    }

    // Section reveal on scroll
    const sections = document.querySelectorAll('main section');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18 });
        sections.forEach(section => {
            observer.observe(section);
        });
    } else {
        // Fallback: show all sections
        sections.forEach(section => section.classList.add('visible'));
    }

    // Typewriter effect for header
    const roles = [
        'Web Designer',
        'Traveller',
        'Tech Enthusiast',
        'Athlete',
        'Creative Coder'
    ];
    let typeIndex = 0, charIndex = 0, isDeleting = false;
    const typeElem = document.getElementById('typewriter-text');
    function typeWriter() {
        if (!typeElem) return;
        const current = roles[typeIndex];
        if (isDeleting) {
            typeElem.textContent = current.substring(0, charIndex--);
            if (charIndex < 0) {
                isDeleting = false;
                typeIndex = (typeIndex + 1) % roles.length;
                setTimeout(typeWriter, 700);
            } else {
                setTimeout(typeWriter, 40);
            }
        } else {
            typeElem.textContent = current.substring(0, charIndex++);
            if (charIndex > current.length) {
                isDeleting = true;
                setTimeout(typeWriter, 1200);
            } else {
                setTimeout(typeWriter, 90);
            }
        }
    }
    typeWriter();
});
