// Sidebar navigation data and functions
const projectsNavData = [
  { id: 'project-tanks', name: 'Tanks 3D', fileName: 'tanks.html' },
  { id: 'project-mariam', name: 'Eyes of Mariam', fileName: 'mariam.html' },
  { id: 'project-mirror', name: 'Interactive Mirror', fileName: 'mirror.html' },
  { id: 'project-rollercoaster', name: 'Crazy Rollercoaster', fileName: 'rollercoaster.html' },
  { id: 'project-predator', name: 'Predator vs Prey', fileName: 'predator.html' },
  { id: 'project-particle', name: 'Particle Generator', fileName: 'particle.html' },
  { id: 'project-maze', name: 'Maze Game', fileName: 'maze.html' },
  { id: 'project-myaux', name: 'My Aux', fileName: 'myaux.html' }
];

// Function to load sidebar HTML
function loadSidebar(currentProjectId = null) {
  fetch('sidebar.html')
    .then(response => response.text())
    .then(html => {
      const sidebarContainer = document.getElementById('sidebar-container');
      if (sidebarContainer) {
        sidebarContainer.innerHTML = html;
        // After loading sidebar, populate projects list
        const projectsList = document.getElementById('projects-list');
        if (projectsList) {
          const homeLink = '<li class="mb-2 project-list-item"><a href="index.html" class="project-link text-decoration-none text-muted d-block text-center py-2 rounded">Home</a></li>';
          const projectLinks = projectsNavData.map(project => {
            const href = currentProjectId === project.id ? '#' : project.fileName;
            const activeClass = currentProjectId === project.id ? 'active' : '';
            return `<li class="mb-2 project-list-item"><a href="${href}" class="project-link text-decoration-none text-muted d-block text-center py-2 rounded ${activeClass}">${project.name}</a></li>`;
          }).join('');
          projectsList.innerHTML = homeLink + projectLinks;
        }
      }
    })
    .catch(error => {
      console.error('Error loading sidebar:', error);
    });
}
