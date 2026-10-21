// Navigation link handler
document.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('data-target');
        var targetEl = document.getElementById(targetId);

        if (targetEl) {
            revealElementsInSection(targetId);

            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    var navbarHeight = document.getElementById('navbar').offsetHeight;
                    var targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    setTimeout(function() {
                        revealElementsInSection(targetId);
                    }, 800);
                });
            });
        }
    });
});

function revealElementsInSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        section.querySelectorAll('.animate-on-scroll').forEach(function(el) {
            el.classList.remove('js-hidden');
            el.classList.add('js-visible');
        });
    }
}

// Scroll indicator and navbar
window.addEventListener('scroll', function() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('scrollIndicator').style.width = scrollPercent + '%';

    var navbar = document.getElementById('navbar');
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

function toggleMenu() {
    var menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Intersection Observer for animations
var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.remove('js-hidden');
            entry.target.classList.add('js-visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
});

document.addEventListener('DOMContentLoaded', function() {
    var allAnimated = document.querySelectorAll('.animate-on-scroll');

    allAnimated.forEach(function(el) {
        el.classList.add('js-hidden');
        el.classList.remove('js-visible');
    });

    allAnimated.forEach(function(el) {
        observer.observe(el);
    });

    // Immediately reveal elements already in viewport
    setTimeout(function() {
        allAnimated.forEach(function(el) {
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.remove('js-hidden');
                el.classList.add('js-visible');
            }
        });
    }, 100);

    // Handle URL hash on page load
    if (window.location.hash) {
        var hashId = window.location.hash.substring(1);
        var targetEl = document.getElementById(hashId);
        if (targetEl) {
            setTimeout(function() {
                revealElementsInSection(hashId);
                var navbarHeight = document.getElementById('navbar').offsetHeight;
                var targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                setTimeout(function() { revealElementsInSection(hashId); }, 800);
            }, 300);
        }
    }
});

// Counter animation
var counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            var el = entry.target;
            var target = parseFloat(el.dataset.target);
            if (!target) return;
            var isDecimal = target % 1 !== 0;
            var duration = 2000;
            var start = performance.now();

            function update(now) {
                var elapsed = now - start;
                var progress = Math.min(elapsed / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                var current = eased * target;
                el.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
                if (progress < 1) requestAnimationFrame(update);
                else el.textContent = isDecimal ? target.toFixed(2) : target;
            }
            requestAnimationFrame(update);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter[data-target]').forEach(function(el) {
    counterObserver.observe(el);
});

function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(function(c) { c.classList.add('hidden'); });
    document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
    document.getElementById('content-' + tab).classList.remove('hidden');
    document.getElementById('tab-' + tab).classList.add('active');

    var content = document.getElementById('content-' + tab);
    content.querySelectorAll('.animate-on-scroll').forEach(function(el) {
        el.classList.remove('js-hidden');
        el.classList.add('js-visible');
    });
}

function toggleFaq(btn) {
    var answer = btn.nextElementSibling;
    var icon = btn.querySelector('svg');
    var isOpen = answer.classList.contains('open');

    document.querySelectorAll('.faq-answer').forEach(function(a) { a.classList.remove('open'); });
    document.querySelectorAll('.faq-item button svg').forEach(function(s) { s.style.transform = 'rotate(0deg)'; });

    if (!isOpen) {
        answer.classList.add('open');
        icon.style.transform = 'rotate(180deg)';
    }
}
