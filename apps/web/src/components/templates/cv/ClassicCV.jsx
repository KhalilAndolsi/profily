import { cv_mockup } from "../../../constants/mockup"
import "./classic-cv.css"

const formatDate = (date) => {
  if (!date) return "Present"

  const [year, month] = date.split("-")
  if (!month) return year

  return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })
}

const ClassicCV = ({ cv = cv_mockup }) => {
  const fullName = `${cv.firstName} ${cv.lastName}`

  return (
    <article className="classic-cv">
      <header>
        <div className="classic-cv__identity">
          {cv.photo && <img src={cv.photo} alt={`${fullName} portrait`} width="96" />}
          <h1>{fullName}</h1>
        </div>
        <p>{cv.title}</p>
        <address>
          <a href={`mailto:${cv.email}`}>{cv.email}</a>
          {" · "}
          <a href={`tel:${cv.phone}`}>{cv.phone}</a>
          {" · "}
          {cv.location}
          {cv.website && (
            <>
              {" · "}
              <a href={cv.website}>{cv.website}</a>
            </>
          )}
        </address>
      </header>

      <main>
        <section>
          <h2>Professional Summary</h2>
          <p>{cv.summary}</p>
        </section>

        <section>
          <h2>Experience</h2>
          {cv.experience.map((job) => (
            <article key={job.id}>
              <div className="classic-cv__entry-heading">
                <div>
                  <h3>{job.position}</h3>
                  <p>
                    <strong>{job.company}</strong> — {job.location}
                  </p>
                </div>
                <p className="classic-cv__date">
                  {formatDate(job.startDate)} — {formatDate(job.endDate)}
                </p>
              </div>
              <p>{job.description}</p>
              <ul>
                {job.achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section>
          <h2>Education</h2>
          {cv.education.map((item) => (
            <article key={item.id}>
              <div className="classic-cv__entry-heading">
                <div>
                  <h3>{item.degree}</h3>
                  <p>
                    <strong>{item.institution}</strong> — {item.location}
                  </p>
                </div>
                <p className="classic-cv__date">
                  {formatDate(item.startDate)} – {formatDate(item.endDate)}
                </p>
              </div>
            </article>
          ))}
        </section>

        <section>
          <h2>Skills</h2>
          <ul className="classic-cv__two-column-list">
            {cv.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Languages</h2>
          <ul className="classic-cv__two-column-list">
            {cv.languages.map((language) => (
              <li key={language.name}>
                {language.name} — {language.level}
              </li>
            ))}
          </ul>
        </section>

        {cv.projects?.length > 0 && (
          <section>
            <h2>Projects</h2>
            {cv.projects.map((project) => (
              <article key={project.id}>
                <h3>
                  {project.url ? <a href={project.url}>{project.name}</a> : project.name}
                </h3>
                <p>{project.description}</p>
                <p>{project.technologies.join(" · ")}</p>
              </article>
            ))}
          </section>
        )}

        {cv.certifications?.length > 0 && (
          <section>
            <h2>Certifications</h2>
            <ul className="classic-cv__two-column-list">
              {cv.certifications.map((certification) => (
                <li key={certification.id}>
                  <strong>{certification.name}</strong> — {certification.issuer},{" "}
                  {certification.date}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      {cv.links?.length > 0 && (
        <footer>
          <h2>Links</h2>
          <ul className="classic-cv__two-column-list">
            {cv.links.map((link) => (
              <li key={link.label}>
                <a href={link.url}>{link.label}</a>
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  )
}

export default ClassicCV
