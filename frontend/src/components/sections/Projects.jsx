import { profileData } from "../../data/profileData.js";

function Projects() {
  const { projects } = profileData;

  if (!projects.length) return null;

  return (
    <section className="section container">
      <h2 className="section-title">Selected Work</h2>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <div>
                <h3 className="project-title">{project.name}</h3>
                <span className="project-subtitle">{project.category}</span>
              </div>
            </div>

            <p className="project-desc">
              {project.shortDescription}
            </p>

            {/* PAI Structure Visualization */}
            <div className="pai-grid">
              <div className="pai-item">
                <strong>Focus</strong>
                <span>{project.tagline}</span>
              </div>
              <div className="pai-item">
                <strong>Impact / Key Results</strong>
                <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                  {project.highlights.slice(0, 2).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="tech-stack">
              {project.techStack.map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>

            <div className="project-links">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="link-icon"
                >
                  Code
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="link-icon"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
