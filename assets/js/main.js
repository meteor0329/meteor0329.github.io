/**
* Template Name: MinimalFolio
* Template URL: https://bootstrapmade.com/minimalfolio-bootstrap-portfolio-template/
* Updated: Aug 05 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader || (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top'))) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }


  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }

  window.addEventListener('load', aosInit);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  if (typeof GLightbox !== 'undefined') {
    let glightbox = null;

    const updateLightboxGallery = (filterValue) => {
      const allLinks = document.querySelectorAll('.portfolio-item .glightbox');

      allLinks.forEach((link) => {
        const item = link.closest('.portfolio-item');
        if (!filterValue || filterValue === '*') {
          // 預設或點選 All Projects 時，全部 18 張共用同一群組
          link.setAttribute('data-gallery', 'gallery-all');
        } else if (item && item.matches(filterValue)) {
          // 點選單一分類時，只有該分類的作品共用群組
          link.setAttribute('data-gallery', 'gallery-filtered');
        } else {
          // 隱藏的其他分類移除群組，避免切換時出現
          link.removeAttribute('data-gallery');
        }
      });

      if (glightbox) {
        glightbox.destroy();
      }
      glightbox = GLightbox({
        selector: '.glightbox'
      });
    };

    // 1. 頁面剛載入時，先以 All Projects (*) 初始化全部 18 張
    updateLightboxGallery('*');

    // 2. 監聽分類篩選按鈕點擊，切換對應群組
    document.querySelectorAll('.portfolio-filters li').forEach((filterBtn) => {
      filterBtn.addEventListener('click', function () {
        const filterValue = this.getAttribute('data-filter');
        updateLightboxGallery(filterValue);
      });
    });
  }



  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * 作品集分類記憶與詳情頁上/下一個循環切換邏輯
   */
  document.addEventListener('DOMContentLoaded', function() {
    // 1. 首頁功能：點擊篩選按鈕時，把目前分類帶入所有作品連結，並記住分類
    const filterButtons = document.querySelectorAll('.isotope-filters li');
    if (filterButtons.length > 0) {
      filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
          const filterVal = this.getAttribute('data-filter');
          const currentCat = (filterVal === '*') ? 'all' : filterVal.replace('.filter-', '');
          sessionStorage.setItem('selectedPortfolioCat', currentCat);

          document.querySelectorAll('.portfolio-item a.details-link').forEach(link => {
            const baseUrl = link.getAttribute('href').split('?')[0];
            link.setAttribute('href', `${baseUrl}?cat=${currentCat}`);
          });
        });
      });

      // 若是從詳情頁按 Back to 返回首頁，自動恢復剛才的分類篩選
      const urlParams = new URLSearchParams(window.location.search);
      const returnCat = urlParams.get('cat') || sessionStorage.getItem('selectedPortfolioCat');
      if (returnCat && returnCat !== 'all') {
        const targetBtn = document.querySelector(`.isotope-filters li[data-filter=".filter-${returnCat}"]`);
        if (targetBtn) {
          setTimeout(() => targetBtn.click(), 300);
        }
      }
    }

    // 2. 詳情頁功能：自動計算「上一個 / 下一個」並更新按鈕文字與連結
    const projectNav = document.querySelector('.project-navigation');
    if (projectNav && typeof projects !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const currentCat = urlParams.get('cat') || sessionStorage.getItem('selectedPortfolioCat') || 'all';
      const currentPath = window.location.pathname.split('/').pop();

      const catNames = {
        all: 'All Projects',
        branding: 'Branding',
        graphic: 'Graphic Design',
        product: 'Product Design',
        uiux: 'UI/UX Design'
      };

      const filteredProjects = projects.filter(p => p.categories.includes(currentCat));
      const currentIndex = filteredProjects.findIndex(p => p.url === currentPath);

      if (currentIndex !== -1 && filteredProjects.length > 0) {
        const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
        const nextIndex = (currentIndex + 1) % filteredProjects.length;

        const prevProject = filteredProjects[prevIndex];
        const nextProject = filteredProjects[nextIndex];

        const navItems = projectNav.querySelectorAll('.project-nav-item');
        // 左側：Previous Project
        if (navItems[0]) {
          navItems[0].href = `${prevProject.url}?cat=${currentCat}`;
          const strongEl = navItems[0].querySelector('strong');
          if (strongEl) strongEl.textContent = prevProject.title;
        }
        // 中間：Back to 分類名稱
        if (navItems[1]) {
          navItems[1].href = `index.html?cat=${currentCat}#portfolio`;
          const strongEl = navItems[1].querySelector('strong');
          if (strongEl) strongEl.textContent = catNames[currentCat] || 'All Projects';
        }
        // 右側：Next Project
        if (navItems[2]) {
          navItems[2].href = `${nextProject.url}?cat=${currentCat}`;
          const strongEl = navItems[2].querySelector('strong');
          if (strongEl) strongEl.textContent = nextProject.title;
        }
      }
    }
  });

})();