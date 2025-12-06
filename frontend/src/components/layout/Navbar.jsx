import { profileData } from "../../data/profileData.js";

function Navbar() {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" }
  ];

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">{profileData.basicInfo.name}</span>
      </div>
      <nav className="navbar-right">
        {navItems.map((item) => (
          <button
            key={item.id}
            className="navbar-link"
            onClick={() => handleScroll(item.id)}
          >
            {item.label}
          </button>
        ))}
        {profileData.basicInfo.resumeLink && (
          <a
            href={profileData.basicInfo.resumeLink}
            target="_blank"
            rel="noreferrer"
            className="navbar-btn"
          >
            Resume
          </a>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
