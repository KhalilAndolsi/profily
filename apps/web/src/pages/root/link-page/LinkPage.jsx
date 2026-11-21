import { useEffect, useState } from "react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import api from "@/lib/api";
import SimpleLinkPage from "@/components/templates/link-page/SimpleLinkPage";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const normalizeUploadUrl = (value) =>
  value?.startsWith("/uploads/")
    ? `http://localhost:3000${value}`
    : value;

const LinkPage = () => {
  const { username } = useParams();
  const [linkPage, setLinkPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLinkPage = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get(`/link-page/${encodeURIComponent(username)}`);

        const loadedLinkPage = response.data.linkPage;
        setLinkPage({
          ...loadedLinkPage,
          photo: normalizeUploadUrl(loadedLinkPage.photo),
          links: loadedLinkPage.links ?? [],
        });
      } catch (requestError) {
        setLinkPage(null);
        setError(
          requestError.response?.data?.message ||
            "Could not load this links page.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadLinkPage();
  }, [username]);

  if (loading) {
    return (
      <main className="min-h-screen px-4 py-10">
        <Skeleton className="mx-auto h-96 max-w-2xl rounded-3xl" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen container mx-auto max-w-4xl px-4 py-10">
        <Alert variant="destructive">
          <AlertTriangle />
          <div>
            <AlertTitle>Unable to load links page</AlertTitle>
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

  return linkPage ? <SimpleLinkPage portfolio={linkPage} /> : null;
};

export default LinkPage;
