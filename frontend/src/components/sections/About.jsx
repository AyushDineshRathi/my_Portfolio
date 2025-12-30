import { profileData } from "../../data/profileData.js";

function About() {
  const { basicInfo } = profileData;

  return (
    <section className="section container">
      <h2 className="section-title">About Me</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
        <div style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
          {basicInfo.bio.map((line, idx) => (
            <p key={idx} style={{ marginBottom: '1rem' }}>{line}</p>
          ))}
        </div>
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)'
          }}
        >
          <div style={{ marginBottom: '0.8rem' }}>
            <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-soft)', textTransform: 'uppercase' }}>Location</span>
            <span>{basicInfo.location}</span>
          </div>
          <div style={{ marginBottom: '0.8rem' }}>
            <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-soft)', textTransform: 'uppercase' }}>Email</span>
            <span>{basicInfo.email}</span>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-soft)', textTransform: 'uppercase' }}>Availability</span>
            <span>{basicInfo.availability}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
