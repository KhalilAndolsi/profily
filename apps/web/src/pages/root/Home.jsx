import {
  ArrowRight,
  Check,
  ChevronRight,
  Code2,
  FileText,
  Globe2,
  LayoutTemplate,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import React from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Link } from "react-router-dom";

const templates = [
  {
    title: "Minimal portfolio",
    category: "Personal",
    image: "/images/portfolio.jpg",
  },
  {
    title: "Creative studio",
    category: "Agency",
    image: "/images/design.jpg",
  },
  {
    title: "Creative professional",
    category: "Portfolio",
    image: "/images/gdesign.jpg",
  },
  {
    title: "Links page",
    category: "Personal",
    image: "/images/product.jpg",
  },
];

const features = [
  {
    icon: FileText,
    title: "CV & Resume Builder",
    description:
      "Create a polished resume that highlights your experience and gets noticed.",
    badge: "AI assisted",
  },
  {
    icon: LayoutTemplate,
    title: "Interactive Portfolio",
    description:
      "Turn your work into an engaging portfolio with a layout that feels like you.",
    badge: "Popular",
  },
  {
    icon: Code2,
    title: "Link-in-Bio Profile",
    description:
      "Give your audience one beautiful place to discover everything you do.",
    badge: "Quick setup",
  },
  {
    icon: Globe2,
    title: "Links Page",
    description:
      "Share your CV, portfolio, social profiles, and everything you do from one beautiful page.",
    badge: "Quick setup",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose a template",
    description:
      "Start with a layout designed for your goals and your audience.",
  },
  {
    number: "02",
    title: "Customize your content",
    description:
      "Add your story, projects, links, and personality in a few clicks.",
  },
  {
    number: "03",
    title: "Publish & share",
    description:
      "Go live instantly with a polished page ready to share anywhere.",
  },
];

const Home = () => {
  return (
    <main className="overflow-hidden">
      <section className="relative bg-linear-to-br from-background via-background to-muted/60 px-6 pb-20 pt-16 sm:px-10 lg:px-16 lg:pb-28 lg:pt-24">
        <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto max-w-5xl text-center">
          <Badge className="mb-6 rounded-full border-primary/15 bg-primary/5 px-4 py-1.5 text-primary hover:bg-primary/10">
            <Sparkles className="mr-1.5 size-3.5" />
            Your ideas deserve a better home
          </Badge>
          <h1 className="mx-auto max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Everything you want to show the world,{" "}
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              in one place.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Build a beautiful online presence without starting from scratch.
            Create a portfolio, resume, landing page, or profile that is
            unmistakably yours.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/dashboard">
              <Button size="lg" className="h-12 px-6">
                Start building for free
                <ArrowRight />
              </Button>
            </Link>
            <Link to="/templates">
              <Button size="lg" variant="outline" className="h-12 px-6">
                Explore templates
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10">
            <div className="flex items-center gap-1.5 border-b bg-muted px-4 py-3">
              <span className="size-2.5 rounded-full bg-destructive" />
              <span className="size-2.5 rounded-full bg-secondary" />
              <span className="size-2.5 rounded-full bg-primary" />
              <div className="mx-auto rounded-md bg-card px-12 py-1 text-[10px] text-muted-foreground shadow-sm sm:px-32">
                profily.me/alex
              </div>
            </div>
            <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr] lg:p-14">
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-4">
                  <img
                    src="/images/pfp.png"
                    alt="Alex Morgan"
                    className="size-16 rounded-full object-cover ring-4 ring-muted"
                  />
                  <div>
                    <p className="font-semibold text-card-foreground">
                      Alex Morgan
                    </p>
                    <p className="text-sm text-primary">Creative Professional</p>
                  </div>
                </div>
                <p className="mt-6 text-2xl font-semibold tracking-tight text-card-foreground">
                  Sharing work and ideas people love to discover.
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  A curated collection of selected work, experience, and ways to
                  connect.
                </p>
                <Button className="mt-6 w-fit" size="sm">
                  View my work
                  <ChevronRight />
                </Button>
              </div>
              <img
                src="/images/design.jpg"
                alt="Example Profily portfolio"
                className="aspect-16/10 w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/70 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Everything you need
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              One tool, built for all your best work.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Skip the blank page. Profily gives you the building blocks to look
              professional from day one.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {features.map(({ icon: Icon, ...feature }) => (
              <Card
                key={feature.title}
                className="border-border/80 bg-card/90 shadow-sm transition-transform hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <Badge variant="secondary">{feature.badge}</Badge>
                  </div>
                  <CardTitle className="pt-3 text-lg">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                  <Button variant="link" className="mt-3 h-auto p-0">
                    Learn more <ArrowRight />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto container">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Simple by design
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              From zero to live in under three minutes.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <Card key={step.number} className="border-border bg-muted/70">
                <CardContent className="p-6">
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {step.number}
                  </span>
                  <h3 className="mt-6 font-semibold text-card-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/70 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto container">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Gallery of excellence
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Curated designer templates.
              </h2>
            </div>
            <Button variant="outline">
              See all templates <ArrowRight />
            </Button>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {templates.map((template) => (
              <Card
                key={template.title}
                className="group cursor-pointer border-border/80 bg-card transition-transform hover:-translate-y-1"
              >
                <img
                  src={template.image}
                  alt={template.title}
                  className="aspect-[1.4] w-full object-cover transition-transform group-hover:scale-[1.02]"
                />
                <CardContent className="p-5">
                  <p className="text-xs font-medium text-primary">
                    {template.category}
                  </p>
                  <h3 className="mt-1 font-semibold text-card-foreground">
                    {template.title}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-6 lg:px-16">
        <div className="mx-auto container rounded-3xl bg-linear-to-br from-primary via-primary to-primary/70 px-6 py-12 text-primary-foreground shadow-xl shadow-primary/20 sm:px-12 lg:py-16">
          <div className="max-w-2xl">
            <Badge className="border-primary-foreground/20 bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/20">
              <Zap className="mr-1.5 size-3.5" />
              No credit card required
            </Badge>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
              Ready to build your online identity?
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-primary-foreground/80">
              Make your next opportunity easier to find. Start with a template,
              make it yours, and share it with the world.
            </p>
            <Button
              size="lg"
              className="mt-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Create your free page
              <ArrowRight />
            </Button>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-primary-foreground/70">
              <span className="flex items-center gap-1.5">
                <Check className="size-3.5 text-primary-foreground" /> Free
                forever plan
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="size-3.5 text-primary-foreground" /> Publish
                in minutes
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="size-3.5 fill-primary-foreground text-primary-foreground" />{" "}
                Loved by creators
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
