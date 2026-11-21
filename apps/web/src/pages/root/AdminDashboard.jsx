import { useEffect, useMemo, useState } from "react";
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
import api from "@/lib/api";
import { useAuth } from "@/components/providers/auth-provider";

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
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [totals, setTotals] = useState({
    users: 0,
    cv: 0,
    portfolios: 0,
    links: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let ignore = false;

    const loadDashboard = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await api.get("/admin/dashboard");
        if (!ignore) {
          setUsers(response.data.users);
          setTotals(response.data.totals);
        }
      } catch (requestError) {
        if (!ignore) {
          setError(
            requestError.response?.data?.message ||
              "Unable to load admin dashboard data.",
          );
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    loadDashboard();
    return () => {
      ignore = true;
    };
  }, []);

  const deleteUser = async () => {
    if (!userToDelete) return;

    setIsDeleting(true);
    setError("");
    try {
      await api.delete(`/admin/users/${encodeURIComponent(userToDelete.id)}`);
      setUsers((currentUsers) =>
        currentUsers.filter((user) => user.id !== userToDelete.id),
      );
      setTotals((currentTotals) => ({
        ...currentTotals,
        users: Math.max(0, currentTotals.users - 1),
        cv: Math.max(0, currentTotals.cv - userToDelete.cv),
        portfolios: Math.max(
          0,
          currentTotals.portfolios - userToDelete.portfolios,
        ),
        links: Math.max(0, currentTotals.links - userToDelete.links),
      }));
      setUserToDelete(null);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to delete this user.",
      );
      setUserToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const visibleUsers = useMemo(() => {
    if (!normalizedSearch) return users;

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch),
    );
  }, [normalizedSearch, users]);

  const formatJoinedDate = (joined) => {
    if (!joined) return "Unknown";
    const date = new Date(joined);
    if (Number.isNaN(date.getTime())) return "Unknown";
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(date);
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

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {error}
        </div>
      )}

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
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
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
                {visibleUsers.map((user) => (
                  <tr key={user.id} className="transition-colors hover:bg-muted/30">
                    <td className="px-4 py-4 sm:px-6">
                      <p className="font-medium">{user.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{user.email}</p>
                    </td>
                    <td className="px-4 py-4">{user.cv}</td>
                    <td className="px-4 py-4">{user.portfolios}</td>
                    <td className="px-4 py-4">{user.links}</td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {formatJoinedDate(user.joined)}
                    </td>
                    <td className="px-4 py-4 text-right sm:px-6">
                      {String(user.id) !== String(currentUser?.id) ? (
                        <Button
                          variant="destructive"
                          size="sm"
                          aria-label={`Delete ${user.name}`}
                          onClick={() => setUserToDelete(user)}
                        >
                          <Trash2 />
                          <span className="hidden sm:inline">Delete</span>
                        </Button>
                      ) : null}
                    </td>
                  </tr>
                ))}
                {isLoading && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-muted-foreground"
                    >
                      Loading users...
                    </td>
                  </tr>
                )}
                {!isLoading && visibleUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-muted-foreground"
                    >
                      {users.length === 0
                        ? "No users to display."
                        : "No users match your search."}
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
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete user"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default AdminDashboard;