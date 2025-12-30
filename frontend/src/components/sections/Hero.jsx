import { profileData } from "../../data/profileData.js";

function Hero() {
  const { basicInfo } = profileData;

  return (
    <section className="container hero-section">
      <div className="hero-content">
        <div className="hero-text animate-fade-up">
          <h1>
            {basicInfo.name}
          </h1>
          <h2>{basicInfo.title}</h2>
          <p className="hero-description">
            {basicInfo.tagline}
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Work
            </a>
            <a href="#contact" className="btn btn-outline">
              Contact Me
            </a>
          </div>
        </div>

        <div className="hero-image-wrapper animate-fade-up" style={{ animationDelay: '0.2s' }}>
          {basicInfo.profileImage ? (
            <img
              src={basicInfo.profileImage}
              alt={basicInfo.name}
              className="hero-img"
            />
          ) : (
            <div className="hero-img" style={{ background: 'var(--bg-subtle)' }} />
          )}
          <div className="hero-decoration"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
