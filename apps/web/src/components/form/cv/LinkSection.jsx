import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Field from "../Field";

const LinkSection = ({ links = [], setLinks }) => (
  <section className="grid gap-4">
    <div className="flex items-center justify-between">
      <h3 className="font-semibold">Links</h3>
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => setLinks([...links, {}])}
      >
        <Plus />
        Add
      </Button>
    </div>
    <div className="grid gap-4">
      {links.length === 0 && (
        <p className="rounded-2xl border border-dashed p-4 text-center text-sm text-muted-foreground">
          No links added yet.
        </p>
      )}
      {links.map((link, index) => (
        <div
          key={`link-${index}`}
          className="relative grid gap-4 rounded-3xl border border-border p-4 sm:grid-cols-2 sm:p-5"
        >
          <Button
            variant="ghost"
            size="icon-sm"
            type="button"
            className="absolute right-3 top-3"
            aria-label="Remove link"
            onClick={() =>
              setLinks(links.filter((_, itemIndex) => itemIndex !== index))
            }
          >
            <Trash2 />
          </Button>
          <Field
            label={
              <span>
                Link label <span className="text-destructive">*</span>
              </span>
            }
          >
            <Input
              placeholder="e.g. LinkedIn"
              value={link.label ?? ""}
              onChange={(event) =>
                setLinks(
                  links.map((item, itemIndex) =>
                    itemIndex === index
                      ? { ...item, label: event.target.value }
                      : item,
                  ),
                )
              }
              required
            />
          </Field>
          <Field
            label={
              <span>
                URL <span className="text-destructive">*</span>
              </span>
            }
          >
            <Input
              placeholder="https://"
              type="url"
              value={link.url ?? ""}
              onChange={(event) =>
                setLinks(
                  links.map((item, itemIndex) =>
                    itemIndex === index
                      ? { ...item, url: event.target.value }
                      : item,
                  ),
                )
              }
              required
            />
          </Field>
        </div>
      ))}
    </div>
  </section>
);

export default LinkSection;
