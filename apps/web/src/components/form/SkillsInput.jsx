import { useState } from "react";
import { Plus, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SkillsInput = ({ skills = [], onChange }) => {
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    const skill = skillInput.trim();

    if (!skill || skills.includes(skill)) {
      return;
    }

    onChange?.([...skills, skill]);
    setSkillInput("");
  };

  const removeSkill = (skillToRemove) => {
    onChange?.(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="grid min-w-0 gap-3 pt-1">
      <div className="flex min-w-0 gap-2">
        <Input
          className="min-w-0"
          value={skillInput}
          onChange={(event) => setSkillInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addSkill();
            }
          }}
          placeholder="e.g. React, TypeScript..."
        />
        <Button className="shrink-0" type="button" onClick={addSkill}>
          <Plus />
          Add
        </Button>
      </div>
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="group/skill relative h-8 gap-1.5 px-3 pr-2"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                aria-label={`Remove ${skill}`}
                className="flex size-4 items-center justify-center rounded-full opacity-0 transition-opacity group-hover/skill:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsInput;
