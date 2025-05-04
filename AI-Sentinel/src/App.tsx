import { useState } from 'react'
import axios from 'axios';
import { Incident } from './types/incidents';
import IncidentList from './components/IncidentList';
import IncidentForm from "./components/IncidentForm";
import './App.css'

const initialIncidents: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics...",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z"
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description: "LLM provided incorrect safety procedure information...",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z"
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description: "Chatbot inadvertently exposed non-sensitive user metadata...",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z"
  }
];

function App() {
  const [incidents, setIncidents] = useState<Incident[]>([...initialIncidents]);

  const handleNewIncident = async (incident: Omit<Incident, "reported_at">) => {
    const newIncident = { ...incident, reported_at: new Date().toISOString() };
    setIncidents((prev) => [newIncident, ...prev]);  
  };

  return (
    <>
      <div className="container">
        <h1>AI Safety Incident Dashboard</h1>
        <IncidentForm onSubmit={handleNewIncident} />
        <IncidentList incidents={incidents} />
      </div>
    </>
  );
};

export default App;
