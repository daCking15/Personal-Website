// Projects data - single source of truth
const projectsData = [
  {
    id: 'project-tanks',
    name: 'Tanks 3D',
    title: 'Tanks 3D',
    image: 'assets/Tanks3D.png',
    imageAlt: 'Tanks 3D',
    description: 'An independently developed local multiplayer game based off <a href="https://www.addictinggames.com/strategy/tanks" target="_blank" rel="noopener">Tanks</a>.',
    links: [
      { text: 'Tanks 3D - Windows 10', url: 'https://drive.google.com/file/d/1tT-IDbtfIEdRaA1YNm8qGcXn0vjJTCTR/view?usp=sharing' },
      { text: 'Tanks 3D - Web GL', url: 'https://drive.google.com/file/d/11APk7F6-FenBn0dZnr4fbMMxT6doM9uA/view?usp=sharing' },
      { text: 'Controls', url: 'https://drive.google.com/file/d/17zlwyktAkVkoSAS7mygB7l8T4V9aqgcK/view?usp=sharing' }
    ],
    disabled: true
  },
  {
    id: 'project-mariam',
    name: 'Eyes of Mariam',
    title: 'Eyes of Mariam',
    image: 'assets/Kojo.jpg',
    imageAlt: 'Eyes of Mariam',
    description: 'A collaboritively developed single player experience in collaboration with <a href="https://equalitylab.org/" target="_blank" rel="noopener">Equality Lab</a> and <a href="https://www.savethechildren.org/" target="_blank" rel="noopener">Save the Children</a> for <a href="http://web.cse.ohio-state.edu/~wang.3602/courses/cse5913-2018-spring/index.html" target="_blank" rel="noopener">CSE 5913</a>.',
    links: [
      { text: 'Eyes of Mariam', url: 'https://drive.google.com/file/d/1Uc3XGNWAKJfi2dIsHNlDqX7_60A7GOx9/view?usp=sharing' }
    ]
  },
  {
    id: 'project-mirror',
    name: 'Interactive Mirror',
    title: 'Interactive Mirror',
    image: 'assets/covid.png',
    imageAlt: 'Interactive Mirror',
    description: 'A collaboritively developed web application fulfilling the semester project for <a href="http://web.cse.ohio-state.edu/~shen.94/5544/" target="_blank" rel="noopener">CSE 5544</a>.',
    links: [
      { text: 'Interactive Mirror', url: 'https://dacking15.github.io/InteractiveMirror/' },
      { text: 'Research Paper', url: 'assets/Research%20Paper.pdf', download: true }
    ]
  },
  {
    id: 'project-rollercoaster',
    name: 'Crazy Rollercoaster',
    title: 'Crazy Rollercoaster',
    image: 'assets/rollercoaster.png',
    imageAlt: 'Crazy Rollercoaster',
    description: 'A collaboritively developed experience fulfilling <a href="http://web.cse.ohio-state.edu/~boggus.2/3541/lab5.html" target="_blank" rel="noopener">Lab 5</a> of <a href="http://web.cse.ohio-state.edu/~boggus.2/3541/" target="_blank" rel="noopener">CSE 3541</a>.',
    links: [
      { text: 'Crazy Rollercoaster', url: 'https://dacking15.github.io/Lab8/' }
    ]
  },
  {
    id: 'project-predator',
    name: 'Predator vs Prey',
    title: 'Predator vs Prey',
    image: 'assets/predator.png',
    imageAlt: 'Predator vs Prey',
    description: 'An independently developed experience fulfilling <a href="http://web.cse.ohio-state.edu/~boggus.2/3541/lab4.html" target="_blank" rel="noopener">Lab 4</a> of <a href="http://web.cse.ohio-state.edu/~boggus.2/3541/" target="_blank" rel="noopener">CSE 3541</a>.',
    links: [
      { text: 'Predator vs Prey', url: 'https://dacking15.github.io/Lab4/' }
    ]
  },
  {
    id: 'project-particle',
    name: 'Particle Generator',
    title: 'Particle Generator',
    image: 'assets/particle.png',
    imageAlt: 'Particle Generator',
    description: 'An independently developed experience fulfilling <a href="http://web.cse.ohio-state.edu/~boggus.2/3541/lab3.html" target="_blank" rel="noopener">Lab 3</a> of <a href="http://web.cse.ohio-state.edu/~boggus.2/3541/" target="_blank" rel="noopener">CSE 3541</a>.',
    links: [
      { text: 'Particle Generator', url: 'https://dacking15.github.io/Lab3/' }
    ]
  },
  {
    id: 'project-maze',
    name: 'Maze Game',
    title: 'Maze Game',
    image: 'assets/maze.png',
    imageAlt: 'Maze Game',
    description: 'An independently developed experience fulfilling <a href="http://web.cse.ohio-state.edu/~boggus.2/3541/lab2.html" target="_blank" rel="noopener">Lab 2</a> of <a href="http://web.cse.ohio-state.edu/~boggus.2/3541/" target="_blank" rel="noopener">CSE 3541</a>.',
    links: [
      { text: 'Maze Game', url: 'https://dacking15.github.io/Lab2/' }
    ]
  },
  {
    id: 'project-myaux',
    name: 'My Aux',
    title: 'MyAux',
    image: 'assets/myaux.png',
    imageAlt: 'MyAux',
    description: 'An independently developed website designed for <a href="https://www.asc.ohio-state.edu/patterson.680/5140/" target="_blank" rel="noopener">ACCAD 5140</a>.',
    links: [
      { text: 'MyAux', url: 'https://dacking15.github.io/MyAux/' }
    ]
  }
];

// Function to render a project card (for index.html Bootstrap style)
function renderProjectCard(project) {
  let titleHtml = `<h2 class="display-5 fw-bold mb-3 text-dark">${project.title}</h2>`;
  let linksHtml = '';
  
  if (project.links.length > 0) {
    if (project.disabled) {
      const linkElements = project.links.map((link) => {
        return `<button disabled class="btn btn-outline-secondary me-2 mb-2 disabled-project-btn" style="cursor: not-allowed;">${link.text}</button>`;
      }).join('');
      linksHtml = `<div class="mb-4 disabled-buttons-container">${linkElements}<p class="disabled-note text-muted small mb-0 mt-2"><em>Locating files for upload</em></p></div>`;
    } else {
      const linkElements = project.links.map((link) => {
        const linkAttrs = link.download ? 'download' : 'target="_blank" rel="noopener"';
        return `<a href="${link.url}" ${linkAttrs} class="btn btn-outline-primary me-2 mb-2">${link.text}</a>`;
      }).join('');
      linksHtml = `<div class="mb-4">${linkElements}</div>`;
    }
  }

  return `
    <div id="${project.id}" class="project-card bg-white px-5 py-5" style="min-height: 100vh; width: 100%; display: flex; flex-direction: column; justify-content: center; max-width: 1200px; margin: 0 auto;">
      <div class="mb-5">
        ${titleHtml}
        ${linksHtml}
      </div>
      <div class="mb-4">
        <img src="${project.image}" alt="${project.imageAlt}" class="img-fluid rounded shadow-sm" style="max-height: 60vh; object-fit: contain; width: 100%;">
      </div>
      <div class="mt-3">
        <p class="lead text-muted mb-0" style="line-height: 1.8;">${project.description}</p>
      </div>
    </div>
  `;
}

// Function to render project list items for sidebar
function renderProjectListItem(project) {
  return `<li class="mb-2 project-list-item"><a href="#${project.id}" class="project-link text-decoration-none text-muted d-block text-center py-2 rounded">${project.name}</a></li>`;
}
