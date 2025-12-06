import { profileData } from "../../data/profileData.js";

function Experience() {
  const { experience, education } = profileData;

  return (
    <div className="section">
      <h2 className="section-title">Experience & Education</h2>
      <div className="experience-grid">
        <div>
          <h3 className="subsection-title">Experience</h3>
          {experience && experience.length ? (
            <ul className="timeline">
              {experience.map((exp, idx) => (
                <li key={idx} className="timeline-item">
                  <h4>{exp.role}</h4>
                  <p className="timeline-org">
                    {exp.organization} · {exp.location}
                  </p>
                  <p className="timeline-time">
                    {exp.start} – {exp.end || "Present"}
                  </p>
                  <ul className="timeline-details">
                    {exp.details?.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No experience added yet.</p>
          )}
        </div>
        <div>
          <h3 className="subsection-title">Education</h3>
          {education && education.length ? (
            <ul className="timeline">
              {education.map((ed, idx) => (
                <li key={idx} className="timeline-item">
                  <h4>{ed.degree}</h4>
                  <p className="timeline-org">
                    {ed.institution} · {ed.location}
                  </p>
                  <p className="timeline-time">
                    {ed.startYear} – {ed.endYear || "Present"}
                  </p>
                  <ul className="timeline-details">
                    {ed.details?.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No education details added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Experience;
