// src/components/IncidentList.tsx
import { useState } from "react";
import { Incident } from "../types/incidents";
interface IncidentListProps {
    incidents: Incident[];
}

export default function IncidentList({ incidents }: IncidentListProps) {
    const [filter, setFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const filtered = incidents.filter((i) =>
        filter === "All" ? true : i.severity === filter
    );

    const sorted = [...filtered].sort((a, b) => {
        const da = new Date(a.reported_at).getTime();
        const db = new Date(b.reported_at).getTime();
        return sortOrder === "newest" ? db - da : da - db;
    });

    const toggleDetails = (id?: number) => {
        if (!id) return;
        setExpandedId(expandedId === id ? null : id);
    };

return (
    <>
        <div className="incident-list">
            <h2>Incidents</h2>
            <div className="controls">
                <select onChange={(e) => setFilter(e.target.value)}>
                    <option value="All">All Severities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <select onChange={(e) => setSortOrder(e.target.value as any)}>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>
            <ul>
                {sorted.map((incident) => (
                    <li key={incident.id} className="incident-item">
                        <div>
                            <strong>{incident.title}</strong> – <em>{incident.severity}</em> –{" "}
                                {new Date(incident.reported_at).toLocaleString()}
                                <div>
                                    <button className="form-actions" onClick={() => toggleDetails(incident.id)}>View&nbsp;Details</button>
                                </div>
                        </div>
                        {expandedId === incident.id && (
                            <p className="description">{incident.description}</p>
                            )}
                    </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
