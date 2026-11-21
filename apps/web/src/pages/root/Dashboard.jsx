import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpRightIcon,
  BriefcaseBusiness,
  FileText,
  FolderCode,
  Link2,
  Pencil,
  Plus,
  Trash2,
  Eye,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/lib/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const pageStats = [
  {
    title: "CVs",
    description: "CVs created",
    icon: FileText,
  },
  {
    title: "Portfolios",
    description: "Portfolios created",
    icon: BriefcaseBusiness,
  },
  {
    title: "Links Pages",
    description: "Links pages created",
    icon: Link2,
  },
];

const Dashboard = () => {
  const [cvs, setCvs] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [linkPages, setLinkPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [pageType, setPageType] = useState("all");
  const [pendingDeleteCv, setPendingDeleteCv] = useState(null);
  const [pendingDeletePortfolio, setPendingDeletePortfolio] = useState(null);
  const [pendingDeleteLinkPage, setPendingDeleteLinkPage] = useState(null);

  useEffect(() => {
    const loadCvs = async () => {
      try {
        setLoading(true);
        setError("");
        const [cvResponse, portfolioResponse, linkPageResponse] = await Promise.all([
          api.get("/cv/me"),
          api.get("/portfolio/me"),
          api.get("/link-page/me"),
        ]);
        setCvs(cvResponse.data.cvs);
        setPortfolios(portfolioResponse.data.portfolios);
        setLinkPages(linkPageResponse.data.linkPages);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Could not load your CVs.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadCvs();
  }, []);

  const filteredCvs = useMemo(() => {
    return cvs.filter((cv) => {
      const searchText = `${cv.title} ${cv.firstName} ${cv.lastName} ${cv.summary ?? ""}`.toLowerCase();
      return (
        pageType !== "portfolio" &&
        pageType !== "links" &&
        searchText.includes(search.trim().toLowerCase())
      );
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

  const deleteCv = async () => {
    if (!pendingDeleteCv) return;

    try {
      await api.delete(`/cv/${pendingDeleteCv._id}`);
      setCvs((currentCvs) =>
        currentCvs.filter((cv) => cv._id !== pendingDeleteCv._id),
      );
      setPendingDeleteCv(null);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Could not delete the CV.",
      );
      setPendingDeleteCv(null);
    }
  };

  const deletePortfolio = async () => {
    if (!pendingDeletePortfolio) return;
    try {
      await api.delete(`/portfolio/${pendingDeletePortfolio._id}`);
      setPortfolios((current) =>
        current.filter((item) => item._id !== pendingDeletePortfolio._id),
      );
      setPendingDeletePortfolio(null);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not delete the portfolio.");
      setPendingDeletePortfolio(null);
    }
  };

  const deleteLinkPage = async () => {
    if (!pendingDeleteLinkPage) return;
    try {
      await api.delete(`/link-page/${pendingDeleteLinkPage._id}`);
      setLinkPages((current) =>
        current.filter((item) => item._id !== pendingDeleteLinkPage._id),
      );
      setPendingDeleteLinkPage(null);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not delete the links page.");
      setPendingDeleteLinkPage(null);
    }
  };

  return (
    <main className="mx-auto container px-6 py-20 sm:px-10 lg:px-16 pt-4">
      <div>
        <div className="grid grid-cols-3 gap-2 py-4 sm:gap-4 sm:py-6">
          {pageStats.map(({ title, description, icon: Icon }) => (
            <Card key={title} className="rounded-2xl py-3 sm:rounded-3xl sm:py-6">
              <CardHeader className="flex items-center justify-between gap-1 px-3 sm:gap-2 sm:px-6">
                <CardTitle className="hidden truncate text-xs sm:block sm:text-base">
                  {title}
                </CardTitle>
                <div className="shrink-0 rounded-md bg-primary/10 p-1.5 text-primary sm:rounded-xl sm:p-3">
                  <Icon size={15} className="sm:size-5" />
                </div>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <p className="text-2xl font-semibold sm:text-4xl">
                  {title === "CVs"
                    ? cvs.length
                    : title === "Portfolios"
                      ? portfolios.length
                      : linkPages.length}
                </p>
                <p className="mt-1 truncate text-[10px] text-muted-foreground sm:mt-2 sm:text-sm">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <header className="flex items-center gap-2">
        <Input
          size="lg"
          placeholder="Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Select value={pageType} onValueChange={setPageType} className="ml-4">
          <SelectTrigger className="capitalize w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="w-full!">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="cv">Cv</SelectItem>
            <SelectItem value="portfolio">Portfolio</SelectItem>
            <SelectItem value="links">Links Pages</SelectItem>
          </SelectContent>
        </Select>
        <CreatePageButton />
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
              <EmptyTitle>Could not load your CVs</EmptyTitle>
              <EmptyDescription>{error}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : filteredCvs.length > 0 || filteredPortfolios.length > 0 || filteredLinkPages.length > 0 ? (
          <div className="grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCvs.map((cv) => (
              <Card
                key={cv._id}
                className="group relative rounded-3xl overflow-hidden"
              >
                <div className="absolute right-3 top-3 z-10 flex gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="size-9 rounded-full"
                    title={`View ${cv.title}`}
                    aria-label={`View ${cv.title}`}
                    nativeButton={false}
                    render={
                      <Link
                        to={`/cv/preview?id=${cv._id}&template=${cv.template ?? "classic"}`}
                      >
                        <Eye />
                      </Link>
                    }
                  />
                  <Button
                    size="icon"
                    variant="secondary"
                    className="size-9 rounded-full"
                    title={`Edit ${cv.title}`}
                    aria-label={`Edit ${cv.title}`}
                    nativeButton={false}
                    render={
                      <Link to={`/cv/edit/${cv._id}`}>
                        <Pencil />
                      </Link>
                    }
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="size-9 rounded-full"
                    title={`Delete ${cv.title}`}
                    aria-label={`Delete ${cv.title}`}
                    onClick={() => setPendingDeleteCv(cv)}
                  >
                    <Trash2 />
                  </Button>
                </div>
                <CardHeader className="gap-3">
                  <div className="flex flex-col items-start gap-2 pr-32">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">CV</Badge>
                      <Badge variant={cv.isPublic ? "default" : "secondary"}>
                        {cv.isPublic ? "Public" : "Private"}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2">{cv.title}</CardTitle>
                  </div>
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
                </CardContent>
              </Card>
            ))}
            {filteredPortfolios.map((portfolio) => (
              <Card key={portfolio._id} className="group relative rounded-3xl overflow-hidden">
                <div className="absolute right-3 top-3 z-10 flex gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="size-9 rounded-full"
                    title={`View ${portfolio.title}`}
                    aria-label={`View ${portfolio.title}`}
                    nativeButton={false}
                    render={<Link to={`/portfolio/${portfolio._id}`}><Eye /></Link>}
                  />
                  <Button
                    size="icon"
                    variant="secondary"
                    className="size-9 rounded-full"
                    title={`Edit ${portfolio.title}`}
                    aria-label={`Edit ${portfolio.title}`}
                    nativeButton={false}
                    render={<Link to={`/portfolio/edit/${portfolio._id}`}><Pencil /></Link>}
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="size-9 rounded-full"
                    title={`Delete ${portfolio.title}`}
                    aria-label={`Delete ${portfolio.title}`}
                    onClick={() => setPendingDeletePortfolio(portfolio)}
                  >
                    <Trash2 />
                  </Button>
                </div>
                <CardHeader className="gap-3">
                  <div className="flex flex-col items-start gap-2 pr-32">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Portfolio</Badge>
                      <Badge variant={portfolio.isPublic ? "default" : "secondary"}>
                        {portfolio.isPublic ? "Public" : "Private"}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2">{portfolio.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-medium">{portfolio.firstName} {portfolio.lastName}</p>
                  {portfolio.location && (
                    <p className="text-sm text-muted-foreground">{portfolio.location}</p>
                  )}
                  {portfolio.headline && (
                    <p className="line-clamp-3 text-sm text-muted-foreground">{portfolio.headline}</p>
                  )}
                </CardContent>
              </Card>
            ))}
            {filteredLinkPages.map((linkPage) => (
              <Card key={linkPage._id} className="group relative rounded-3xl overflow-hidden">
                <div className="absolute right-3 top-3 z-10 flex gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="size-9 rounded-full"
                    title={`View ${linkPage.title}`}
                    aria-label={`View ${linkPage.title}`}
                    nativeButton={false}
                    render={<Link to={`/link-page/${linkPage.username}`}><Eye /></Link>}
                  />
                  <Button
                    size="icon"
                    variant="secondary"
                    className="size-9 rounded-full"
                    title={`Edit ${linkPage.title}`}
                    aria-label={`Edit ${linkPage.title}`}
                    nativeButton={false}
                    render={<Link to={`/link-page/edit/${linkPage._id}`}><Pencil /></Link>}
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="size-9 rounded-full"
                    title={`Delete ${linkPage.title}`}
                    aria-label={`Delete ${linkPage.title}`}
                    onClick={() => setPendingDeleteLinkPage(linkPage)}
                  >
                    <Trash2 />
                  </Button>
                </div>
                <CardHeader className="gap-3">
                  <div className="flex flex-col items-start gap-2 pr-32">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Links Page</Badge>
                      <Badge variant={linkPage.isPublic ? "default" : "secondary"}>
                        {linkPage.isPublic ? "Public" : "Private"}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2">{linkPage.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-medium">{linkPage.firstName} {linkPage.lastName}</p>
                  {linkPage.username && (
                    <p className="text-sm text-muted-foreground">@{linkPage.username}</p>
                  )}
                  {linkPage.bio && (
                    <p className="line-clamp-3 text-sm text-muted-foreground">{linkPage.bio}</p>
                  )}
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
              <EmptyTitle>{cvs.length ? "No CVs found" : "No Pages Yet"}</EmptyTitle>
              <EmptyDescription>
                {cvs.length
                  ? "Try a different search or page type."
                  : "You haven't created any pages yet. Get started by creating your first page."}
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row flex-wrap justify-center gap-2">
              <CreatePageButton />
              <Button variant="outline">Discover Templates</Button>
            </EmptyContent>
            <Button
              variant="link"
              className="text-muted-foreground"
              size="sm"
              nativeButton={false}
              render={
                <Link to="/">
                  Learn More <ArrowUpRightIcon />
                </Link>
              }
            />
          </Empty>
        )}
      </section>
      <AlertDialog
        open={pendingDeleteLinkPage !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDeleteLinkPage(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this links page?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingDeleteLinkPage
                ? `"${pendingDeleteLinkPage.title}" will be permanently deleted.`
                : "This links page will be permanently deleted."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={deleteLinkPage}>
              Delete links page
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        open={pendingDeletePortfolio !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDeletePortfolio(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this portfolio?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingDeletePortfolio
                ? `"${pendingDeletePortfolio.title}" will be permanently deleted.`
                : "This portfolio will be permanently deleted."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={deletePortfolio}>
              Delete portfolio
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        open={pendingDeleteCv !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDeleteCv(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this CV?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingDeleteCv
                ? `"${pendingDeleteCv.title}" will be permanently deleted.`
                : "This CV will be permanently deleted."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={deleteCv}>
              Delete CV
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

const CreatePageButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button size="lg" />}>
        <Plus /> Create new page
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <Link to="/cv/create">
          <DropdownMenuItem>Cv</DropdownMenuItem>
        </Link>
        <Link to="/portfolio/create">
          <DropdownMenuItem>Portfolio</DropdownMenuItem>
        </Link>
        <Link to="/link-page/create">
          <DropdownMenuItem>Links Page</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dashboard;
