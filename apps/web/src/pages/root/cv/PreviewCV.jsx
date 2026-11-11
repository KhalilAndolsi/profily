import ClassicCV from "@/components/templates/cv/ClassicCV";
import ModernCV from "@/components/templates/cv/ModernCV";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, FilePlus2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const templates = {
  classic: ClassicCV,
  modern: ModernCV,
};

const PreviewCV = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTemplate = searchParams.get("template");
  const template =
    requestedTemplate in templates ? requestedTemplate : "classic";
  const Template = templates[template];

  const handleTemplateChange = (nextTemplate) => {
    setSearchParams({ template: nextTemplate });
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 print:p-0">
      <div className="mx-auto flex w-full max-w-[210mm] flex-wrap items-center justify-between gap-3 print:hidden">
        <Button variant="outline" onClick={handleDownload}>
          <Download />
          Download PDF
        </Button>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <Select value={template} onValueChange={handleTemplateChange}>
            <SelectTrigger
              id="cv-template"
              aria-label="CV template"
              className="w-40 text-foreground"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="classic">Classic</SelectItem>
              <SelectItem value="modern">Modern</SelectItem>
            </SelectContent>
          </Select>

          <Button
            nativeButton={false}
            render={
              <Link to="/cv/create">
                <FilePlus2 />
                Create a new CV
              </Link>
            }
          />
        </div>
      </div>
      <Template />
    </main>
  );
};

export default PreviewCV;
