import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../../components/Button/Button.jsx";

const DUMMY_CONTACT = {
  phone: "+91 755 274 0100",
  email: "info@mpescapes.com",
  whatsapp: "+91 98765 43210",
  address: "Paryatan Bhawan, 4th Floor, Bhopal, Madhya Pradesh 462011",
  instagram: "@mpescapes",
  facebook: "/mpescapes",
  website: "www.mpescapes.com",
  formEnabled: true,
};

export default function EditContact() {
  const navigate = useNavigate();
  const [form, setForm] = useState(DUMMY_CONTACT);
  const [submitting, setSubmitting] = useState(false);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate("/contact");
    }, 600);
  };

  const fields = [
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "whatsapp", label: "WhatsApp" },
    { key: "instagram", label: "Instagram" },
    { key: "facebook", label: "Facebook" },
    { key: "website", label: "Website" },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <button onClick={() => navigate("/contact")} className="flex items-center gap-2 text-sm text-muted hover:text-ink">
        <ArrowLeft size={16} /> Back to Contact
      </button>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="label-field">{f.label}</label>
              <input
                className="input-field"
                value={form[f.key]}
                onChange={(e) => update(f.key, e.target.value)}
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="label-field">Address</label>
            <textarea
              rows={2}
              className="input-field"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
            />
          </div>
        </div>

        <div className="card flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-ink">Contact Form</p>
            <p className="text-sm text-muted">Allow visitors to submit enquiries via the website.</p>
          </div>
          <label className="flex items-center gap-2.5 text-sm text-ink">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-line accent-gold"
              checked={form.formEnabled}
              onChange={(e) => update("formEnabled", e.target.checked)}
            />
            Enabled
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate("/contact")}>
            Cancel
          </Button>
          <Button type="submit" variant="gold" disabled={submitting}>
            {submitting ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
