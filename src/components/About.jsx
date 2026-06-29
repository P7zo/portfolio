import "./About.css";

const HIGHLIGHTS = [
  "Component-driven React",
  "Responsive, mobile-first layouts",
  "Accessibility & semantics",
  "Clean, maintainable code",
];

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <div className="about__intro">
          <span className="eyebrow">About Me</span>
          <h2>A bit about who I am</h2>
          <p>
            I'm a frontend developer who loves turning ideas into fast,
            polished interfaces. I care about the details — smooth
            interactions, sensible spacing, and code that's easy for the next
            person to read. This is placeholder text you can swap out for your
            own story.
          </p>
          <p>
            When I'm not building things for the web, I'm usually exploring new
            tools, contributing to side projects, or learning something new
            about design and performance.
          </p>
        </div>

        <ul className="about__highlights">
          {HIGHLIGHTS.map((item) => (
            <li key={item}>
              <span className="about__check" aria-hidden="true">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
