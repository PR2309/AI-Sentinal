// src/components/IncidentForm.tsx
import { useState } from "react";
import { Incident } from "../types/incidents";
interface IncidentFormProps {
    onSubmit: (incident: Omit<Incident, "reported_at">) => void;
}

export default function IncidentForm({ onSubmit }: IncidentFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [severity, setSeverity] = useState<"Low" | "Medium" | "High">("Low");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description) {
            alert("Please fill in all fields.");
            return;
        }

    onSubmit({
        title,
        description,
        severity,
    });

    setTitle("");
    setDescription("");
    setSeverity("Low");
};

return (
    <>
        <form onSubmit={handleSubmit} className="incident-form">
            <h2>Report New Incident</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required  />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required/>
            <select value={severity} onChange={(e) => setSeverity(e.target.value as any)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select><br/>
            <div className="form-actions">
                <button type="submit">Submit</button>    
            </div>
        </form>
        </>
    );
};
