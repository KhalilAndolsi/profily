import React from "react";
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  LifeBuoy,
  MessageSquare,
  Send,
  Users,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const supportOptions = [
  {
    icon: LifeBuoy,
    title: "Customer support",
    description:
      "Get help with your account, profile, and anything you are building.",
    action: "Contact support",
    href: "mailto:support@profily.com",
  },
  {
    icon: BookOpen,
    title: "Knowledge base",
    description:
      "Browse practical guides and answers to common Profily questions.",
    action: "Visit the help center",
    href: "#faq",
  },
  {
    icon: Users,
    title: "Creator community",
    description:
      "Meet other creators, share ideas, and get inspired by the community.",
    action: "Join the community",
    href: "#faq",
  },
];

const faqs = [
  {
    category: "Pricing & plans",
    question: "Is Profily really free?",
    answer:
      "Yes. You can build and publish your personal page for free, with no credit card required.",
  },
  {
    category: "Custom domains",
    question: "How do I connect my custom domain?",
    answer:
      "Open your editor settings and follow the custom domain guide to connect your domain in a few minutes.",
  },
  {
    category: "Export & portability",
    question: "Can I export my CV to PDF?",
    answer:
      "Absolutely. Open your CV preview and choose Export to download a polished, ATS-friendly PDF.",
  },
  {
    category: "Features & roadmap",
    question: "How do I report a bug or request a template?",
    answer:
      "Send us a message with the details, or share your idea with the creator community.",
  },
];

const Contact = () => {
  return (
    <main className="bg-linear-to-b from-background via-background to-muted/50 px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-2xl text-center">
          <Badge className="rounded-full border-primary/15 bg-primary/10 px-4 py-1.5 text-primary hover:bg-primary/15">
            <MessageSquare className="mr-1.5 size-3.5" />
            Creator support desk
          </Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Get in touch with our team
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            We&apos;re here to help you build, publish, and grow your personal
            online presence. Reach out with a question or idea.
          </p>
        </header>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_0.85fr]">
          <Card className="border-border/80 shadow-sm">
            <CardHeader className="border-b border-border/70 pb-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">Send us a message</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We usually reply within one business day.
                  </p>
                </div>
                <Badge variant="secondary" className="hidden sm:inline-flex">
                  <CheckCircle2 className="mr-1 size-3.5 text-primary" />
                  Fast replies
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <form className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" placeholder="Elena Rostova" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic / category</Label>
                    <Select defaultValue="support">
                      <SelectTrigger id="topic" className="w-full">
                        <SelectValue placeholder="Choose a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="support">Technical support</SelectItem>
                        <SelectItem value="billing">Billing question</SelectItem>
                        <SelectItem value="feedback">Page feedback</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="message">Message</Label>
                    <span className="text-xs text-muted-foreground">0 / 800</span>
                  </div>
                  <Textarea
                    id="message"
                    rows={6}
                    placeholder="Describe what you are trying to accomplish..."
                    className="min-h-32 text-sm resize-none"
                  />
                </div>
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <Label className="text-sm font-normal text-muted-foreground">
                    <Checkbox defaultChecked />
                    Send me a copy of this message
                  </Label>
                  <Button type="submit" className="w-full sm:w-auto">
                    Send message
                    <Send />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {supportOptions.map(({ icon: Icon, ...option }) => (
              <Card
                key={option.title}
                className="border-border/80 shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <CardTitle className="text-base">{option.title}</CardTitle>
                      <p className="mt-1 text-sm leading-5 text-muted-foreground">
                        {option.description}
                      </p>
                      <a
                        href={option.href}
                        className="mt-3 inline-flex items-center text-sm font-medium text-primary hover:underline"
                      >
                        {option.action}
                        <ArrowUpRight className="ml-1 size-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-primary/5 p-4 text-sm">
              <span className="size-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/15" />
              <div className="flex-1">
                <p className="font-medium text-foreground">All systems operational</p>
                <p className="text-xs text-muted-foreground">
                  Support is online and ready to help.
                </p>
              </div>
              <span className="text-xs font-medium text-primary">99.9% uptime</span>
            </div>
          </div>
        </section>

        <section id="faq" className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Quick answers
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Immediate answers to the most common questions from creators.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {faqs.map((faq) => (
              <Card key={faq.question} className="border-border/80 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                    <CircleHelp className="size-3.5" />
                    {faq.category}
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-foreground">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {faq.answer}
                  </p>
                  <div className="mt-5 flex items-center gap-1 border-t border-border/70 pt-3 text-xs text-muted-foreground">
                    <ChevronRight className="size-3.5 text-primary" />
                    Helpful resources available in the help center
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
};

export default Contact;
