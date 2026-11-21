import { link_page_mockup } from "../../../constants/mockup";

const SimpleLinkPage = ({ portfolio = link_page_mockup }) => {
  const fullName = `${portfolio.firstName} ${portfolio.lastName}`;

  return (
    <main className="min-h-screen">
      <header className="bg-linear-to-t from-primary to-background p-4 pb-10 pt-20 rounded-b-[30%] flex items-center justify-end flex-col">
        {portfolio.photo && <img
          className="size-30 rounded-full object-cover ring-4 ring-primary/10 border-4 border-white"
          src={portfolio.photo?.startsWith("/uploads/") ? `http://localhost:3000${portfolio.photo}` : portfolio.photo}
          alt={`${fullName} portrait`}
        />}
        <h1 className="mt-5 text-3xl font-semibold text-white tracking-tight">
          {fullName}
        </h1>
        <p className="mt-2 text-sm text-gray-200 max-w-md text-center">
          {portfolio.bio}
        </p>
      </header>
      <section className="w-full px-4 sm:w-md mx-auto mt-14 flex flex-col gap-4">
          {portfolio.links.map((link) => (
            <a
              className="text-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              href={link.url}
              key={link.id || link.url}
              target={"_blank"}
              rel={"noreferrer"}
            >
              {link.label}
            </a>
          ))}
      </section>
    </main>
  );
};

export default SimpleLinkPage;
