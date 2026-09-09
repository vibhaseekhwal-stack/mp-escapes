import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../../components/Button/Button.jsx";

const SECTION_TITLES = {
  "best-time": "Best Time to Visit",
  transportation: "Transportation",
  weather: "Weather",
  "local-travel": "Local Travel",
  safety: "Safety",
  accommodation: "Accommodation",
  food: "Food",
  emergency: "Emergency Contacts",
};

const DUMMY_CONTENT = {
  "best-time": "October to March offers the most pleasant weather across Madhya Pradesh, ideal for heritage and wildlife travel.",
  transportation: "MP is well connected via rail, road and air, with major hubs in Bhopal, Indore, Gwalior and Jabalpur.",
  weather: "Summers are hot and dry, monsoons run June to September, and winters are cool and comfortable.",
  "local-travel": "Local taxis, auto-rickshaws and state transport buses connect most destinations across the state.",
  safety: "Madhya Pradesh is generally safe for travellers; standard precautions are advised in wildlife zones.",
  accommodation: "Options range from heritage palaces and luxury resorts to budget stays and forest lodges.",
  food: "Sample local specialties like Poha-Jalebi, Bhutte ka Kees, and Malwa-style thalis.",
  emergency: "Police: 100 · Ambulance: 108 · Tourist Helpline: 1800-233-7777",
};

export default function EditTravelInfo() {
  const navigate = useNavigate();
  const { section } = useParams();
  const [content, setContent] = useState(DUMMY_CONTENT[section] || "");
  const [submitting, setSubmitting] = useState(false);
  const title = SECTION_TITLES[section] || "Travel Information";

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate("/travel-info");
    }, 600);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <button onClick={() => navigate("/travel-info")} className="flex items-center gap-2 text-sm text-muted hover:text-ink">
        <ArrowLeft size={16} /> Back to Travel Information
      </button>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card space-y-5 p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Edit: {title}</h2>
          <div>
            <label className="label-field">Content</label>
            <textarea
              rows={8}
              className="input-field"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate("/travel-info")}>
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
