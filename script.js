// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
  // Initialize Particles.js
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#ffffff'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        }
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  });

  // Typing Effect
  const words = ['Frontend Developer', 'UI/UX Enthusiast', 'React.js Learner'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingDelay = 200;
  const erasingDelay = 100;
  const newWordDelay = 2000;
  const typingElement = document.querySelector('.typing-text');

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingElement.innerHTML = `I'm a <span class="word">${currentWord.substring(0, charIndex - 1)}</span>`;
      charIndex--;
    } else {
      typingElement.innerHTML = `I'm a <span class="word">${currentWord.substring(0, charIndex + 1)}</span>`;
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, newWordDelay);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(type, isDeleting ? erasingDelay : typingDelay);
    }
  }
  setTimeout(type, newWordDelay);

  const skillSection = document.getElementById('skills');
  const progressBars = document.querySelectorAll('.progress');

  function animateSkills() {
    const sectionPos = skillSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos) {
      progressBars.forEach(progress => {
        const percent = progress.getAttribute('data-percent');
        progress.style.width = percent + '%';
      });
    }
  }

  window.addEventListener('scroll', animateSkills);

  const carousels = document.querySelectorAll('.image-carousel');

  carousels.forEach(carousel => {
    const images = carousel.querySelector('.carousel-images');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dots = carousel.querySelectorAll('.carousel-dot');

    let currentIndex = 0;
    const imageCount = images.children.length;

    function goToSlide(index) {
      if (index < 0) index = imageCount - 1;
      if (index >= imageCount) index = 0;

      currentIndex = index;
      images.style.transform = `translateX(-${currentIndex * 100}%)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goToSlide(i));
    });

    let autoSlide = setInterval(nextSlide, 4000);

    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoSlide);
    });

    carousel.addEventListener('mouseleave', () => {
      autoSlide = setInterval(nextSlide, 4000);
    });
  });

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));

      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = this.name.value;
    const email = this.email.value;
    const subject = this.subject.value;
    const message = this.message.value;

    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    alert(`Thank you for your message, ${name}! I'll get back to you soon.`);


    this.reset();
  });


  animateSkills();
});

// ----------------EMAIL MESSAGE--------------------//


(function () {
  emailjs.init("FjnSbqKDd4Rb2m7_N");
})();

document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();

  emailjs.sendForm("service_fzurmlj", "template_pxapq75", this)
    .then(() => {
      alert(" Message sent successfully!");
      this.reset();
    })
    .catch((error) => {
      alert(" Failed to send message: " + error.text);
      console.error("EmailJS Error:", error);
    });
});

// header functionality
const menuIcon = document.getElementById('menuIcon');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const navLinks = document.querySelectorAll('nav ul li a');

menuIcon.addEventListener('click', function () {
  navMenu.classList.toggle('active');
  menuIcon.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', function () {
    navMenu.classList.remove('active');
    menuIcon.classList.remove('active');


    navLinks.forEach(item => item.classList.remove('active'));
    this.classList.add('active');
  });
});


window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 50);
});


themeToggle.addEventListener('click', function () {
  document.body.classList.toggle('dark-theme');

  if (document.body.classList.contains('dark-theme')) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
});

document.addEventListener('click', function (e) {
  if (!navMenu.contains(e.target) && !menuIcon.contains(e.target) && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    menuIcon.classList.remove('active');
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// AI Chatbot Functionality
document.addEventListener('DOMContentLoaded', function() {
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotText = document.getElementById('chatbot-text');
  const chatbotSend = document.getElementById('chatbot-send');
  const chatbotMessages = document.getElementById('chatbot-messages');
  
  chatbotToggle.addEventListener('click', function() {
    chatbotContainer.classList.toggle('active');
    if (chatbotContainer.classList.contains('active')) {
      setTimeout(() => {
        chatbotText.focus();
      }, 300);
    }
  });
  
  chatbotClose.addEventListener('click', function() {
    chatbotContainer.classList.remove('active');
  });
  
  function sendMessage() {
    const message = chatbotText.value.trim();
    if (message === '') return;
    
    addMessage(message, 'user');
    chatbotText.value = '';
    
    showTypingIndicator();
    
    setTimeout(() => {
      removeTypingIndicator();
      
      const response = generateResponse(message);
      
      addMessage(response, 'bot');
    }, 1500);
  }
  
  function addMessage(text, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${type}-message`);
    messageElement.textContent = text;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  
  function showTypingIndicator() {
    const typingElement = document.createElement('div');
    typingElement.classList.add('typing-indicator');
    typingElement.id = 'typing-indicator';
    typingElement.innerHTML = '<span></span><span></span><span></span>';
    chatbotMessages.appendChild(typingElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  
  function removeTypingIndicator() {
    const typingElement = document.getElementById('typing-indicator');
    if (typingElement) {
      typingElement.remove();
    }
  }
  
  function generateResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || 
        lowerMessage.includes('hey') || lowerMessage.includes('hola')) {
      return "Hello there! How can I help you today?";
    }
    
    if (lowerMessage.includes('who are you') || lowerMessage.includes('what are you')) {
      return "I'm an AI assistant designed to help you learn more about Rahul Kumar and his portfolio.";
    }
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || 
        lowerMessage.includes('tech stack') || lowerMessage.includes('what can you do')) {
      return "Rahul is skilled in HTML5, CSS3, JavaScript, React.js, Bootstrap, and Tailwind CSS. He has 1+ years of experience in frontend development.";
    }
    
    if (lowerMessage.includes('project') || lowerMessage.includes('work') || 
        lowerMessage.includes('portfolio') || lowerMessage.includes('experience')) {
      return "Rahul has worked on several projects including PhoneGo (e-commerce), The RasamRoute (food ordering), and COB System (customer onboarding for SabPaisa).";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || 
        lowerMessage.includes('hire') || lowerMessage.includes('reach')) {
      return "You can contact Rahul through the contact form on this portfolio or via WhatsApp at +91 7766071191. He's available for freelance projects and full-time opportunities.";
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're welcome! Is there anything else you'd like to know about Rahul?";
    }
    
    return "I'm not sure I understand. You can ask me about Rahul's skills, projects, or how to contact him.";
  }
  
  chatbotSend.addEventListener('click', sendMessage);
  
  chatbotText.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  document.addEventListener('click', function(e) {
    if (chatbotContainer.classList.contains('active') && 
        !chatbotContainer.contains(e.target) && 
        e.target !== chatbotToggle) {
      chatbotContainer.classList.remove('active');
    }
  });
});