import React from "react";
import { FolderCode } from "lucide-react";

import { Input } from "@/components/ui/input";
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
  return (
    <main className="mx-auto container px-6 py-20 sm:px-10 lg:px-16 pt-4">
      <header className="flex items-center gap-2">
        <Input size="lg" placeholder="Search examples" />
        <Select defaultValue="all">
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
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderCode />
            </EmptyMedia>
            <EmptyTitle>No Examples Yet</EmptyTitle>
            <EmptyDescription>
              There are no examples to display yet. Check back soon for
              inspiration.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </section>
    </main>
  );
};

export default Examples;