console.log("Test");

// Bootstrap Icons for mobile navigation
const iconClasses = {
  home: 'bi-house-fill',
  controller: 'bi-controller',
  eye: 'bi-eye-fill',
  camera: 'bi-camera-fill',
  speedometer: 'bi-speedometer2',
  shield: 'bi-shield-fill',
  star: 'bi-star-fill',
  grid: 'bi-grid-3x3-gap-fill',
  music: 'bi-music-note-beamed'
};

// Sidebar navigation data and functions
const projectsNavData = [
  { id: 'project-tanks', name: 'Tanks 3D', fileName: 'projects/tanks.html', iconKey: 'controller' },
  { id: 'project-mariam', name: 'Eyes of Mariam', fileName: 'projects/mariam.html', iconKey: 'eye' },
  { id: 'project-mirror', name: 'Interactive Mirror', fileName: 'projects/mirror.html', iconKey: 'camera' },
  { id: 'project-rollercoaster', name: 'Crazy Rollercoaster', fileName: 'projects/rollercoaster.html', iconKey: 'speedometer' },
  { id: 'project-predator', name: 'Predator vs Prey', fileName: 'projects/predator.html', iconKey: 'shield' },
  { id: 'project-particle', name: 'Particle Generator', fileName: 'projects/particle.html', iconKey: 'star' },
  { id: 'project-maze', name: 'Maze Game', fileName: 'projects/maze.html', iconKey: 'grid' },
  { id: 'project-myaux', name: 'My Aux', fileName: 'projects/myaux.html', iconKey: 'music' }
];

// Function to load sidebar HTML
function loadSidebar(currentProjectId = null) {
  // Always use root paths since we're now using SPA
  fetch('sidebar.html')
    .then(response => response.text())
    .then(html => {
      const sidebarContainer = document.getElementById('sidebar-container');
      if (sidebarContainer) {
        sidebarContainer.innerHTML = html;
        // After loading sidebar, populate projects list with router links
        const projectsList = document.getElementById('projects-list');
        if (projectsList) {
          const homeLink = `<li class="mb-2 project-list-item"><a href="#" data-route="home" class="project-link text-decoration-none text-muted d-block text-center py-2 rounded ${currentProjectId === null ? 'active' : ''}" title="Home"><i class="bi ${iconClasses.home} mobile-icon d-md-none"></i><span class="desktop-text">Home</span></a></li>`;
          const projectLinks = projectsNavData.map(project => {
            const activeClass = currentProjectId === project.id ? 'active' : '';
            const iconClass = iconClasses[project.iconKey] || iconClasses.star; // Fallback icon
            return `<li class="mb-2 project-list-item"><a href="#" data-route="${project.id}" class="project-link text-decoration-none text-muted d-block text-center py-2 rounded ${activeClass}" title="${project.name}"><i class="bi ${iconClass} mobile-icon d-md-none"></i><span class="desktop-text">${project.name}</span></a></li>`;
          }).join('');
          projectsList.innerHTML = homeLink + projectLinks;
          
          // Debug: Log to verify icons are being added
          console.log('Icons added to sidebar:', projectsList.children.length, 'items');
        }
      }
    })
    .catch(error => {
      console.error('Error loading sidebar:', error);
    });
}
