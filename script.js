var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var incidents = [
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
var listEl = document.getElementById("incidentList");
var filterEl = document.getElementById("severityFilter");
var sortEl = document.getElementById("sortOrder");
var form = document.getElementById("reportForm");
function renderIncidents() {
    var filter = filterEl.value;
    var sort = sortEl.value;
    var filtered = __spreadArray([], incidents, true);
    if (filter !== "All") {
        filtered = filtered.filter(function (i) { return i.severity === filter; });
    }
    filtered.sort(function (a, b) {
        return sort === "asc"
            ? new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime()
            : new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime();
    });
    listEl.innerHTML = "";
    filtered.forEach(function (incident) {
        var div = document.createElement("div");
        div.className = "incident";
        var reportedDate = new Date(incident.reported_at).toLocaleDateString();
        div.innerHTML = "\n        <strong>".concat(incident.title, "</strong> - ").concat(incident.severity, " - <em>").concat(reportedDate, "</em>\n        <br/>\n        <button data-id=\"").concat(incident.id, "\">").concat(incident.expanded ? "Hide Details" : "View Details", "</button>\n        ").concat(incident.expanded ? "<p>".concat(incident.description, "</p>") : "", "\n      ");
        listEl.appendChild(div);
        div.querySelector("button").addEventListener("click", function () {
            incident.expanded = !incident.expanded;
            renderIncidents();
        });
    });
}
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var title = document.getElementById("title").value.trim();
    var desc = document.getElementById("description").value.trim();
    var sev = document.getElementById("severity").value;
    if (!title || !desc || !sev) {
        alert("Please fill in all fields");
        return;
    }
    var newIncident = {
        id: incidents.length + 1,
        title: title,
        description: desc,
        severity: sev,
        reported_at: new Date().toISOString(),
    };
    incidents.unshift(newIncident);
    form.reset();
    renderIncidents();
});
filterEl.addEventListener("change", renderIncidents);
sortEl.addEventListener("change", renderIncidents);
renderIncidents();
