import ClassicCV from "@/components/templates/cv/ClassicCV";
import ModernCV from "@/components/templates/cv/ModernCV";
import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";
import { cv_mockup } from "@/constants/mockup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, ArrowBigLeft, Download, FilePlus2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const templates = {
  classic: ClassicCV,
  modern: ModernCV,
};

const PreviewCV = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const cvId = searchParams.get("id");
  const requestedTemplate = searchParams.get("template");
  const template =
    requestedTemplate && requestedTemplate in templates
      ? requestedTemplate
      : cv?.template && cv.template in templates
        ? cv.template
        : "classic";
  const Template = templates[template];

  useEffect(() => {
    if (!cvId) {
      setCv(cv_mockup);
      setError("");
      setLoading(false);
      return;
    }

    const loadCv = async () => {
      setLoading(true);
      setError("");

      try {
        let response;

        try {
          response = await api.get(`/cv/me/${cvId}`);
        } catch (ownCvError) {
          response = await api.get(`/cv/${cvId}`);
        }

        const loadedCv = response.data.cv;
        if (loadedCv.photo?.startsWith("/uploads/")) {
          loadedCv.photo = `http://localhost:3000${loadedCv.photo}`;
        }
        setCv(loadedCv);
      } catch (requestError) {
        setCv(null);
        setError(
          requestError.response?.data?.message || "Could not load this CV.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadCv();
  }, [cvId]);

  const handleTemplateChange = (nextTemplate) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("template", nextTemplate);
    setSearchParams(nextParams);
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 print:p-0">
      {error && (
        <Alert
          variant="destructive"
          className="mx-auto mb-6 max-w-[210mm] flex items-center justify-start"
        >
          <AlertTriangle size={40} className="size-5"/>
          <div>
            <AlertTitle>Unable to preview CV</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </div>
          <AlertAction>
            <Button
              size="sm"
              variant="outline"
              className="ml-4 "
              nativeButton={false}
              render={<Link to="/templates"><ArrowBigLeft fill='currentColor'/>Browse templates</Link>}
            />
          </AlertAction>
        </Alert>
      )}
      {!error && (
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

            {!cvId && (
              <Button
                nativeButton={false}
                render={
                  <Link to="/cv/create">
                    <FilePlus2 />
                    Create a new CV
                  </Link>
                }
              />
            )}
          </div>
        </div>
      )}
      {loading ? (
        <Skeleton className="mx-auto h-[1122px] max-w-[210mm] rounded-none" />
      ) : cv ? (
        <Template cv={cv} />
      ) : null}
    </main>
  );
};

export default PreviewCV;
