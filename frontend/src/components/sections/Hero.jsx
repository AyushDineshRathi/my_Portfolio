import { profileData } from "../../data/profileData.js";

function Hero() {
  const { basicInfo } = profileData;

  return (
    <div className="section hero">
      <div className="hero-text">
        <p className="hero-greeting">Hi, I'm</p>
        <h1 className="hero-name">{basicInfo.name}</h1>
        <h2 className="hero-title">{basicInfo.title}</h2>
        <p className="hero-tagline">{basicInfo.tagline}</p>
        <div className="hero-actions">
          <a href="#projects" className="btn-primary">
            View Projects
          </a>
          <a href="#contact" className="btn-secondary">
            Contact Me
          </a>
        </div>
      </div>
      <div className="hero-visual">
        {basicInfo.profileImage ? (
          <img
            src={basicInfo.profileImage}
            alt={basicInfo.name}
            className="hero-image"
          />
        ) : (
          <div className="hero-placeholder">Your Photo</div>
        )}
      </div>
    </div>
  );
}

export default Hero;
