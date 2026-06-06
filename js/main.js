/**
 * Atul T Varghese Portfolio JavaScript
 * Custom scripts for spotlight tracking, scrollspy, and contact form handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ========================================================================= //
  //  Spotlight Tracking Effect
  // ========================================================================= //
  const spotlight = document.querySelector('.spotlight');
  if (spotlight) {
    window.addEventListener('mousemove', (e) => {
      spotlight.style.setProperty('--mouse-x', `${e.clientX}px`);
      spotlight.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
  }

  // ========================================================================= //
  //  Scrollspy for Navigation Highlight
  // ========================================================================= //
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-item');

  function scrollSpy() {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 180; // Trigger trigger-point offset

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navItems.forEach(item => {
        item.classList.remove('active');
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === `#${currentSectionId}`) {
          item.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', scrollSpy);
  scrollSpy(); // Initial run to set state on load

  // ========================================================================= //
  //  Native Fetch Contact Form Submit Handler
  // ========================================================================= //
  const contactForm = document.getElementById('submit-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const submitBtn = contactForm.querySelector('input[type="submit"]') || contactForm.querySelector('button[type="submit"]');
      const originalVal = submitBtn ? (submitBtn.value || submitBtn.textContent) : 'Submit';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        if (submitBtn.tagName === 'INPUT') {
          submitBtn.value = 'Sending Message Please Wait...';
        } else {
          submitBtn.textContent = 'Sending Message Please Wait...';
        }
      }

      // Format data as x-www-form-urlencoded (matching original jQuery serialize)
      const formData = new FormData(contactForm);
      const urlSearchParams = new URLSearchParams();
      for (const [key, value] of formData.entries()) {
        urlSearchParams.append(key, value);
      }

      fetch('https://script.google.com/macros/s/AKfycbzsKS3wGKMaj57tltTnCZSnKH0IzS9Wdt6gXu4fL0SaoTExB90/exec', {
        method: 'POST',
        body: urlSearchParams,
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(response => {
        alert('Message sent successfully!');
        contactForm.reset();
        window.location.reload();
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        alert('Something went wrong. Please try again.');
        if (submitBtn) {
          submitBtn.disabled = false;
          if (submitBtn.tagName === 'INPUT') {
            submitBtn.value = originalVal;
          } else {
            submitBtn.textContent = originalVal;
          }
        }
      });
    });
  }
});
