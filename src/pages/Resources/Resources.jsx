import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Eye, Pencil, Trash2, FileText } from "lucide-react";
import Button from "../../components/Button/Button.jsx";
import DeleteModal from "../../components/DeleteModal/DeleteModal.jsx";

const INITIAL_RESOURCES = [
  { id: 1, title: "Travel Guide to Madhya Pradesh", type: "Travel Guide", status: "Published", publishedDate: "10 Aug 2026" },
  { id: 2, title: "Safety Information for Travellers", type: "Safety Information", status: "Published", publishedDate: "05 Aug 2026" },
  { id: 3, title: "Getting Around: Transportation Guide", type: "Transportation Guide", status: "Draft", publishedDate: "—" },
  { id: 4, title: "Where to Stay: Accommodation Guide", type: "Accommodation Guide", status: "Published", publishedDate: "28 Jul 2026" },
  { id: 5, title: "Taste of MP: Food Guide", type: "Food Guide", status: "Published", publishedDate: "20 Jul 2026" },
  { id: 6, title: "Emergency Contacts & Information", type: "Emergency Information", status: "Published", publishedDate: "15 Jul 2026" },
];

const statusStyle = {
  Published: "bg-success/10 text-success",
  Draft: "bg-muted/10 text-muted",
};

export default function Resources() {
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(
    () => resources.filter((r) => r.title.toLowerCase().includes(search.toLowerCase())),
    [resources, search]
  );

  const togglePublish = (id) => {
    setResources((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: r.status === "Published" ? "Draft" : "Published" } : r
      )
    );
  };

  const handleDelete = () => {
    setResources((prev) => prev.filter((r) => r.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          Manage traveller-facing guides and reference information.
        </p>
        <Link to="/resources/add">
          <Button variant="gold" icon={Plus}>Add Resource</Button>
        </Link>
      </div>

      <div className="card p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources…"
            className="input-field pl-10"
          />
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr>
                <th className="table-head">Title</th>
                <th className="table-head">Type</th>
                <th className="table-head">Status</th>
                <th className="table-head">Published Date</th>
                <th className="table-head text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-surface/60">
                  <td className="table-cell">
                    <div className="flex items-center gap-3 font-medium">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/10 text-gold">
                        <FileText size={16} />
                      </div>
                      {r.title}
                    </div>
                  </td>
                  <td className="table-cell text-muted">{r.type}</td>
                  <td className="table-cell">
                    <span className={`badge ${statusStyle[r.status]}`}>{r.status}</span>
                  </td>
                  <td className="table-cell text-muted">{r.publishedDate}</td>
                  <td className="table-cell">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/resources/view/${r.id}`} className="rounded-md p-2 text-muted hover:bg-surface hover:text-ink">
                        <Eye size={16} />
                      </Link>
                      <Link to={`/resources/edit/${r.id}`} className="rounded-md p-2 text-muted hover:bg-surface hover:text-ink">
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => togglePublish(r.id)}
                        className="rounded-md px-2 py-1 text-xs font-medium text-muted hover:bg-surface hover:text-ink"
                      >
                        {r.status === "Published" ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        onClick={() => setDeleteTarget(r)}
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
                  <td colSpan={5} className="px-4 py-14 text-center text-sm text-muted">
                    No resources match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteModal
        open={!!deleteTarget}
        title="Delete resource"
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
