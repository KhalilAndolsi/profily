import { cv_mockup } from "../../../constants/mockup"
import "./modern-cv.css"

const formatDate = (date) => {
  if (!date) return "Present"

  const [year, month] = date.split("-")
  if (!month) return year

  return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })
}

const ModernCV = ({ cv = cv_mockup }) => {
  const fullName = `${cv.firstName} ${cv.lastName}`

  return (
    <article className="modern-cv">
      <aside className="modern-cv__sidebar">
        <div className="modern-cv__profile">
          {cv.photo && (
            <img
              className="modern-cv__photo"
              src={cv.photo}
              alt={`${fullName} portrait`}
            />
          )}
          <h1 className="modern-cv__name">{fullName}</h1>
          <p className="modern-cv__title">{cv.title}</p>
        </div>

        <section className="modern-cv__sidebar-section">
          <h2>Contact</h2>
          <address>
            <a href={`mailto:${cv.email}`}>{cv.email}</a>
            <a href={`tel:${cv.phone}`}>{cv.phone}</a>
            <span>{cv.location}</span>
            {cv.website && <a href={cv.website}>{cv.website}</a>}
          </address>
        </section>

        <section className="modern-cv__sidebar-section">
          <h2>Skills</h2>
          <ul className="modern-cv__skill-list">
            {cv.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>

        <section className="modern-cv__sidebar-section">
          <h2>Languages</h2>
          <ul className="modern-cv__plain-list modern-cv__language-list">
            {cv.languages.map((language) => (
              <li key={language.name}>
                <strong>{language.name}</strong>
                <span>{language.level}</span>
              </li>
            ))}
          </ul>
        </section>

        <nav className="modern-cv__sidebar-section" aria-label="Profile links">
          <h2>Links</h2>
          <ul className="modern-cv__plain-list">
            {cv.links.map((link) => (
              <li key={link.label}>
                <a href={link.url}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="modern-cv__content">
        <section className="modern-cv__section modern-cv__summary">
          <h2>About me</h2>
          <p>{cv.summary}</p>
        </section>

        <section className="modern-cv__section">
          <h2>Experience</h2>
          <div className="modern-cv__timeline">
            {cv.experience.map((job) => (
              <article className="modern-cv__entry" key={job.id}>
                <div className="modern-cv__entry-heading">
                  <div>
                    <h3>{job.position}</h3>
                    <p className="modern-cv__company">
                      {job.company} · {job.location}
                    </p>
                  </div>
                  <time>
                    {formatDate(job.startDate)} – {formatDate(job.endDate)}
                  </time>
                </div>
                <p>{job.description}</p>
                <ul>
                  {job.achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="modern-cv__section">
          <h2>Education</h2>
          {cv.education.map((item) => (
            <article className="modern-cv__entry" key={item.id}>
              <div className="modern-cv__entry-heading">
                <div>
                  <h3>{item.degree}</h3>
                  <p className="modern-cv__company">
                    {item.institution} · {item.location}
                  </p>
                </div>
                <time>
                  {formatDate(item.startDate)} – {formatDate(item.endDate)}
                </time>
              </div>
            </article>
          ))}
        </section>

        {cv.projects?.length > 0 && (
          <section className="modern-cv__section">
            <h2>Projects</h2>
            <div className="modern-cv__project-grid">
              {cv.projects.map((project) => (
                <article className="modern-cv__project" key={project.id}>
                  <h3>
                    {project.url ? (
                      <a href={project.url}>{project.name || project.title}</a>
                    ) : (
                      project.name || project.title
                    )}
                  </h3>
                  <p>{project.description}</p>
                  <ul className="modern-cv__tags">
                    {project.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        )}

        {cv.certifications?.length > 0 && (
          <section className="modern-cv__section">
            <h2>Certifications</h2>
            <ul className="modern-cv__certifications">
              {cv.certifications.map((certification) => (
                <li key={certification.id}>
                  <strong>{certification.name}</strong>
                  <span>
                    {certification.issuer} · {certification.date}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </article>
  )
}

export default ModernCV
