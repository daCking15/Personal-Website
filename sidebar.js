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
  // Determine if we're in the projects folder
  const isInProjectsFolder = window.location.pathname.includes('/projects/');
  const sidebarPath = isInProjectsFolder ? '../sidebar.html' : 'sidebar.html';
  const homePath = isInProjectsFolder ? '../index.html' : 'index.html';
  
  fetch(sidebarPath)
    .then(response => response.text())
    .then(html => {
      const sidebarContainer = document.getElementById('sidebar-container');
      if (sidebarContainer) {
        // Fix asset paths if we're in the projects folder
        if (isInProjectsFolder) {
          html = html.replace(/href="assets\//g, 'href="../assets/');
          html = html.replace(/src="assets\//g, 'src="../assets/');
        }
        sidebarContainer.innerHTML = html;
        // After loading sidebar, populate projects list
        const projectsList = document.getElementById('projects-list');
        if (projectsList) {
          const homeLink = `<li class="mb-2 project-list-item"><a href="${homePath}" class="project-link text-decoration-none text-muted d-block text-center py-2 rounded">Home</a></li>`;
          const projectLinks = projectsNavData.map(project => {
            let href = currentProjectId === project.id ? '#' : project.fileName;
            // If in projects folder and not current project, make path relative
            if (isInProjectsFolder && currentProjectId !== project.id) {
              // Extract just the filename from "projects/tanks.html"
              href = project.fileName.replace('projects/', '');
            }
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
