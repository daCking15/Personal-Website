// SPA Router for smooth navigation
const router = {
  currentRoute: 'home',
  contentContainer: null,
  initialHomeContent: null,
  
  init() {
    this.contentContainer = document.getElementById('projects-container');
    if (!this.contentContainer) {
      console.error('Content container not found');
      // Retry after a short delay
      setTimeout(() => this.init(), 100);
      return;
    }
    
    // Store the initial home content before it gets replaced
    if (!this.initialHomeContent) {
      this.initialHomeContent = this.contentContainer.innerHTML;
    }
    
    // Set initial opacity
    this.contentContainer.style.opacity = '1';
    
    // Wait a bit for sidebar to finish loading, then handle initial route
    setTimeout(() => {
      this.handleRoute();
    }, 100);
    
    // Listen for popstate (back/forward buttons)
    window.addEventListener('popstate', () => {
      this.handleRoute();
    });
    
    // Intercept navigation links (use event delegation for dynamically added links)
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-route]');
      if (link) {
        e.preventDefault();
        const route = link.getAttribute('data-route');
        this.navigate(route);
      }
    });
    
    // Handle window resize/orientation change for mobile project cards
    window.addEventListener('resize', () => {
      this.adjustProjectCardsForMobile();
    });
    
    // Initial adjustment
    this.adjustProjectCardsForMobile();
  },
  
  adjustProjectCardsForMobile() {
    if (window.innerWidth <= 767.98) {
      const projectCards = document.querySelectorAll('.project-card');
      const sidebarHeight = document.querySelector('#sidebar-container')?.offsetHeight || 60;
      const viewportHeight = window.innerHeight;
      const minHeight = viewportHeight - sidebarHeight;
      
      projectCards.forEach(card => {
        if (card.style.justifyContent === 'center') {
          card.style.justifyContent = 'flex-start';
        }
        // Set min-height to fill viewport minus sidebar
        card.style.minHeight = `${minHeight}px`;
        // Set small top padding
        card.style.paddingTop = '1rem';
        card.style.marginTop = '0';
      });
      
      // Also adjust projects container
      const projectsContainer = document.getElementById('projects-container');
      if (projectsContainer) {
        projectsContainer.style.minHeight = `${minHeight}px`;
        projectsContainer.style.paddingTop = '0';
        projectsContainer.style.marginTop = '0';
      }
    }
  },
  
  navigate(route) {
    if (this.currentRoute === route) return;
    
    // Update URL without reload, preserving base path
    const basePath = window.location.pathname;
    const newUrl = route === 'home' ? basePath : `${basePath}#${route}`;
    window.history.pushState({ route }, '', newUrl);
    this.currentRoute = route;
    this.loadContent(route);
  },
  
  handleRoute() {
    const hash = window.location.hash.slice(1);
    const route = hash || 'home';
    
    // Only load if route changed
    if (this.currentRoute !== route) {
      this.currentRoute = route;
      this.loadContent(route);
    }
  },
  
  async loadContent(route) {
    if (!this.contentContainer) return;
    
    // Smooth fade-out with slight transform
    this.contentContainer.style.transition = 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out';
    this.contentContainer.style.opacity = '0';
    this.contentContainer.style.transform = 'translateY(10px)';
    
    // Wait for fade-out to complete
    await new Promise(resolve => setTimeout(resolve, 400));
    
    try {
      let content = '';
      
      if (route === 'home') {
        // Load home timeline
        content = await this.loadHomeContent();
      } else {
        // Load project content
        content = await this.loadProjectContent(route);
      }
      
      this.contentContainer.innerHTML = content;
      
      // Reset transform for fade-in
      this.contentContainer.style.transform = 'translateY(-10px)';
      
      // Reinitialize any scripts needed (like carousel)
      this.reinitializeComponents();
      
      // Update active link in sidebar
      this.updateActiveLink(route);
      
      // Scroll to top
      this.contentContainer.parentElement.scrollTop = 0;
      
      // Smooth fade-in with transform
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.contentContainer.style.opacity = '1';
          this.contentContainer.style.transform = 'translateY(0)';
        }, 10);
      });
      
    } catch (error) {
      console.error('Error loading content:', error);
      this.contentContainer.style.opacity = '1';
      this.contentContainer.style.transform = 'translateY(0)';
    }
  },
  
  async loadHomeContent() {
    // Use stored initial home content if available
    if (this.initialHomeContent) {
      return this.initialHomeContent;
    }
    
    // Fallback: try to fetch home-content.html if it exists
    try {
      const response = await fetch('home-content.html');
      if (response.ok) {
        return await response.text();
      }
    } catch (error) {
      // Ignore fetch errors, use fallback
    }
    
    // Final fallback: return empty content
    return '<div class="container py-5"><p>Error loading content. Please refresh the page.</p></div>';
  },
  
  async loadProjectContent(projectId) {
    const projectMap = {
      'project-tanks': 'projects/tanks-content.html',
      'project-mariam': 'projects/mariam-content.html',
      'project-mirror': 'projects/mirror-content.html',
      'project-rollercoaster': 'projects/rollercoaster-content.html',
      'project-predator': 'projects/predator-content.html',
      'project-particle': 'projects/particle-content.html',
      'project-maze': 'projects/maze-content.html',
      'project-myaux': 'projects/myaux-content.html'
    };
    
    const filePath = projectMap[projectId];
    if (!filePath) {
      throw new Error(`Unknown project: ${projectId}`);
    }
    
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to load ${filePath}: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      console.error('Error loading project content:', error);
      return `<div class="container py-5"><p>Error loading ${projectId}. Please refresh the page.</p></div>`;
    }
  },
  
  reinitializeComponents() {
    // Override inline styles on project cards for mobile
    if (window.innerWidth <= 767.98) {
      const projectCards = this.contentContainer.querySelectorAll('.project-card');
      projectCards.forEach(card => {
        if (card.style.justifyContent === 'center') {
          card.style.justifyContent = 'flex-start';
        }
        if (card.style.minHeight && card.style.minHeight !== 'auto') {
          card.style.minHeight = 'auto';
        }
      });
    }
    
    // Execute any inline scripts in the loaded content first
    const scripts = this.contentContainer.querySelectorAll('script');
    scripts.forEach(oldScript => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
    
    // Reinitialize Bootstrap carousels after scripts are executed
    setTimeout(() => {
      const carousels = this.contentContainer.querySelectorAll('.carousel');
      carousels.forEach(carousel => {
        // Check if carousel is already initialized
        const existingCarousel = bootstrap.Carousel.getInstance(carousel);
        if (existingCarousel) {
          existingCarousel.dispose();
        }
        const bsCarousel = new bootstrap.Carousel(carousel);
      });
      
      // Trigger arrow color adjustment for tanks carousel after a delay to ensure images are loaded
      const tanksCarousel = this.contentContainer.querySelector('#tanksCarousel');
      if (tanksCarousel && typeof adjustArrowColors === 'function') {
        // Wait for images to load
        const images = tanksCarousel.querySelectorAll('img');
        let imagesLoaded = 0;
        const totalImages = images.length;
        
        if (totalImages === 0) {
          setTimeout(adjustArrowColors, 200);
        } else {
          images.forEach(img => {
            if (img.complete) {
              imagesLoaded++;
              if (imagesLoaded === totalImages) {
                setTimeout(adjustArrowColors, 100);
              }
            } else {
              img.addEventListener('load', () => {
                imagesLoaded++;
                if (imagesLoaded === totalImages) {
                  setTimeout(adjustArrowColors, 100);
                }
              });
            }
          });
        }
      }
    }, 50);
  },
  
  updateActiveLink(route) {
    // Remove active class from all links
    document.querySelectorAll('.project-link').forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to current route
    const activeLink = document.querySelector(`a[data-route="${route}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
    
    // Also update sidebar if it needs to be reloaded (in case sidebar was loaded before router)
    // This ensures the active state is correct even if sidebar loads first
    if (typeof loadSidebar === 'function') {
      const currentProjectId = route === 'home' ? null : route;
      // Only reload sidebar if the active link wasn't found (sidebar might be stale)
      if (!activeLink) {
        loadSidebar(currentProjectId);
      }
    }
  }
};

// Initialize router when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => router.init());
} else {
  router.init();
}
