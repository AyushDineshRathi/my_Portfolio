import { profileData } from "../../data/profileData.js";

function About() {
  const { basicInfo } = profileData;

  return (
    <div className="section">
      <h2 className="section-title">About Me</h2>
      <div className="about-grid">
        <div className="about-text">
          {basicInfo.bio.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
        <div className="about-info">
          <div>
            <strong>Location:</strong> {basicInfo.location}
          </div>
          <div>
            <strong>Email:</strong> {basicInfo.email}
          </div>
          <div>
            <strong>Availability:</strong> {basicInfo.availability}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
