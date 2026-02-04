// Sidebar navigation data and functions
const projectsNavData = [
  { id: 'project-tanks', name: 'Tanks 3D', fileName: 'projects/tanks.html' },
  { id: 'project-mariam', name: 'Eyes of Mariam', fileName: 'projects/mariam.html' },
  { id: 'project-mirror', name: 'Interactive Mirror', fileName: 'projects/mirror.html' },
  { id: 'project-rollercoaster', name: 'Crazy Rollercoaster', fileName: 'projects/rollercoaster.html' },
  { id: 'project-predator', name: 'Predator vs Prey', fileName: 'projects/predator.html' },
  { id: 'project-particle', name: 'Particle Generator', fileName: 'projects/particle.html' },
  { id: 'project-maze', name: 'Maze Game', fileName: 'projects/maze.html' },
  { id: 'project-myaux', name: 'My Aux', fileName: 'projects/myaux.html' }
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
          const homeLink = `<li class="mb-2 project-list-item"><a href="#" data-route="home" class="project-link text-decoration-none text-muted d-block text-center py-2 rounded ${currentProjectId === null ? 'active' : ''}">Home</a></li>`;
          const projectLinks = projectsNavData.map(project => {
            const activeClass = currentProjectId === project.id ? 'active' : '';
            return `<li class="mb-2 project-list-item"><a href="#" data-route="${project.id}" class="project-link text-decoration-none text-muted d-block text-center py-2 rounded ${activeClass}">${project.name}</a></li>`;
          }).join('');
          projectsList.innerHTML = homeLink + projectLinks;
        }
      }
    })
    .catch(error => {
      console.error('Error loading sidebar:', error);
    });
}
