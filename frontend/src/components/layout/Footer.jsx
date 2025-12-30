import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaMedium,
} from "react-icons/fa";

import { SiLeetcode, SiCodechef } from "react-icons/si";
import { profileData } from "../../data/profileData";

function Footer() {
  const social = profileData.socialLinks;

  // Map platforms → icons (case-insensitive)
  const iconMap = {
    github: FaGithub,
    linkedin: FaLinkedin,
    instagram: FaInstagram,
    medium: FaMedium,
    email: FaEnvelope,
    gmail: FaEnvelope,

    // Tech platforms
    leetcode: SiLeetcode,
    codechef: SiCodechef,
  };

  return (
    <footer className="footer container" style={{ marginTop: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontWeight: 500 }}>&copy; {new Date().getFullYear()} {profileData.basicInfo.name}</div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {social.map((s, idx) => {
            const key = s.platform.toLowerCase();
            const Icon = iconMap[key];

            return (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-muted)', transition: 'color 0.2s', fontSize: '1.2rem' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                {Icon ? <Icon size={20} /> : s.platform}
              </a>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-soft)' }}>
        Built with React + Vite
      </div>
    </footer>
  );
}

export default Footer;
