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
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import React from "react";
import { Link } from "react-router-dom";

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
                <p className="text-2xl font-semibold sm:text-4xl">0</p>
                <p className="mt-1 truncate text-[10px] text-muted-foreground sm:mt-2 sm:text-sm">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <header className="flex items-center gap-2">
        <Input size="lg" placeholder="Search" />
        <Select defaultValue="all" className="ml-4">
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
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderCode />
            </EmptyMedia>
            <EmptyTitle>No Pages Yet</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t created any pages yet. Get started by creating
              your first page.
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
      </section>
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
