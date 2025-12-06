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
    <footer className="footer">
      <div className="footer-top">
        <div>&copy; {new Date().getFullYear()} {profileData.basicInfo.name}</div>

        <div className="footer-social">
          {social.map((s, idx) => {
            const key = s.platform.toLowerCase();
            const Icon = iconMap[key];

            return (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon"
              >
                {Icon ? <Icon size={20} /> : s.platform}
              </a>
            );
          })}
        </div>
      </div>

      <div className="footer-bottom">
        Built with ❤️ using React + Vite
      </div>
    </footer>
  );
}

export default Footer;
