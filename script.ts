type Incident = {
	id: number;
	title: string;
	description: string;
	severity: "Low" | "Medium" | "High";
	reported_at: string;
	expanded?: boolean;
};

let incidents: Incident[] = [
	{
		id: 1,
		title: "Biased Recommendation Algorithm",
		description: "Algorithm consistently favored certain demographics...",
		severity: "Medium",
		reported_at: "2025-03-15T10:00:00Z",
	},
	{
		id: 2,
		title: "LLM Hallucination in Critical Info",
		description: "LLM provided incorrect safety procedure information...",
		severity: "High",
		reported_at: "2025-04-01T14:30:00Z",
	},
	{
		id: 3,
		title: "Minor Data Leak via Chatbot",
		description: "Chatbot inadvertently exposed non-sensitive user metadata...",
		severity: "Low",
		reported_at: "2025-03-20T09:15:00Z",
	},
];

const listEl = document.getElementById("incidentList")!;
const filterEl = document.getElementById("severityFilter") as HTMLSelectElement;
const sortEl = document.getElementById("sortOrder") as HTMLSelectElement;
const form = document.getElementById("reportForm") as HTMLFormElement;

function renderIncidents() {
	const filter = filterEl.value;
	const sort = sortEl.value;

	let filtered = [...incidents];

	if (filter !== "All") {
		filtered = filtered.filter((i) => i.severity === filter);
	}

	filtered.sort((a, b) => {
		return sort === "asc"
			? new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime()
			: new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime();
	});

	listEl.innerHTML = "";
	filtered.forEach((incident) => {
		const div = document.createElement("div");
		div.className = "incident";

		const reportedDate = new Date(incident.reported_at).toLocaleDateString();

		div.innerHTML = `
        <strong>${incident.title}</strong> - ${
			incident.severity
		} - <em>${reportedDate}</em>
        <br/>
        <button data-id="${incident.id}">${
			incident.expanded ? "Hide Details" : "View Details"
		}</button>
        ${incident.expanded ? `<p>${incident.description}</p>` : ""}
      `;

		listEl.appendChild(div);

		div.querySelector("button")!.addEventListener("click", () => {
			incident.expanded = !incident.expanded;
			renderIncidents();
		});
	});
}

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const title = (
		document.getElementById("title") as HTMLInputElement
	).value.trim();
	const desc = (
		document.getElementById("description") as HTMLTextAreaElement
	).value.trim();
	const sev = (document.getElementById("severity") as HTMLSelectElement).value;

	if (!title || !desc || !sev) {
		alert("Please fill in all fields");
		return;
	}

	const newIncident: Incident = {
		id: incidents.length + 1,
		title,
		description: desc,
		severity: sev as Incident["severity"],
		reported_at: new Date().toISOString(),
	};

	incidents.unshift(newIncident);
	form.reset();
	renderIncidents();
});

filterEl.addEventListener("change", renderIncidents);
sortEl.addEventListener("change", renderIncidents);

renderIncidents();
