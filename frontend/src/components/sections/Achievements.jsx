import { profileData } from "../../data/profileData.js";

function Achievements() {
  const { achievements } = profileData;

  if (!achievements || !achievements.length) {
    return null;
  }

  return (
    <div className="section">
      <h2 className="section-title">Achievements & Certifications</h2>
      <div className="achievements-grid">
        {achievements.map((item, idx) => (
          <div key={idx} className="achievement-card">
            <h3>{item.title}</h3>
            <p>
              <strong>{item.issuer}</strong> · {item.year}
            </p>
            <p>{item.description}</p>
            {item.link && (
              <a href={item.link} target="_blank" rel="noreferrer">
                View
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Achievements;
