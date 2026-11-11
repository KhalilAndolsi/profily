import { useState } from "react";

import { Switch } from "@/components/ui/switch";

const VisibilitySwitch = () => {
  const [isPublic, setIsPublic] = useState(true);

  return (
    <div className="flex items-center justify-between gap-4 rounded-3xl border border-border bg-muted/30 px-4 py-3">
      <div>
        <p className="text-sm font-medium">
          {isPublic ? "Public page" : "Private page"}
        </p>
        <p className="text-xs text-muted-foreground">
          {isPublic
            ? "This page can appear in the Examples section."
            : "This page will only be visible to you."}
        </p>
      </div>
      <Switch
        checked={isPublic}
        onCheckedChange={setIsPublic}
        aria-label="Toggle page visibility"
      />
    </div>
  );
};

export default VisibilitySwitch;
