document.addEventListener('DOMContentLoaded', function () {

    // Sticky header shadow on scroll
    var header = document.getElementById('header');
    function updateHeader() {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    // FAQ accordion
    var faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
        var btn = item.querySelector('.faq-question');
        var answer = item.querySelector('.faq-answer');

        btn.addEventListener('click', function () {
            var isActive = item.classList.contains('active');

            faqItems.forEach(function (other) {
                other.classList.remove('active');
                other.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Scroll-triggered fade-in animations
    var fadeEls = document.querySelectorAll(
        '.service-card, .airline-card, .step-card, .why-card, .faq-item, .contact-inner, .seo-content .container'
    );
    fadeEls.forEach(function (el) {
        el.classList.add('fade-in');
    });

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeEls.forEach(function (el) {
        observer.observe(el);
    });

    // Contact form handling
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var name = form.querySelector('#name').value.trim();
            var phone = form.querySelector('#phone').value.trim();
            var airline = form.querySelector('#airline').value;

            if (!name || !phone || !airline) {
                return;
            }

            form.innerHTML =
                '<div class="form-success">' +
                '<h3>Thank You!</h3>' +
                '<p>We received your request and will call you back shortly at <strong>' +
                escapeHtml(phone) +
                '</strong>.</p>' +
                '<p style="margin-top:16px">For immediate assistance, call us now:</p>' +
                '<a href="tel:+18882178851" style="font-size:1.8rem;font-weight:900;color:#ff6f00;display:block;margin-top:8px">(888) 217-8851</a>' +
                '</div>';
        });
    }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Phone number format helper for input
    var phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function () {
            var val = this.value.replace(/\D/g, '');
            if (val.length > 10) val = val.slice(0, 10);
            if (val.length >= 6) {
                this.value = '(' + val.slice(0, 3) + ') ' + val.slice(3, 6) + '-' + val.slice(6);
            } else if (val.length >= 3) {
                this.value = '(' + val.slice(0, 3) + ') ' + val.slice(3);
            } else if (val.length > 0) {
                this.value = '(' + val;
            }
        });
    }
});
