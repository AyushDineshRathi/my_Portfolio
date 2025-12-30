import { profileData } from "../../data/profileData.js";

function Achievements() {
  const { achievements } = profileData;

  if (!achievements || !achievements.length) {
    return null;
  }

  return (
    <section className="section container">
      <h2 className="section-title">Achievements & Certifications</h2>
      <div className="projects-grid">
        {achievements.map((item, idx) => (
          <div key={idx} className="project-card">
            <h3 className="project-title" style={{ fontSize: '1.1rem' }}>{item.title}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-soft)', marginBottom: '0.5rem' }}>
              <strong>{item.issuer}</strong> · {item.year}
            </p>
            <p className="project-desc">{item.description}</p>
            {item.link && (
              <a href={item.link} target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: 'var(--accent)', textDecoration: 'none' }}>
                View Certificate &rarr;
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Achievements;
