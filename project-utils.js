// Shared utility function for rendering project cards
function renderProjectCard(project) {
  let titleHtml = `<h2 class="display-5 fw-bold mb-3 text-dark">${project.title}</h2>`;
  let linksHtml = '';
  
  if (project.links && project.links.length > 0) {
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
