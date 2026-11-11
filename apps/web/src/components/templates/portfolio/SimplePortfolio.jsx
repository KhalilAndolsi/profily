import { portfolio_mockup } from "../../../constants/mockup"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel"

const formatDate = (date) => {
  if (!date) return "Present"

  const [year, month] = date.split("-")
  if (!month) return year

  return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })
}

const SimplePortfolio = ({ portfolio = portfolio_mockup }) => {
  const fullName = `${portfolio.firstName} ${portfolio.lastName}`
  const languages = portfolio.languages || []
  const certifications = portfolio.certifications || []
  const education = portfolio.education || []
  const links = portfolio.links || []

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-8 sm:py-16 lg:px-12">
      <div className="container mx-auto max-w-6xl px-2 sm:px-4">
        <header className="flex items-center gap-4 border-b border-border pb-6">
          <img
            className="size-30 shrink-0 rounded-full object-cover sm:size-35"
            src={portfolio.photo}
            alt={`${fullName} portrait`}
          />
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-primary">
              {portfolio.title}
            </p>
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {fullName}
            </h1>
            <p className="mt-1 text-base text-muted-foreground sm:text-lg">
              {portfolio.headline}
            </p>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span>{portfolio.location}</span>
              <a
                className="font-medium text-primary underline underline-offset-4"
                href={`mailto:${portfolio.email}`}
              >
                {portfolio.email}
              </a>
              {portfolio.username && <span>@{portfolio.username}</span>}
            </div>
          </div>
        </header>

        <section className="border-b border-border py-6">
          <h2 className="text-lg font-semibold">About me</h2>
          <p className="mt-3 rounded-xl border border-border bg-muted/30 p-4 text-sm leading-6 text-muted-foreground sm:text-base">
            {portfolio.bio}
          </p>
        </section>

        <section className="border-b border-border py-6">
          <h2 className="text-lg font-semibold">Experience</h2>
          <div className="relative mt-5 space-y-5 border-l border-primary/40 pl-5">
            {portfolio.experience.map((job) => (
              <article key={job.id} className="relative text-sm">
                <span className="absolute left-[-1.65rem] top-0.5 size-2.5 rounded-full bg-primary ring-4 ring-card" />
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{job.position}</h3>
                    <p className="mt-0.5 text-muted-foreground">
                      {job.company} · {job.location}
                    </p>
                  </div>
                  <time className="shrink-0 text-xs text-muted-foreground">
                    {formatDate(job.startDate)} – {formatDate(job.endDate)}
                  </time>
                </div>
                <p className="mt-2 leading-5 text-muted-foreground">{job.description}</p>
                {job.achievements?.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-muted-foreground">
                    {job.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="border-b border-border py-6">
          <Carousel className="mt-4" opts={{ align: "start" }}>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">Projects</h2>
              <div className="flex shrink-0 gap-2">
                <CarouselPrevious className="static my-0" />
                <CarouselNext className="static my-0" />
              </div>
            </div>
            <CarouselContent className="mt-4 -ml-4">
              {portfolio.projects.map((project) => (
                <CarouselItem key={project.id} className="pl-4 md:basis-1/2">
                  <article className="group">
                    <a href={project.url || "#"} target="_blank" rel="noreferrer">
                      <img
                        className="aspect-16/10 w-full rounded-xl object-cover"
                        src={project.image}
                        alt={`${project.title} preview`}
                      />
                      <h3 className="mt-2 text-sm font-semibold">{project.title}</h3>
                    </a>
                    <p className="mt-1 text-sm leading-5 text-muted-foreground">
                      {project.description}
                    </p>
                    {project.technologies?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {project.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-3 flex flex-wrap gap-3 text-xs font-medium">
                      {project.featured && <span className="text-primary">Featured</span>}
                      {project.repository && (
                        <a
                          className="text-primary underline underline-offset-4"
                          href={project.repository}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Source code ↗
                        </a>
                      )}
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>

        <section className="border-b border-border py-6">
          <h2 className="text-lg font-semibold">Skills</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {portfolio.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {education.length > 0 && (
          <section className="border-b border-border py-6">
            <h2 className="text-lg font-semibold">Education</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {education.map((item) => (
                <article key={item.id} className="rounded-xl border border-border p-4">
                  <h3 className="font-semibold">{item.degree}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.institution} · {item.location}
                  </p>
                  <time className="mt-2 block text-xs text-muted-foreground">
                    {formatDate(item.startDate)} – {formatDate(item.endDate)}
                  </time>
                </article>
              ))}
            </div>
          </section>
        )}

        {(languages.length > 0 || certifications.length > 0) && (
          <section className="grid gap-6 py-6 sm:grid-cols-2">
            {languages.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold">Languages</h2>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {languages.map((language) => (
                    <li key={language.name || language} className="flex justify-between gap-3">
                      <span>{language.name || language}</span>
                      {language.level && <span>{language.level}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold">Certifications</h2>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {certifications.map((certification) => (
                    <li key={certification.id || certification.name}>
                      <span className="font-medium text-foreground">
                        {certification.name || certification}
                      </span>
                      {certification.issuer && ` · ${certification.issuer}`}
                      {certification.date && ` (${certification.date})`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {links.length > 0 && (
          <section className="border-t border-border py-6">
            <h2 className="text-lg font-semibold">Links</h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {links.map((link) => (
                <a
                  key={link.id || link.url}
                  className="rounded-full border border-border px-3 py-1.5 text-sm text-primary underline underline-offset-4"
                  href={link.url}
                  target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.url.startsWith("mailto:") ? undefined : "noreferrer"}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default SimplePortfolio
