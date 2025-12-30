import { profileData } from "../../data/profileData.js";

function Skills() {
  const { skills } = profileData;

  return (
    <section className="section container">
      <h2 className="section-title">Skills & Tech Stack</h2>
      <div className="skills-wrapper">
        {skills.map((category) => (
          <div key={category.category} className="project-card" style={{ padding: '1.25rem' }}>
            <div className="skill-category">
              <h3>{category.category}</h3>
            </div>
            <ul className="skill-list">
              {category.items.map((skill) => (
                <li key={skill.name} className="skill-item">
                  <span>{skill.name}</span>
                  {skill.level && (
                    <span>{skill.level}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
