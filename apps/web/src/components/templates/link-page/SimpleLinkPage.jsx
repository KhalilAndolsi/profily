import { portfolio_mockup } from "../../../constants/mockup"
import { Card, CardContent } from "../../ui/card"

const SimpleLinkPage = ({ portfolio = portfolio_mockup }) => {
  const fullName = `${portfolio.firstName} ${portfolio.lastName}`

  return (
    <main className="min-h-screen bg-background px-6 py-4 text-foreground sm:py-8">
      <Card className="mx-auto flex min-h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)] max-w-lg flex-col overflow-hidden sm:min-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-4rem)]">
        <CardContent className="flex min-h-0 flex-1 flex-col items-center text-center">
          <img
            className="size-24 rounded-full object-cover ring-4 ring-primary/10"
            src={portfolio.photo}
            alt={`${fullName} portrait`}
          />
          <h1 className="mt-5 text-2xl font-semibold tracking-tight">{fullName}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{portfolio.bio}</p>
          <div className="mt-8 min-h-0 w-full flex-1 space-y-3 overflow-y-auto pr-1 flex flex-col pt-2">
            {portfolio.links.map((link) => (
              <a
                className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                href={link.url}
                key={link.id || link.url}
                target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.url.startsWith("mailto:") ? undefined : "noreferrer"}
              >
                {link.label}
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default SimpleLinkPage
