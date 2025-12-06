import { profileData } from "../../data/profileData.js";

function Skills() {
  const { skills } = profileData;

  return (
    <div className="section">
      <h2 className="section-title">Skills & Tech Stack</h2>
      <div className="skills-grid">
        {skills.map((category) => (
          <div key={category.category} className="skills-card">
            <h3 className="skills-category">{category.category}</h3>
            <ul>
              {category.items.map((skill) => (
                <li key={skill.name}>
                  {skill.name}
                  {skill.level && (
                    <span className="skills-level">({skill.level})</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
