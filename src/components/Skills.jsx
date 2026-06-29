import { SKILLS } from "../data/content";
import "./Skills.css";

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Skills</span>
          <h2>Tools &amp; Technologies</h2>
          <p>A selection of the technologies I work with day to day.</p>
        </div>

        <ul className="skills__grid">
          {SKILLS.map((skill) => (
            <li key={skill.name} className="skill-card">
              <span className="skill-card__icon" aria-hidden="true">
                {skill.icon}
              </span>
              <span className="skill-card__name">{skill.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
