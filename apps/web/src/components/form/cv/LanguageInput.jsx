import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguageInput = ({ languages = [], onChange }) => {

  const addLanguage = () => {
    onChange?.([...languages, { id: Date.now(), name: "", level: "" }]);
  };

  const removeLanguage = (languageId) => {
    onChange?.(languages.filter((language) => language.id !== languageId));
  };

  const updateLanguage = (languageId, field, value) => {
    onChange?.(
      languages.map((language) =>
        language.id === languageId ? { ...language, [field]: value } : language,
      ),
    );
  };

  return (
    <div className="grid min-w-0 gap-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-medium">
          Languages <span className="text-destructive">*</span>
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="shrink-0"
          type="button"
          onClick={addLanguage}
        >
          <Plus />
          Add
        </Button>
      </div>
      <div className="grid gap-3">
        {languages.map((language) => (
          <div
            key={language.id}
            className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-2"
          >
            <Select
              value={language.name}
              onValueChange={(value) => updateLanguage(language.id, "name", value)}
            >
              <SelectTrigger className="w-full min-w-0" aria-label="Language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="French">French</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="German">German</SelectItem>
                <SelectItem value="Italian">Italian</SelectItem>
                <SelectItem value="Arabic">Arabic</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={language.level}
              onValueChange={(value) => updateLanguage(language.id, "level", value)}
            >
              <SelectTrigger
                className="w-full min-w-0"
                aria-label="Language level"
              >
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Native">Native</SelectItem>
                <SelectItem value="Fluent">Fluent</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Basic">Basic</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon-sm"
              type="button"
              onClick={() => removeLanguage(language.id)}
              aria-label="Remove language"
            >
              <X />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageInput;
