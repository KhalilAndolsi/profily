import { CardHeader, CardTitle } from "@/components/ui/card";

const SectionHeader = ({ title, description, action }) => (
  <CardHeader className="flex-row items-start justify-between gap-4 border-b px-4 sm:px-6">
    <div>
      <CardTitle className="text-lg">{title}</CardTitle>
      {description && (
        <p className="mt-1 text-sm font-normal text-muted-foreground">
          {description}
        </p>
      )}
    </div>
    {action}
  </CardHeader>
);

export default SectionHeader;
