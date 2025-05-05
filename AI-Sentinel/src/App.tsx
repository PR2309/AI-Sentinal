import { useState, useEffect } from 'react'
import { Incident } from './types/incidents';
import IncidentList from './components/IncidentList';
import IncidentForm from "./components/IncidentForm";
import './App.css'
// import Navbar from './components/Navbar';

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
  const [theme, setTheme] = useState('default');

  useEffect(() => {
    document.body.className = '';
    if (theme !== 'default') {
      document.body.classList.add(theme);
    }
  }, [theme]);

  const handleNewIncident = async (incident: Omit<Incident, "reported_at">) => {
    const newIncident = { ...incident, reported_at: new Date().toISOString() };
    setIncidents((prev) => [newIncident, ...prev]);  
  };

  return (
    <>
      {/* <Navbar/> */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
        <h2>AI Safety Incident Dashboard</h2>
        <select id="theme" value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="default">No Theme</option>
          <option value="light">Light Theme</option>
          <option value="dark">Dark Theme</option>
        </select>
      </div>
      {/* <h1>AI Safety Incident Dashboard</h1> */}
        <div className='container'>
        <IncidentList incidents={incidents} />
        </div><br/>
        <div className='container'>
          <IncidentForm onSubmit={handleNewIncident} />
        </div>
        <footer className="footer">
          <p>&copy; 2025 AI Sentinal. All rights reserved.</p>
        </footer>
    </>
  );
};

export default App;
