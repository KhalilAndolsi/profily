import React from "react";
import {
  BriefcaseBusiness,
  FileText,
  Link2,
  Search,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const initialUsers = [
  {
    id: 1,
    name: "Khalil Andolsi",
    email: "khalil.andolsi@example.com",
    cv: 2,
    portfolios: 1,
    links: 2,
    joined: "Jan 12, 2025",
  },
  {
    id: 2,
    name: "Sarah Martin",
    email: "sarah.martin@example.com",
    cv: 1,
    portfolios: 2,
    links: 1,
    joined: "Jan 18, 2025",
  },
  {
    id: 3,
    name: "Youssef Ben Salem",
    email: "youssef.bensalem@example.com",
    cv: 3,
    portfolios: 1,
    links: 3,
    joined: "Feb 02, 2025",
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    cv: 1,
    portfolios: 0,
    links: 1,
    joined: "Feb 11, 2025",
  },
];

const statCards = [
  { key: "users", label: "Users", description: "Registered users", icon: UserRound },
  { key: "cv", label: "CVs", description: "CVs created", icon: FileText },
  {
    key: "portfolios",
    label: "Portfolios",
    description: "Portfolios created",
    icon: BriefcaseBusiness,
  },
  {
    key: "links",
    label: "Links pages",
    description: "Links pages created",
    icon: Link2,
  },
];

const AdminDashboard = () => {
  const [users, setUsers] = React.useState(initialUsers);
  const [userToDelete, setUserToDelete] = React.useState(null);

  const totals = users.reduce(
    (result, user) => ({
      users: result.users + 1,
      cv: result.cv + user.cv,
      portfolios: result.portfolios + user.portfolios,
      links: result.links + user.links,
    }),
    { users: 0, cv: 0, portfolios: 0, links: 0 },
  );
  const deleteUser = () => {
    if (!userToDelete) return;

    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== userToDelete.id),
    );
    setUserToDelete(null);
  };

  return (
    <main className="container mx-auto px-6 pb-20 pt-4 sm:px-10 lg:px-16">
      <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <ShieldCheck size={16} />
            Administration
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Admin dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Keep track of your platform activity and users.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          {users.length} active {users.length === 1 ? "user" : "users"}
        </p>
      </header>

      <section
        aria-label="Platform statistics"
        className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
      >
        {statCards.map(({ key, label, description, icon: Icon }) => (
          <Card key={key} className="rounded-2xl sm:rounded-3xl">
            <CardHeader className="flex items-center justify-between gap-2 px-4 pb-2 sm:px-6">
              <CardTitle className="text-sm font-medium text-muted-foreground sm:text-base">
                {label}
              </CardTitle>
              <span className="rounded-xl bg-primary/10 p-2 text-primary">
                <Icon size={18} />
              </span>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <p className="text-3xl font-semibold tracking-tight">{totals[key]}</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {description}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="mt-8 rounded-2xl sm:rounded-3xl">
        <CardHeader className="border-b px-4 pb-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-xl">Users</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage registered users and their published content.
              </p>
            </div>
            <div className="relative w-full sm:max-w-xs">
              <Search
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="search"
                placeholder="Search users..."
                aria-label="Search users by name or email"
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-180 text-left text-sm">
              <caption className="sr-only">Registered users</caption>
              <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium sm:px-6">
                    User
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    CVs
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Portfolios
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Links pages
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Joined
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium sm:px-6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((user) => (
                  <tr key={user.id} className="transition-colors hover:bg-muted/30">
                    <td className="px-4 py-4 sm:px-6">
                      <p className="font-medium">{user.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{user.email}</p>
                    </td>
                    <td className="px-4 py-4">{user.cv}</td>
                    <td className="px-4 py-4">{user.portfolios}</td>
                    <td className="px-4 py-4">{user.links}</td>
                    <td className="px-4 py-4 text-muted-foreground">{user.joined}</td>
                    <td className="px-4 py-4 text-right sm:px-6">
                      <Button
                        variant="destructive"
                        size="sm"
                        aria-label={`Delete ${user.name}`}
                        onClick={() => setUserToDelete(user)}
                      >
                        <Trash2 />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-muted-foreground"
                    >
                      No users to display.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog
        open={Boolean(userToDelete)}
        onOpenChange={(open) => {
          if (!open) setUserToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this user?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove {userToDelete?.name || "this user"} and all of
              their content from the dashboard. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={deleteUser}
            >
              Delete user
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default AdminDashboard;