import { useState } from "react";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguageInput = () => {
  const [languages, setLanguages] = useState([{ id: 1 }]);

  const addLanguage = () => {
    setLanguages((prev) => [...prev, { id: Date.now() }]);
  };

  const removeLanguage = (languageId) => {
    setLanguages((currentLanguages) =>
      currentLanguages.filter((language) => language.id !== languageId),
    );
  };

  return (
    <div className="grid min-w-0 gap-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-medium">Languages</span>
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
            <Select>
              <SelectTrigger className="w-full min-w-0" aria-label="Language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="german">German</SelectItem>
                <SelectItem value="italian">Italian</SelectItem>
                <SelectItem value="arabic">Arabic</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger
                className="w-full min-w-0"
                aria-label="Language level"
              >
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="native">Native</SelectItem>
                <SelectItem value="fluent">Fluent</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
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
