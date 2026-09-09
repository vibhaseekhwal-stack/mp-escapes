import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle, MapPin, AtSign, Users2, Globe, Pencil } from "lucide-react";

const CONTACT = {
  phone: "+91 755 274 0100",
  email: "info@mpescapes.com",
  whatsapp: "+91 98765 43210",
  address: "Paryatan Bhawan, 4th Floor, Bhopal, Madhya Pradesh 462011",
  instagram: "@mpescapes",
  facebook: "/mpescapes",
  website: "www.mpescapes.com",
  formEnabled: true,
};

const FIELDS = [
  { icon: Phone, label: "Phone", value: CONTACT.phone },
  { icon: Mail, label: "Email", value: CONTACT.email },
  { icon: MessageCircle, label: "WhatsApp", value: CONTACT.whatsapp },
  { icon: MapPin, label: "Address", value: CONTACT.address },
  { icon: AtSign, label: "Instagram", value: CONTACT.instagram },
  { icon: Users2, label: "Facebook", value: CONTACT.facebook },
  { icon: Globe, label: "Website", value: CONTACT.website },
];

export default function Contact() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          The contact details shown across the traveller-facing platform.
        </p>
        <Link to="/contact/edit">
          <button className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-medium text-white hover:bg-gold-hover">
            <Pencil size={15} /> Edit Contact Details
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {FIELDS.map((f) => (
          <div key={f.label} className="card flex items-start gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
              <f.icon size={20} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">{f.label}</p>
              <p className="mt-1 text-sm text-ink">{f.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-5">
        <h3 className="font-display text-base font-semibold text-ink">
          Contact Form Settings
        </h3>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-muted">
            Allow visitors to submit enquiries via the website contact form.
          </p>
          <span className={`badge ${CONTACT.formEnabled ? "bg-success/10 text-success" : "bg-muted/10 text-muted"}`}>
            {CONTACT.formEnabled ? "Enabled" : "Disabled"}
          </span>
        </div>
      </div>
    </div>
  );
}
