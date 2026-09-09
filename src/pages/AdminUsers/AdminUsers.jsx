import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Eye, Pencil, Trash2 } from "lucide-react";
import Button from "../../components/Button/Button.jsx";
import DeleteModal from "../../components/DeleteModal/DeleteModal.jsx";

const INITIAL_USERS = [
  { id: 1, name: "Aditi Agarwal", email: "aditi@mpescapes.com", role: "Super Admin", status: "Active", createdDate: "02 Jan 2026" },
  { id: 2, name: "Priya Sharma", email: "priya@mpescapes.com", role: "Admin", status: "Active", createdDate: "14 Feb 2026" },
  { id: 3, name: "Rahul Verma", email: "rahul@mpescapes.com", role: "Editor", status: "Active", createdDate: "03 Mar 2026" },
  { id: 4, name: "Meera Joshi", email: "meera@mpescapes.com", role: "Editor", status: "Inactive", createdDate: "22 Apr 2026" },
  { id: 5, name: "Karan Mehta", email: "karan@mpescapes.com", role: "Admin", status: "Active", createdDate: "18 May 2026" },
];

const roleStyle = {
  "Super Admin": "bg-gold/10 text-gold-hover",
  Admin: "bg-black/5 text-ink",
  Editor: "bg-muted/10 text-muted",
};

const statusStyle = {
  Active: "bg-success/10 text-success",
  Inactive: "bg-danger/10 text-danger",
};

export default function AdminUsers() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(
    () =>
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      ),
    [users, search]
  );

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u))
    );
  };

  const handleDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">Manage administrator access to MP Escapes.</p>
        <Link to="/admin-users/add">
          <Button variant="gold" icon={Plus}>Add Admin</Button>
        </Link>
      </div>

      <div className="card p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="input-field pl-10"
          />
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr>
                <th className="table-head">Name</th>
                <th className="table-head">Email</th>
                <th className="table-head">Role</th>
                <th className="table-head">Status</th>
                <th className="table-head">Created</th>
                <th className="table-head text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-surface/60">
                  <td className="table-cell">
                    <div className="flex items-center gap-3 font-medium">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-semibold text-gold">
                        {u.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      {u.name}
                    </div>
                  </td>
                  <td className="table-cell text-muted">{u.email}</td>
                  <td className="table-cell">
                    <span className={`badge ${roleStyle[u.role]}`}>{u.role}</span>
                  </td>
                  <td className="table-cell">
                    <span className={`badge ${statusStyle[u.status]}`}>{u.status}</span>
                  </td>
                  <td className="table-cell text-muted">{u.createdDate}</td>
                  <td className="table-cell">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/admin-users/view/${u.id}`} className="rounded-md p-2 text-muted hover:bg-surface hover:text-ink">
                        <Eye size={16} />
                      </Link>
                      <Link to={`/admin-users/edit/${u.id}`} className="rounded-md p-2 text-muted hover:bg-surface hover:text-ink">
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => toggleStatus(u.id)}
                        className="rounded-md px-2 py-1 text-xs font-medium text-muted hover:bg-surface hover:text-ink"
                      >
                        {u.status === "Active" ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => setDeleteTarget(u)}
                        className="rounded-md p-2 text-danger/80 hover:bg-danger/5 hover:text-danger"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-14 text-center text-sm text-muted">
                    No admin users match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteModal
        open={!!deleteTarget}
        title="Delete admin user"
        message={`Are you sure you want to remove "${deleteTarget?.name}" from MP Escapes?`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
