import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Field from "../Field";

const ProjectSection = ({ projects = [], setProjects }) => (
  <section className="grid gap-4">
    <div className="flex items-center justify-between">
      <h3 className="font-semibold">Projects</h3>
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => setProjects([...projects, {}])}
      >
        <Plus />
        Add
      </Button>
    </div>
    <div className="grid gap-4">
      {projects.length === 0 && (
        <p className="rounded-2xl border border-dashed p-4 text-center text-sm text-muted-foreground">
          No projects added yet.
        </p>
      )}
      {projects.map((project, index) => (
        <div
          key={`project-${index}`}
          className="relative grid gap-4 rounded-3xl border border-border p-4 sm:grid-cols-2 sm:p-5"
        >
          <Button
            variant="ghost"
            size="icon-sm"
            type="button"
            className="absolute right-3 top-3"
            aria-label="Remove project"
            onClick={() =>
              setProjects(projects.filter((_, itemIndex) => itemIndex !== index))
            }
          >
            <Trash2 />
          </Button>
          <Field
            label={
              <span>
                Project name <span className="text-destructive">*</span>
              </span>
            }
          >
            <Input
              placeholder="Project name"
              value={project.name ?? ""}
              onChange={(event) =>
                setProjects(
                  projects.map((item, itemIndex) =>
                    itemIndex === index
                      ? { ...item, name: event.target.value }
                      : item,
                  ),
                )
              }
              required
            />
          </Field>
          <Field label="Project URL">
            <Input
              placeholder="Project URL"
              type="url"
              value={project.url ?? ""}
              onChange={(event) =>
                setProjects(
                  projects.map((item, itemIndex) =>
                    itemIndex === index
                      ? { ...item, url: event.target.value }
                      : item,
                  ),
                )
              }
            />
          </Field>
          <Field label="Description" className="sm:col-span-2">
            <Textarea
              placeholder="Describe your project..."
              value={project.description ?? ""}
              onChange={(event) =>
                setProjects(
                  projects.map((item, itemIndex) =>
                    itemIndex === index
                      ? { ...item, description: event.target.value }
                      : item,
                  ),
                )
              }
            />
          </Field>
          <Field label="Technologies" className="sm:col-span-2">
            <Input
              placeholder="React, TypeScript, Node.js..."
              value={(project.technologies ?? []).join(", ")}
              onChange={(event) =>
                setProjects(
                  projects.map((item, itemIndex) =>
                    itemIndex === index
                      ? {
                          ...item,
                          technologies: event.target.value
                            .split(",")
                            .map((technology) => technology.trim())
                            .filter(Boolean),
                        }
                      : item,
                  ),
                )
              }
            />
          </Field>
        </div>
      ))}
    </div>
  </section>
);

export default ProjectSection;
