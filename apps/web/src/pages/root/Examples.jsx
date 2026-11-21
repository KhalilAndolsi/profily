import { useEffect, useMemo, useState } from "react";
import { FolderCode } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const Examples = () => {
  const [cvs, setCvs] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [linkPages, setLinkPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [pageType, setPageType] = useState("all");

  useEffect(() => {
    const loadPublicCvs = async () => {
      try {
        setLoading(true);
        setError("");
        const [cvResponse, portfolioResponse, linkPageResponse] = await Promise.all([
          api.get("/cv"),
          api.get("/portfolio"),
          api.get("/link-page"),
        ]);
        setCvs(cvResponse.data.cvs);
        setPortfolios(portfolioResponse.data.portfolios);
        setLinkPages(linkPageResponse.data.linkPages);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Could not load public CV examples.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadPublicCvs();
  }, []);

  const filteredCvs = useMemo(() => {
    return cvs.filter((cv) => {
      if (pageType !== "all" && pageType !== "cv") return false;

      const searchText =
        `${cv.title} ${cv.firstName} ${cv.lastName} ${cv.location ?? ""} ${cv.summary ?? ""}`.toLowerCase();
      return searchText.includes(search.trim().toLowerCase());
    });
  }, [cvs, pageType, search]);

  const filteredPortfolios = useMemo(() => {
    return portfolios.filter((portfolio) => {
      if (pageType !== "all" && pageType !== "portfolio") return false;
      const searchText =
        `${portfolio.title} ${portfolio.firstName} ${portfolio.lastName} ${portfolio.location ?? ""} ${portfolio.headline ?? ""}`.toLowerCase();
      return searchText.includes(search.trim().toLowerCase());
    });
  }, [pageType, portfolios, search]);

  const filteredLinkPages = useMemo(() => {
    return linkPages.filter((linkPage) => {
      if (pageType !== "all" && pageType !== "links") return false;
      const searchText =
        `${linkPage.title} ${linkPage.username} ${linkPage.firstName} ${linkPage.lastName} ${linkPage.bio ?? ""}`.toLowerCase();
      return searchText.includes(search.trim().toLowerCase());
    });
  }, [linkPages, pageType, search]);

  return (
    <main className="mx-auto container px-6 py-20 sm:px-10 lg:px-16 pt-4">
      <header className="flex items-center gap-2">
        <Input
          size="lg"
          placeholder="Search examples"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Select value={pageType} onValueChange={setPageType}>
          <SelectTrigger className="w-40 capitalize">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="w-full!">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="cv">Cv</SelectItem>
            <SelectItem value="portfolio">Portfolio</SelectItem>
            <SelectItem value="links">Links Pages</SelectItem>
          </SelectContent>
        </Select>
      </header>
      <section className="min-h-[60vh]">
        {loading ? (
          <div className="grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <Skeleton key={item} className="h-52 rounded-3xl" />
            ))}
          </div>
        ) : error ? (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>Could not load examples</EmptyTitle>
              <EmptyDescription>{error}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : filteredCvs.length > 0 || filteredPortfolios.length > 0 || filteredLinkPages.length > 0 ? (
          <div className="grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCvs.map((cv) => (
              <Card key={cv._id} className="rounded-3xl">
                <CardHeader className="gap-3">
                  <Badge variant="secondary">CV</Badge>
                  <CardTitle className="line-clamp-2">{cv.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">
                      {cv.firstName} {cv.lastName}
                    </p>
                    {cv.location && (
                      <p className="text-sm text-muted-foreground">{cv.location}</p>
                    )}
                  </div>
                  {cv.summary && (
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {cv.summary}
                    </p>
                  )}
                  <Button
                    variant="outline"
                    nativeButton={false}
                    render={
                      <Link
                        to={`/cv/preview?id=${cv._id}&template=${cv.template ?? "classic"}`}
                      >
                        View CV <ArrowUpRight />
                      </Link>
                    }
                  />
                </CardContent>
              </Card>
            ))}
            {filteredPortfolios.map((portfolio) => (
              <Card key={portfolio._id} className="rounded-3xl">
                <CardHeader className="gap-3">
                  <Badge variant="secondary">Portfolio</Badge>
                  <CardTitle className="line-clamp-2">{portfolio.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-medium">
                    {portfolio.firstName} {portfolio.lastName}
                  </p>
                  {portfolio.location && (
                    <p className="text-sm text-muted-foreground">{portfolio.location}</p>
                  )}
                  {portfolio.headline && (
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {portfolio.headline}
                    </p>
                  )}
                  <Button
                    variant="outline"
                    nativeButton={false}
                    render={
                      <Link to={`/portfolio/${portfolio._id}`}>
                        View Portfolio <ArrowUpRight />
                      </Link>
                    }
                  />
                </CardContent>
              </Card>
            ))}
            {filteredLinkPages.map((linkPage) => (
              <Card key={linkPage._id} className="rounded-3xl">
                <CardHeader className="gap-3">
                  <Badge variant="secondary">Links Page</Badge>
                  <CardTitle className="line-clamp-2">{linkPage.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-medium">
                    {linkPage.firstName} {linkPage.lastName}
                  </p>
                  {linkPage.username && (
                    <p className="text-sm text-muted-foreground">@{linkPage.username}</p>
                  )}
                  {linkPage.bio && (
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {linkPage.bio}
                    </p>
                  )}
                  <Button
                    variant="outline"
                    nativeButton={false}
                    render={
                      <Link to={`/link-page/${linkPage.username}`}>
                        View Links Page <ArrowUpRight />
                      </Link>
                    }
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderCode />
              </EmptyMedia>
              <EmptyTitle>
                {cvs.length || portfolios.length || linkPages.length
                  ? "No Matching Examples Found"
                  : "No Examples Yet"}
              </EmptyTitle>
              <EmptyDescription>
                {cvs.length || portfolios.length || linkPages.length
                  ? "Try a different search or page type."
                  : "There are no public examples to display yet."}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </section>
    </main>
  );
};

export default Examples;