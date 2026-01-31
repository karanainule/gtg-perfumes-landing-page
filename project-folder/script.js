const productImages = [
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=700&fit=crop",
  "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=600&h=700&fit=crop",
  "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&h=700&fit=crop",
  "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=700&fit=crop",
];

const thumbnails = [
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1541643600914-78b084683601?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=150&h=150&fit=crop",
];

let currentImage = 0;

function initGallery() {
  const dotsContainer = document.getElementById('gallery-dots');
  const thumbsContainer = document.getElementById('thumbnails');

  productImages.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => setImage(i);
    dotsContainer.appendChild(dot);
  });

  thumbnails.forEach((thumb, i) => {
    const btn = document.createElement('button');
    btn.className = 'thumbnail' + (i === 0 ? ' active' : '');
    btn.onclick = () => setImage(i % productImages.length);
    btn.innerHTML = `<img src="${thumb}" alt="Thumbnail ${i + 1}">`;
    thumbsContainer.appendChild(btn);
  });
}

function setImage(index) {
  currentImage = index;
  document.getElementById('main-image').src = productImages[index];
  
  document.querySelectorAll('.gallery-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  
  document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
    thumb.classList.toggle('active', i % productImages.length === index);
  });
}

function nextImage() {
  setImage((currentImage + 1) % productImages.length);
}

function prevImage() {
  setImage((currentImage - 1 + productImages.length) % productImages.length);
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  
  menu.classList.toggle('active');
  menuIcon.style.display = menu.classList.contains('active') ? 'none' : 'block';
  closeIcon.style.display = menu.classList.contains('active') ? 'block' : 'none';
}

function selectSubscription(type) {
  document.getElementById('single-details').style.display = type === 'single' ? 'block' : 'none';
  document.getElementById('double-details').style.display = type === 'double' ? 'block' : 'none';
}

// ✅ FIXED: Single selection only
function selectFragrance(btn) {
  document.querySelectorAll('.fragrance-option').forEach(opt => opt.classList.remove('active'));
  btn.classList.add('active');
}

// ✅ FIXED: Single selection only  
function selectDelivery(btn) {
  document.querySelectorAll('.delivery-option').forEach(opt => opt.classList.remove('active'));
  btn.classList.add('active');
}

function toggleAccordion(btn) {
  const isActive = btn.classList.contains('active');
  
  document.querySelectorAll('.accordion-btn').forEach(b => {
    b.classList.remove('active');
    b.querySelector('svg').innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>';
  });
  document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('active'));
  
  if (!isActive) {
    btn.classList.add('active');
    btn.querySelector('svg').innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>';
    btn.nextElementSibling.classList.add('active');
  }
}

function animateCounters() {
  const counters = document.querySelectorAll('.stat-value');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        const target = parseInt(entry.target.dataset.target);
        let count = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            entry.target.textContent = target + '%';
            clearInterval(timer);
          } else {
            entry.target.textContent = Math.floor(count) + '%';
          }
        }, 16);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  animateCounters();
});
