const incidents = [
  { id: 1, name: "Bay of Bengal Cyclone Cell", region: "South Asia", type: "Cyclone", lat: 17.7, lng: 88.1, severity: 9.1, humidity: 91, exposure: 42, readiness: 58, trend: 12 },
  { id: 2, name: "California Wildfire Corridor", region: "North America", type: "Wildfire", lat: 38.4, lng: -121.5, severity: 7.7, humidity: 24, exposure: 11, readiness: 73, trend: 8 },
  { id: 3, name: "Andes Seismic Watch", region: "South America", type: "Earthquake", lat: -23.6, lng: -68.2, severity: 8.2, humidity: 36, exposure: 6, readiness: 49, trend: 15 },
  { id: 4, name: "Central Europe Flood Basin", region: "Europe", type: "Flood", lat: 50.1, lng: 14.4, severity: 6.8, humidity: 82, exposure: 18, readiness: 67, trend: 6 },
  { id: 5, name: "Horn of Africa Drought Belt", region: "Africa", type: "Drought", lat: 8.9, lng: 40.4, severity: 8.8, humidity: 19, exposure: 35, readiness: 38, trend: 10 },
  { id: 6, name: "Japan Offshore Tsunami Model", region: "East Asia", type: "Tsunami", lat: 38.1, lng: 142.8, severity: 7.4, humidity: 77, exposure: 9, readiness: 82, trend: 4 },
  { id: 7, name: "Queensland Heat-Humidity Stress", region: "Oceania", type: "Heat", lat: -20.9, lng: 145.7, severity: 6.9, humidity: 88, exposure: 4, readiness: 71, trend: 11 },
  { id: 8, name: "Mediterranean Fire-Wind Complex", region: "Europe", type: "Wildfire", lat: 39.6, lng: 21.8, severity: 7.1, humidity: 31, exposure: 8, readiness: 61, trend: 7 },
  { id: 9, name: "Gulf Coast Storm Surge", region: "North America", type: "Flood", lat: 29.2, lng: -90.1, severity: 7.9, humidity: 86, exposure: 16, readiness: 64, trend: 9 },
  { id: 10, name: "Himalayan Glacial Lake Risk", region: "South Asia", type: "Flood", lat: 28.0, lng: 86.8, severity: 8.5, humidity: 74, exposure: 13, readiness: 42, trend: 14 }
];

const scenarioMultipliers = {
  baseline: { severity: 1, humidity: 1, exposure: 1, label: "Baseline systems show distributed risk, with South Asia and East Africa carrying the highest response burden." },
  monsoon: { severity: 1.18, humidity: 1.12, exposure: 1.08, label: "Monsoon escalation increases flood and cyclone load, raising logistics pressure across coastal and mountain regions." },
  heat: { severity: 1.11, humidity: 1.2, exposure: 1.03, label: "Extreme heat surge amplifies heat-index danger where humidity remains above human comfort thresholds." },
  seismic: { severity: 1.16, humidity: 0.98, exposure: 1.04, label: "Seismic cascade prioritizes infrastructure fragility, tsunami readiness, and hospital surge capacity." }
};

const scienceProjects = [
  {
    discipline: "Chemistry",
    level: "Foundation",
    title: "Acid-Base Titration Accuracy Study",
    summary: "Compare indicator-based titration with pH-probe endpoint detection and quantify uncertainty across repeated trials.",
    methods: ["molarity", "pH", "uncertainty", "calibration"]
  },
  {
    discipline: "Chemistry",
    level: "Advanced",
    title: "Electrochemical Corrosion Under Humidity Stress",
    summary: "Measure oxidation rate changes across humidity chambers and connect corrosion potential to disaster infrastructure resilience.",
    methods: ["redox", "electrochemistry", "humidity", "materials"]
  },
  {
    discipline: "Chemistry",
    level: "Research",
    title: "Photocatalytic Water Purification Prototype",
    summary: "Evaluate TiO2 or safe substitute catalysts for dye degradation under controlled light intensity and exposure time.",
    methods: ["kinetics", "spectroscopy", "catalysis", "water"]
  },
  {
    discipline: "Chemistry",
    level: "Advanced",
    title: "Reaction Rate Law Inference",
    summary: "Use concentration-time data to identify zero, first, and second-order reaction behavior through model fitting.",
    methods: ["kinetics", "regression", "half-life", "modeling"]
  },
  {
    discipline: "Chemistry",
    level: "Research",
    title: "Atmospheric Aerosol Chemistry Risk Model",
    summary: "Simulate how particle concentration, humidity, and wind alter pollutant transport during wildfire and urban heat events.",
    methods: ["aerosols", "climate", "simulation", "public health"]
  },
  {
    discipline: "Physics",
    level: "Foundation",
    title: "Projectile Motion and Sensor Error",
    summary: "Launch a safe foam projectile, track range versus angle, and compare measurements with kinematic predictions.",
    methods: ["mechanics", "kinematics", "error analysis", "graphs"]
  },
  {
    discipline: "Physics",
    level: "Advanced",
    title: "Solar Cell Efficiency Under Thermal Load",
    summary: "Measure voltage-current output as panel temperature changes and model energy loss under disaster heat conditions.",
    methods: ["electricity", "energy", "temperature", "renewables"]
  },
  {
    discipline: "Physics",
    level: "Research",
    title: "Seismic Wave Propagation Simulator",
    summary: "Build a spring-mass or computational model showing how wave speed changes across materials and fault conditions.",
    methods: ["waves", "seismology", "simulation", "materials"]
  },
  {
    discipline: "Physics",
    level: "Advanced",
    title: "Wind Tunnel Drag Coefficient Study",
    summary: "Test scaled structures under controlled airflow and calculate drag coefficients for storm-resilient engineering.",
    methods: ["fluid dynamics", "forces", "engineering", "storm risk"]
  },
  {
    discipline: "Physics",
    level: "Research",
    title: "Thermal Camera Urban Heat Island Map",
    summary: "Combine temperature readings, surface materials, and humidity to map heat storage across a school or neighborhood.",
    methods: ["thermodynamics", "mapping", "climate", "sensors"]
  }
];

const calculators = {
  molarity: {
    fields: [["moles", "Moles of solute", 0.25], ["liters", "Liters of solution", 0.5]],
    solve: ({ moles, liters }) => ({ value: moles / liters, unit: "mol/L", formula: "M = n / V" })
  },
  ph: {
    fields: [["h", "Hydrogen ion concentration [H+] mol/L", 0.000001]],
    solve: ({ h }) => ({ value: -Math.log10(h), unit: "pH", formula: "pH = -log10([H+])" })
  },
  gas: {
    fields: [["moles", "Moles n", 1], ["temperature", "Temperature K", 298], ["volume", "Volume L", 22.4]],
    solve: ({ moles, temperature, volume }) => ({ value: (moles * 0.082057 * temperature) / volume, unit: "atm", formula: "P = nRT / V" })
  },
  halflife: {
    fields: [["initial", "Initial amount", 100], ["halflife", "Half-life", 12], ["time", "Elapsed time", 36]],
    solve: ({ initial, halflife, time }) => ({ value: initial * Math.pow(0.5, time / halflife), unit: "remaining amount", formula: "N = N0(1/2)^(t / half-life)" })
  },
  energy: {
    fields: [["mass", "Mass kg", 2], ["velocity", "Velocity m/s", 12]],
    solve: ({ mass, velocity }) => ({ value: 0.5 * mass * velocity * velocity, unit: "J", formula: "KE = 1/2 mv^2" })
  },
  projectile: {
    fields: [["velocity", "Launch velocity m/s", 20], ["angle", "Launch angle degrees", 45]],
    solve: ({ velocity, angle }) => ({ value: (velocity * velocity * Math.sin(2 * angle * Math.PI / 180)) / 9.81, unit: "m", formula: "R = v^2 sin(2theta) / g" })
  },
  ohm: {
    fields: [["current", "Current A", 2], ["resistance", "Resistance ohms", 12]],
    solve: ({ current, resistance }) => ({ value: current * resistance, unit: "V", formula: "V = IR" })
  },
  wave: {
    fields: [["frequency", "Frequency Hz", 440], ["wavelength", "Wavelength m", 0.78]],
    solve: ({ frequency, wavelength }) => ({ value: frequency * wavelength, unit: "m/s", formula: "v = f lambda" })
  }
};

let sessionIncidents = [...incidents];
let map;
let disasterLayer;
let humidityLayer;
let responseLayer;
let hazardChart;
let forecastChart;

const $ = (selector) => document.querySelector(selector);
const fmt = new Intl.NumberFormat("en", { maximumFractionDigits: 1 });

function showFallback(target, message) {
  const element = typeof target === "string" ? $(target) : target;
  if (!element) return;
  const container = element.parentElement || element;
  element.style.display = "none";
  let fallback = container.querySelector(".module-fallback");
  if (!fallback) {
    fallback = document.createElement("div");
    fallback.className = "module-fallback";
    container.appendChild(fallback);
  }
  fallback.textContent = message;
}

function riskScore(incident) {
  return Math.min(100, Math.round(
    incident.severity * 6.2 +
    incident.exposure * 0.62 +
    incident.humidity * 0.18 +
    (100 - incident.readiness) * 0.24 +
    incident.trend * 0.7
  ));
}

function adjustedIncidents() {
  const scenario = $("#scenarioSelect")?.value || "baseline";
  const factor = scenarioMultipliers[scenario];
  return sessionIncidents.map((incident) => ({
    ...incident,
    severity: Math.min(10, incident.severity * factor.severity),
    humidity: Math.min(100, incident.humidity * factor.humidity),
    exposure: incident.exposure * factor.exposure
  }));
}

function groupedByType(data) {
  return data.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});
}

function groupedByRegion(data) {
  return data.reduce((acc, item) => {
    acc[item.region] = acc[item.region] || [];
    acc[item.region].push(item);
    return acc;
  }, {});
}

function updateOverview() {
  const data = adjustedIncidents();
  const scores = data.map(riskScore);
  const averageRisk = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  const exposure = data.reduce((sum, item) => sum + item.exposure, 0);
  const humidityStress = data.filter((item) => item.humidity >= 75).length / data.length * 100;

  $("#globalRisk").textContent = Math.round(averageRisk);
  $("#incidentCount").textContent = data.length;
  $("#populationExposure").textContent = `${fmt.format(exposure)}M`;
  $("#humidityStress").textContent = `${Math.round(humidityStress)}%`;

  renderPriorityList(data);
  renderSummary(data);
  renderHazardChart(data);
  renderForecast(data);
  renderEquationList();
  renderResearchNotes(data);
}

function renderPriorityList(data) {
  const sorted = [...data].sort((a, b) => riskScore(b) - riskScore(a)).slice(0, 6);
  $("#priorityList").innerHTML = sorted.map((item) => `
    <div class="priority-item">
      <strong>${item.name}<span>${riskScore(item)}</span></strong>
      <p>${item.type} | ${item.region} | ${fmt.format(item.exposure)}M exposed | readiness ${Math.round(item.readiness)}%</p>
    </div>
  `).join("");
}

function renderSummary(data) {
  const highest = [...data].sort((a, b) => riskScore(b) - riskScore(a))[0];
  const humid = data.filter((item) => item.humidity > 80).map((item) => item.region);
  const lowReadiness = data.filter((item) => item.readiness < 55).length;
  $("#executiveSummary").textContent =
    `Aegis Atlas detects ${data.length} active multi-hazard systems. The highest ranked incident is ${highest.name} with a composite score of ${riskScore(highest)}. Humidity stress is concentrated in ${[...new Set(humid)].join(", ") || "no dominant region"}, increasing cyclone, flood, and heat-index uncertainty. ${lowReadiness} incidents have readiness below 55%, so the recommended research posture is rapid logistics modeling, shelter capacity checks, and public health surveillance.`;
}

function renderHazardChart(data) {
  if (typeof Chart === "undefined") {
    showFallback("#hazardChart", "Hazard chart needs the Chart.js library. The rest of the dashboard still works.");
    return;
  }
  const groups = groupedByType(data);
  const labels = Object.keys(groups);
  const values = Object.values(groups);
  if (hazardChart) hazardChart.destroy();
  hazardChart = new Chart($("#hazardChart"), {
    type: "doughnut",
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: ["#49c6a2", "#ff6b57", "#d8a548", "#5ca8ff", "#b884ff", "#ff9f6e"],
        borderColor: "#111c19"
      }]
    },
    options: {
      plugins: { legend: { labels: { color: "#edf7f4" } } }
    }
  });
}

function initMap() {
  if (typeof L === "undefined") {
    const mapElement = $("#map");
    mapElement.innerHTML = `
      <div class="map-fallback">
        <strong>Map library unavailable</strong>
        <p>The world map needs the Leaflet library. Login, reports, calculators, simulations, summaries, and research tools still work.</p>
      </div>
    `;
    return;
  }
  map = L.map("map", { zoomControl: true }).setView([18, 18], 2);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 8,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);
  disasterLayer = L.layerGroup().addTo(map);
  humidityLayer = L.layerGroup().addTo(map);
  responseLayer = L.layerGroup().addTo(map);
  renderMapLayers();
}

function renderMapLayers() {
  if (!map) return;
  disasterLayer.clearLayers();
  humidityLayer.clearLayers();
  responseLayer.clearLayers();
  const showDisasters = $("#layerDisasters").checked;
  const showHumidity = $("#layerHumidity").checked;
  const showResponse = $("#layerResponse").checked;
  const threshold = Number($("#severityRange").value);
  const data = adjustedIncidents().filter((item) => item.severity >= threshold);

  data.forEach((item) => {
    const score = riskScore(item);
    const color = score > 82 ? "#ff6b57" : score > 68 ? "#d8a548" : "#49c6a2";
    if (showDisasters) {
      L.circleMarker([item.lat, item.lng], {
        radius: 7 + item.severity,
        fillColor: color,
        color: "#edf7f4",
        weight: 1,
        fillOpacity: 0.82
      }).bindPopup(`<strong>${item.name}</strong><br>${item.type} | ${item.region}<br>Risk score: ${score}<br>Humidity: ${Math.round(item.humidity)}%<br>Readiness: ${item.readiness}%`).addTo(disasterLayer);
    }
    if (showHumidity) {
      L.circle([item.lat, item.lng], {
        radius: item.humidity * 4200,
        color: "#5ca8ff",
        fillColor: "#5ca8ff",
        fillOpacity: Math.min(0.25, item.humidity / 430),
        weight: 1
      }).addTo(humidityLayer);
    }
    if (showResponse) {
      L.circle([item.lat, item.lng], {
        radius: (105 - item.readiness) * 3300,
        color: "#d8a548",
        fillColor: "#d8a548",
        fillOpacity: 0.12,
        dashArray: "5 7",
        weight: 1
      }).addTo(responseLayer);
    }
  });
  const factor = scenarioMultipliers[$("#scenarioSelect").value];
  $("#mapInsight").textContent = `${factor.label} Showing ${data.length} incidents at severity ${threshold}+ with layered disaster, humidity, and response pressure fields.`;
}

function populateRegions() {
  const regions = Object.keys(groupedByRegion(incidents)).sort();
  $("#regionSelect").innerHTML = [
    `<option value="Global">Global</option>`,
    ...regions.map((region) => `<option value="${region}">${region}</option>`)
  ].join("");
}

function generateReport() {
  const region = $("#regionSelect").value;
  const type = $("#reportType").value;
  const data = adjustedIncidents().filter((item) => region === "Global" || item.region === region);
  const sorted = [...data].sort((a, b) => riskScore(b) - riskScore(a));
  const avgRisk = sorted.reduce((sum, item) => sum + riskScore(item), 0) / sorted.length;
  const top = sorted[0];
  const report = [
    `AEGIS ATLAS ${type.toUpperCase()} REPORT`,
    `Founder: Viren Singh`,
    `Scope: ${region}`,
    `Generated: ${new Date().toLocaleString()}`,
    ``,
    `1. Executive Signal`,
    `${region} currently contains ${sorted.length} tracked incident models with an average risk score of ${Math.round(avgRisk)}. The leading concern is ${top.name}, a ${top.type.toLowerCase()} scenario with ${fmt.format(top.exposure)}M estimated population exposure and ${Math.round(top.humidity)}% humidity pressure.`,
    ``,
    `2. Highest Priority Incidents`,
    ...sorted.slice(0, 5).map((item, index) => `${index + 1}. ${item.name}: score ${riskScore(item)}, severity ${fmt.format(item.severity)}/10, readiness ${item.readiness}%, trend +${item.trend}.`),
    ``,
    `3. Research Interpretation`,
    `The model weights hazard severity, population exposure, humidity amplification, readiness gaps, and short-term trend acceleration. This is a decision-support simulation designed for research, planning, education, and GitHub deployment, not a replacement for official emergency alerts.`,
    ``,
    `4. Recommended Action`,
    `Prioritize field verification, shelter and hospital capacity checks, public communication, satellite/radar validation, and logistics routing for incidents scoring above 75.`
  ].join("\n");
  $("#reportOutput").textContent = report;
  $("#reportTimestamp").textContent = new Date().toLocaleTimeString();
}

function downloadReport() {
  const text = $("#reportOutput").textContent.trim() || "Generate a report first.";
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "aegis-atlas-report.txt";
  link.click();
  URL.revokeObjectURL(url);
}

function renderEquationList() {
  const equations = [
    ["Composite Risk", "severity x 6.2 + exposure x 0.62 + humidity x 0.18 + readiness gap x 0.24 + trend x 0.7"],
    ["Humidity Amplifier", "flags regions above 75% humidity where heat, flood, and storm impacts can compound"],
    ["Readiness Gap", "100 - readiness, used to estimate response friction and operational burden"],
    ["Forecast Drift", "72-hour curve increases according to incident trend and scenario multipliers"]
  ];
  $("#equationList").innerHTML = equations.map(([title, body]) => `
    <div class="equation-item"><strong>${title}</strong><p>${body}</p></div>
  `).join("");
}

function renderForecast(data) {
  if (typeof Chart === "undefined") {
    showFallback("#forecastChart", "Forecast chart needs the Chart.js library. Model equations and research notes are still available.");
    return;
  }
  const hours = ["Now", "12h", "24h", "36h", "48h", "60h", "72h"];
  const base = data.reduce((sum, item) => sum + riskScore(item), 0) / data.length;
  const trend = data.reduce((sum, item) => sum + item.trend, 0) / data.length;
  const values = hours.map((_, index) => Math.min(100, Math.round(base + trend * index * 0.42)));
  if (forecastChart) forecastChart.destroy();
  forecastChart = new Chart($("#forecastChart"), {
    type: "line",
    data: {
      labels: hours,
      datasets: [{
        label: "Risk trajectory",
        data: values,
        borderColor: "#49c6a2",
        backgroundColor: "rgba(73, 198, 162, 0.16)",
        fill: true,
        tension: 0.35
      }]
    },
    options: {
      scales: {
        x: { ticks: { color: "#9fb8b0" }, grid: { color: "#29433d" } },
        y: { min: 0, max: 100, ticks: { color: "#9fb8b0" }, grid: { color: "#29433d" } }
      },
      plugins: { legend: { labels: { color: "#edf7f4" } } }
    }
  });
}

function renderResearchNotes(data) {
  const notes = [
    ["Data architecture", `${data.length} incident vectors are normalized into a common hazard schema for map, chart, forecast, and report modules.`],
    ["Operational posture", "The system emphasizes explainable scoring so researchers can audit why an incident is ranked above another."],
    ["Deployment mode", "The project runs as a static GitHub Pages app with no server dependency, while still preserving login state locally."],
    ["Ethics note", "All outputs are simulations for research and planning. Official emergency agencies remain the source of truth for real-world alerts."]
  ];
  $("#researchNotes").innerHTML = notes.map(([title, body]) => `
    <div class="note-item"><strong>${title}</strong><p>${body}</p></div>
  `).join("");
}

function renderProjectLibrary() {
  const discipline = $("#disciplineFilter").value;
  const level = $("#levelFilter").value;
  const projects = scienceProjects.filter((project) => {
    const disciplineMatch = discipline === "All" || project.discipline === discipline;
    const levelMatch = level === "All" || project.level === level;
    return disciplineMatch && levelMatch;
  });
  $("#projectLibrary").innerHTML = projects.map((project) => `
    <div class="project-item">
      <strong>${project.title}<span>${project.discipline}</span></strong>
      <p>${project.summary}</p>
      <div class="tag-list">${project.methods.map((method) => `<span>${method}</span>`).join("")}</div>
    </div>
  `).join("");
}

function renderCalculatorInputs() {
  const key = $("#calculatorSelect").value;
  const calculator = calculators[key];
  $("#calculatorInputs").innerHTML = calculator.fields.map(([id, label, value]) => `
    <label>
      ${label}
      <input data-calc-field="${id}" type="number" step="any" value="${value}" />
    </label>
  `).join("");
  $("#calculatorResult").textContent = `Ready: ${calculator.solve(Object.fromEntries(calculator.fields.map(([id, , value]) => [id, value]))).formula}`;
}

function runCalculation() {
  const key = $("#calculatorSelect").value;
  const calculator = calculators[key];
  const values = {};
  document.querySelectorAll("[data-calc-field]").forEach((input) => {
    values[input.dataset.calcField] = Number(input.value);
  });
  if (Object.values(values).some((value) => Number.isNaN(value))) {
    $("#calculatorResult").textContent = "Enter valid numeric values before calculating.";
    return;
  }
  const result = calculator.solve(values);
  $("#calculatorResult").innerHTML = `<strong>${result.formula}</strong><br>Result: ${fmt.format(result.value)} ${result.unit}`;
}

function generateScienceBrief() {
  const topic = $("#briefTopic").value.trim() || "Untitled research topic";
  const mode = $("#briefMode").value;
  const related = scienceProjects
    .filter((project) => topic.toLowerCase().split(" ").some((word) => project.summary.toLowerCase().includes(word)))
    .slice(0, 3);
  const methods = related.length ? [...new Set(related.flatMap((project) => project.methods))] : ["hypothesis design", "controlled variables", "measurement", "error analysis"];
  const brief = [
    `AEGIS ATLAS SCIENCE FORGE BRIEF`,
    `Founder: Viren Singh`,
    `Topic: ${topic}`,
    `Mode: ${mode}`,
    ``,
    `1. Research Question`,
    `How can ${topic.toLowerCase()} be measured, modeled, and improved using disciplined chemistry and physics methods?`,
    ``,
    `2. Hypothesis`,
    `If the controlling variables are isolated and measured repeatedly, the system will show a predictable relationship that can be modeled with an equation or simulation.`,
    ``,
    `3. Core Method`,
    `Use a ${mode} design with baseline measurements, controlled variable changes, repeated trials, and a comparison between observed results and theoretical prediction.`,
    ``,
    `4. Variables`,
    `Independent variable: the factor deliberately changed.`,
    `Dependent variable: the measured response.`,
    `Controlled variables: temperature, humidity, material, timing, instrument calibration, and sample size where relevant.`,
    ``,
    `5. Tools And Data`,
    `Recommended methods: ${methods.join(", ")}.`,
    `Record raw observations, calculated values, uncertainty ranges, graphs, and a final interpretation.`,
    ``,
    `6. Safety And Ethics`,
    `Use low-risk classroom-safe materials, protective eyewear when appropriate, adult supervision for heat/electricity/chemicals, and no dangerous reactions or uncontrolled field exposure.`,
    ``,
    `7. Output`,
    `Deliver a research poster, dataset, graph set, short technical paper, and a reproducible protocol.`
  ].join("\n");
  $("#briefOutput").textContent = brief;
}

function runSimulation() {
  sessionIncidents = sessionIncidents.map((item) => ({
    ...item,
    severity: Math.min(10, Math.max(1, item.severity + (Math.random() - 0.35) * 0.8)),
    humidity: Math.min(98, Math.max(12, item.humidity + (Math.random() - 0.45) * 9)),
    readiness: Math.min(95, Math.max(25, item.readiness + (Math.random() - 0.5) * 8)),
    trend: Math.min(18, Math.max(1, item.trend + (Math.random() - 0.4) * 4))
  }));
  updateOverview();
  renderMapLayers();
}

function exportData() {
  const payload = {
    project: "Aegis Atlas",
    founder: "Viren Singh",
    generatedAt: new Date().toISOString(),
    incidents: adjustedIncidents().map((item) => ({ ...item, riskScore: riskScore(item) }))
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "aegis-atlas-data.json";
  link.click();
  URL.revokeObjectURL(url);
}

function showApp(email) {
  $("#authScreen").classList.add("hidden");
  $("#appShell").classList.remove("hidden");
  $("#userEmail").textContent = email;
  $("#userInitial").textContent = email.slice(0, 1).toUpperCase();
  populateRegions();
  updateOverview();
  renderProjectLibrary();
  renderCalculatorInputs();
  generateScienceBrief();
  if (!map) setTimeout(initMap, 80);
}

function bindEvents() {
  $("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = $("#emailInput").value.trim();
    const password = $("#passwordInput").value;
    if (password.length < 6) {
      alert("Access key must be at least 6 characters.");
      return;
    }
    localStorage.setItem("aegisAtlasUser", email);
    showApp(email);
  });

  $("#logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("aegisAtlasUser");
    location.reload();
  });

  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".nav-btn").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
      button.classList.add("active");
      $(`#${button.dataset.view}View`).classList.add("active");
      $("#viewTitle").textContent = button.textContent;
      if (button.dataset.view === "map" && map) setTimeout(() => map.invalidateSize(), 80);
    });
  });

  ["layerDisasters", "layerHumidity", "layerResponse", "severityRange", "scenarioSelect"].forEach((id) => {
    $(`#${id}`).addEventListener("input", () => {
      updateOverview();
      renderMapLayers();
    });
  });

  $("#simulateBtn").addEventListener("click", runSimulation);
  $("#exportBtn").addEventListener("click", exportData);
  $("#generateReportBtn").addEventListener("click", generateReport);
  $("#downloadReportBtn").addEventListener("click", downloadReport);
  $("#disciplineFilter").addEventListener("input", renderProjectLibrary);
  $("#levelFilter").addEventListener("input", renderProjectLibrary);
  $("#calculatorSelect").addEventListener("input", renderCalculatorInputs);
  $("#calculateBtn").addEventListener("click", runCalculation);
  $("#generateBriefBtn").addEventListener("click", generateScienceBrief);
}

bindEvents();
const storedUser = localStorage.getItem("aegisAtlasUser");
if (storedUser) showApp(storedUser);
