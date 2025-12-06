import { profileData } from "../../data/profileData.js";

function Projects() {
  const { projects } = profileData;

  if (!projects.length) {
    return (
      <div className="section">
        <h2 className="section-title">Projects</h2>
        <p>Projects will be added soon.</p>
      </div>
    );
  }

  return (
    <div className="section">
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.name}</h3>
            <p className="project-tagline">{project.tagline}</p>
            <p className="project-description">
              {project.shortDescription}
            </p>
            <p className="project-tech">
              <strong>Tech:</strong> {project.techStack.join(", ")}
            </p>
            <div className="project-links">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
