import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DatePicker from "../DatePicker";
import Field from "../Field";
import SectionHeader from "../SectionHeader";

const EducationSection = ({ education = [], setEducation }) => {
  const updateEducation = (index, field, value) => {
    setEducation(
      education.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    );
  };

  return (
    <>
      <SectionHeader
        title="Education"
        description="Add your academic background and qualifications."
        action={
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => setEducation([...education, {}])}
          >
            <Plus />
            Add education
          </Button>
        }
      />
      <CardContent className="grid gap-6 px-4 pt-5 sm:px-6 sm:pt-6">
        {education.length === 0 && (
          <p className="rounded-2xl border border-dashed p-4 text-center text-sm text-muted-foreground">
            No education added yet.
          </p>
        )}
        {education.map((item, index) => (
          <div
            key={index}
            className="grid gap-5 rounded-3xl border border-border p-4 sm:p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold">Education {index + 1}</h3>
              <Button
                variant="ghost"
                size="icon-sm"
                type="button"
                aria-label="Remove education"
                onClick={() =>
                  setEducation(
                    education.filter((_, itemIndex) => itemIndex !== index),
                  )
                }
              >
                <Trash2 />
              </Button>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label={
                  <span>
                    Degree <span className="text-destructive">*</span>
                  </span>
                }
              >
                <Input
                  placeholder="e.g. Master of Computer Science"
                  value={item.degree ?? ""}
                  onChange={(event) =>
                    updateEducation(index, "degree", event.target.value)
                  }
                  required
                />
              </Field>
              <Field
                label={
                  <span>
                    Institution <span className="text-destructive">*</span>
                  </span>
                }
              >
                <Input
                  placeholder="Institution name"
                  value={item.institution ?? ""}
                  onChange={(event) =>
                    updateEducation(index, "institution", event.target.value)
                  }
                  required
                />
              </Field>
              <Field label="Location">
                <Input
                  placeholder="City, Country"
                  value={item.location ?? ""}
                  onChange={(event) =>
                    updateEducation(index, "location", event.target.value)
                  }
                />
              </Field>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Start date">
                  <DatePicker
                    value={item.startDate}
                    onChange={(date) =>
                      updateEducation(
                        index,
                        "startDate",
                        date ? date.toISOString().slice(0, 10) : "",
                      )
                    }
                  />
                </Field>
                <Field label="End date">
                  <DatePicker
                    value={item.endDate}
                    onChange={(date) =>
                      updateEducation(
                        index,
                        "endDate",
                        date ? date.toISOString().slice(0, 10) : "",
                      )
                    }
                  />
                </Field>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </>
  );
};

export default EducationSection;
