import { ArrowRight, BriefcaseBusiness, FileText, Link2 } from "lucide-react"
import { Link } from "react-router-dom"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

const templateSections = [
  {
    type: "cv",
    title: "CV",
    description: "Professional resumes designed to make your experience easy to scan.",
    icon: FileText,
    templates: [
      {
        name: "Classic",
        description: "A clean, semantic HTML-first resume.",
        preview: (
          <div className="space-y-2 bg-white p-4 text-left text-slate-800">
            <div className="h-3 w-2/5 rounded bg-slate-800" />
            <div className="h-2 w-3/5 rounded bg-slate-300" />
            <div className="grid grid-cols-3 gap-3 pt-3">
              <div className="space-y-2">
                <div className="h-2 w-full bg-slate-300" />
                <div className="h-2 w-4/5 bg-slate-200" />
                <div className="h-2 w-full bg-slate-200" />
              </div>
              <div className="col-span-2 space-y-2">
                <div className="h-2 w-1/3 bg-slate-700" />
                <div className="h-2 w-full bg-slate-200" />
                <div className="h-2 w-5/6 bg-slate-200" />
              </div>
            </div>
          </div>
        ),
      },
      {
        name: "Modern",
        description: "A bold, colorful two-column resume.",
        preview: (
          <div className="grid grid-cols-[35%_65%] bg-white text-left">
            <div className="min-h-36 bg-primary p-3">
              <div className="mx-auto mb-3 size-8 rounded-full bg-primary-foreground/30" />
              <div className="h-2 w-4/5 bg-primary-foreground/80" />
              <div className="mt-4 h-2 w-full bg-primary-foreground/50" />
              <div className="mt-2 h-2 w-4/5 bg-primary-foreground/50" />
            </div>
            <div className="space-y-3 p-3">
              <div className="h-3 w-3/5 bg-slate-800" />
              <div className="h-2 w-full bg-slate-200" />
              <div className="h-2 w-4/5 bg-slate-200" />
              <div className="h-2 w-1/2 bg-primary" />
            </div>
          </div>
        ),
      },
    ],
  },
  {
    type: "portfolio",
    title: "Portfolio",
    description: "Showcase your work with layouts built for creative professionals.",
    icon: BriefcaseBusiness,
    templates: [
      {
        name: "Simple",
        description: "A clean personal portfolio with an introduction, experience, and selected work.",
        preview: (
          <div className="space-y-3 bg-white p-4 text-left text-slate-800">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <div className="size-10 rounded-full bg-slate-300" />
              <div className="space-y-2">
                <div className="h-2.5 w-28 bg-slate-800" />
                <div className="h-2 w-36 bg-slate-300" />
              </div>
            </div>
            <div className="grid grid-cols-[1fr_0.7fr] gap-4 border-b border-slate-200 py-3">
              <div className="space-y-2">
                <div className="h-2 w-16 bg-slate-700" />
                <div className="h-2 w-full bg-slate-200" />
                <div className="h-2 w-5/6 bg-slate-200" />
              </div>
              <div className="space-y-2">
                <div className="h-2 w-20 bg-slate-700" />
                <div className="h-2 w-full bg-slate-200" />
                <div className="h-2 w-4/5 bg-slate-200" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="h-12 bg-slate-200" />
              <div className="h-12 bg-slate-300" />
            </div>
          </div>
        ),
      },
    ],
  },
  {
    type: "link-page",
    title: "Link Page",
    description: "Put every important link, profile, and project in one place.",
    icon: Link2,
    templates: [
      {
        name: "Simple",
        description: "A clean personal link page with your profile and all important links.",
        preview: (
          <div className="flex min-h-36 flex-col items-center gap-2 bg-stone-100 p-4">
            <div className="size-8 rounded-full bg-stone-800" />
            <div className="h-2 w-2/5 bg-stone-700" />
            <div className="h-4 w-3/5 bg-stone-400" />
            <div className="h-5 w-4/5 border border-stone-300 bg-white" />
            <div className="h-5 w-4/5 border border-stone-300 bg-white" />
          </div>
        ),
      },
    ],
  },
]

const Templates = () => {
  return (
    <main className="mx-auto max-w-7xl space-y-14 px-6 py-16 sm:px-10 lg:px-16">
      <header className="max-w-2xl">
        <Badge className="mb-4">Templates</Badge>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Start with a layout that fits your story.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Preview a template, then use it as the starting point for your next page.
        </p>
      </header>

      {templateSections.map(({ type, title, description, icon: Icon, templates }) => (
        <section key={type} aria-labelledby={`${type}-templates`}>
          <div className="mb-5 flex items-start gap-3">
            <div className="rounded-xl bg-primary/10 p-2 text-primary">
              <Icon className="size-5" />
            </div>
            <div>
              <h2 id={`${type}-templates`} className="text-2xl font-semibold">
                {title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {templates.map((template) => (
              <Card key={template.name} className="overflow-hidden">
                <div className="border-b bg-muted/40 p-4">{template.preview}</div>
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    nativeButton={false}
                    render={
                      <Link to={`/${type}/preview?template=${template.name.toLowerCase()}`}>
                        Preview template <ArrowRight />
                      </Link>
                    }
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}

export default Templates