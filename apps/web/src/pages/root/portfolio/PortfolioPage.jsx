import { useEffect, useState } from "react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import api from "@/lib/api";
import SimplePortfolio from "@/components/templates/portfolio/SimplePortfolio";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const normalizeUploadUrl = (value) =>
  value?.startsWith("/uploads/")
    ? `http://localhost:3000${value}`
    : value;

const PortfolioPage = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPortfolio = async () => {
      setLoading(true);
      setError("");

      try {
        let response;

        try {
          response = await api.get(`/portfolio/me/${id}`);
        } catch {
          response = await api.get(`/portfolio/${id}`);
        }

        const loadedPortfolio = response.data.portfolio;
        const normalizedPortfolio = {
          ...loadedPortfolio,
          photo: normalizeUploadUrl(loadedPortfolio.photo),
          experience: loadedPortfolio.experience ?? [],
          projects: (loadedPortfolio.projects ?? []).map((project) => ({
            ...project,
            image: normalizeUploadUrl(project.image),
          })),
          education: loadedPortfolio.education ?? [],
          skills: loadedPortfolio.skills ?? [],
          languages: loadedPortfolio.languages ?? [],
          certifications: loadedPortfolio.certifications ?? [],
          links: loadedPortfolio.links ?? [],
        };

        setPortfolio(normalizedPortfolio);
      } catch (requestError) {
        setPortfolio(null);
        setError(
          requestError.response?.data?.message ||
            "Could not load this portfolio.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen px-4 py-10">
        <Skeleton className="mx-auto h-180 max-w-6xl rounded-3xl" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen container mx-auto max-w-4xl px-4 py-10">
        <Alert variant="destructive">
          <AlertTriangle />
          <div>
            <AlertTitle>Unable to load portfolio</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </div>
        </Alert>
        <Button
          variant="outline"
          className="mt-4"
          nativeButton={false}
          render={
            <Link to="/templates">
              <ArrowLeft />
              Browse templates
            </Link>
          }
        />
      </main>
    );
  }

  return portfolio ? <SimplePortfolio portfolio={portfolio} /> : null;
};

export default PortfolioPage;
