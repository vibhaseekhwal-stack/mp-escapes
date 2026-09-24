
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  Users,
  UserCheck,
  UserX,
  RefreshCw,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Button from "../../components/Button/Button.jsx";
import DeleteModal from "../../components/DeleteModal/DeleteModal.jsx";
import { getAllUsers } from "../../api/usersApi";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const roleStyle = {
  "Super Admin": "bg-gold/10 text-gold-hover",
  Admin: "bg-black/5 text-ink",
  Editor: "bg-muted/10 text-muted",
  User: "bg-muted/10 text-muted",
};

const statusStyle = {
  Active: "bg-success/10 text-success",
  Inactive: "bg-danger/10 text-danger",
};

function ErrorMessage({ error }) {
  if (!error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 rounded-2xl border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger"
    >
      <X size={17} className="mt-0.5 shrink-0" />
      <span>{error}</span>
    </motion.div>
  );
}

function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-[320px] items-center justify-center"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-black shadow-xl">
          <div className="absolute inset-1 animate-spin rounded-xl border-2 border-transparent border-t-gold" />
          <Users size={23} className="text-gold" />
        </div>

        <p className="text-sm font-medium text-muted">
          Loading users...
        </p>
      </div>
    </motion.div>
  );
}

function SummaryCards({ users }) {
  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => (user.status || "Active") === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  const cards = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
    },
    {
      label: "Active Users",
      value: activeUsers,
      icon: UserCheck,
    },
    {
      label: "Inactive Users",
      value: inactiveUsers,
      icon: UserX,
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.label}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-3xl border border-line bg-white p-5 shadow-sm transition hover:shadow-xl"
          >
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gold/5 transition duration-500 group-hover:scale-150" />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                  {card.label}
                </p>

                <p className="mt-3 font-display text-3xl font-semibold text-ink">
                  {card.value}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-gold shadow-lg">
                <Icon size={19} />
              </div>
            </div>

            <div className="mt-5 h-1 overflow-hidden rounded-full bg-surface">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(
                    100,
                    totalUsers > 0
                      ? Math.max(25, (card.value / totalUsers) * 100)
                      : 0
                  )}%`,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.08,
                }}
                className="h-full rounded-full bg-gold"
              />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function formatDate(date) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getInitials(name) {
  if (!name) return "U";

  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllUsers();

      if (response?.success) {
        setUsers(
          Array.isArray(response.data)
            ? response.data
            : Array.isArray(response.data?.data)
            ? response.data.data
            : []
        );
      } else {
        setUsers([]);
        setError(response?.message || "Failed to load users.");
      }
    } catch (error) {
      console.error("Failed to load users:", error);

      setUsers([]);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return users;

    return users.filter((user) => {
      const name = user.name?.toLowerCase() || "";
      const email = user.email?.toLowerCase() || "";
      const phone = user.phone?.toLowerCase() || "";

      return (
        name.includes(value) ||
        email.includes(value) ||
        phone.includes(value)
      );
    });
  }, [users, search]);

  const handleDelete = () => {
    if (!deleteTarget?._id) return;

    setUsers((previous) =>
      previous.filter((user) => user._id !== deleteTarget._id)
    );

    setDeleteTarget(null);
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-[2rem] bg-black p-6 text-white shadow-2xl sm:p-8"
        >
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

          <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold">
                <Sparkles size={13} />
                MP Escapes
              </div>

              <h1 className="font-display text-3xl font-semibold sm:text-4xl">
                Admin Users
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
                Manage users and administrator access from one place.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={fetchUsers}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </motion.button>

              <Link to="/admin-users/add">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="gold" icon={Plus}>
                    Add Admin
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>

        <ErrorMessage error={error} />

        {!loading && <SummaryCards users={users} />}

        <motion.div
          variants={itemVariants}
          className="rounded-[2rem] border border-line bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold text-ink">
                Users
              </h2>

              <p className="mt-1 text-sm text-muted">
                {filtered.length} user
                {filtered.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="relative w-full lg:max-w-sm">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, email or phone..."
                className="w-full rounded-2xl border border-line bg-surface/40 px-4 py-3 pl-10 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/10"
              />
            </div>
          </div>

          {loading ? (
            <LoadingState />
          ) : filtered.length === 0 ? (
            <div className="flex min-h-[280px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-gold">
                  <Users size={28} />
                </div>

                <p className="mt-4 font-display text-lg font-semibold text-ink">
                  No users found
                </p>

                <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-muted">
                  {search
                    ? "Try another name, email address or phone number."
                    : "No users are currently available."}
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr className="border-b border-line">
                    <th className="table-head">User</th>
                    <th className="table-head">Email</th>
                    <th className="table-head">Phone</th>
                    <th className="table-head">Role</th>
                    <th className="table-head">Status</th>
                    <th className="table-head">Created</th>
                    <th className="table-head text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <AnimatePresence initial={false}>
                    {filtered.map((user, index) => {
                      const role = user.role || "User";
                      const status = user.status || "Active";

                      return (
                        <motion.tr
                          key={user._id}
                          initial={{
                            opacity: 0,
                            y: 8,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.03,
                          }}
                          className="border-b border-line/70 transition hover:bg-surface/50"
                        >
                          <td className="table-cell">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-xs font-bold text-gold shadow-sm">
                                {getInitials(user.name)}
                              </div>

                              <div className="min-w-0">
                                <p className="truncate font-semibold text-ink">
                                  {user.name || "Unnamed User"}
                                </p>

                                <p className="mt-0.5 text-xs text-muted">
                                  ID: {user._id}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="table-cell">
                            <div className="flex items-center gap-2 text-muted">
                              <Mail size={14} className="text-gold" />
                              <span>{user.email || "—"}</span>
                            </div>
                          </td>

                          <td className="table-cell">
                            <div className="flex items-center gap-2 text-muted">
                              <Phone size={14} className="text-gold" />
                              <span>{user.phone || "—"}</span>
                            </div>
                          </td>

                          <td className="table-cell">
                            <span
                              className={`badge ${
                                roleStyle[role] || roleStyle.User
                              }`}
                            >
                              {role}
                            </span>
                          </td>

                          <td className="table-cell">
                            <span
                              className={`badge ${
                                statusStyle[status] ||
                                statusStyle.Active
                              }`}
                            >
                              {status}
                            </span>
                          </td>

                          <td className="table-cell text-muted">
                            {formatDate(user.createdAt)}
                          </td>

                          <td className="table-cell">
                            <div className="flex items-center justify-end gap-1">
                              <Link
                                to={`/admin-users/view/${user._id}`}
                                title="View user"
                                className="rounded-xl p-2 text-muted transition hover:bg-gold/10 hover:text-gold-hover"
                              >
                                <Eye size={16} />
                              </Link>

                              <Link
                                to={`/admin-users/edit/${user._id}`}
                                title="Edit user"
                                className="rounded-xl p-2 text-muted transition hover:bg-gold/10 hover:text-gold-hover"
                              >
                                <Pencil size={16} />
                              </Link>

                              <button
                                type="button"
                                title="Delete user"
                                onClick={() =>
                                  setDeleteTarget(user)
                                }
                                className="rounded-xl p-2 text-danger/70 transition hover:bg-danger/5 hover:text-danger"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </motion.div>

      <DeleteModal
        open={!!deleteTarget}
        title="Delete user"
        message={`Are you sure you want to remove "${
          deleteTarget?.name || "this user"
        }" from MP Escapes?`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}

