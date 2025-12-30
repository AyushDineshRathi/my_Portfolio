import { profileData } from "../../data/profileData.js";

function Experience() {
  const { experience, education } = profileData;

  return (
    <section className="section container">
      <h2 className="section-title">Experience & Education</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>Experience</h3>
          {experience && experience.length ? (
            <div className="timeline">
              {experience.map((exp, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-role">{exp.role}</div>
                  <div className="timeline-org">
                    {exp.organization} · {exp.location}
                  </div>
                  <div className="timeline-date">
                    {exp.start} – {exp.end || "Present"}
                  </div>
                  <ul className="timeline-desc" style={{ marginTop: '0.5rem' }}>
                    {exp.details?.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No experience added yet.</p>
          )}
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>Education</h3>
          {education && education.length ? (
            <div className="timeline">
              {education.map((ed, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-role">{ed.degree}</div>
                  <div className="timeline-org">
                    {ed.institution} · {ed.location}
                  </div>
                  <div className="timeline-date">
                    {ed.startYear} – {ed.endYear || "Present"}
                  </div>
                  <ul className="timeline-desc" style={{ marginTop: '0.5rem' }}>
                    {ed.details?.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No education details added yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Experience;
