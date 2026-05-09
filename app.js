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

const modelCatalog = [
  { id: "thomson", name: "Thomson Plum Pudding Model", domain: "Atomic", depth: "Foundational", renderer: "atom", summary: "Electrons embedded inside diffuse positive matter; useful historically for showing why later scattering evidence mattered.", equation: "net atom neutral: positive matrix + electrons" },
  { id: "rutherford", name: "Rutherford Nuclear Model", domain: "Atomic", depth: "Foundational", renderer: "atom", summary: "Tiny dense positive nucleus with mostly empty space, inferred from alpha-particle scattering.", equation: "large deflection implies concentrated charge" },
  { id: "bohr", name: "Bohr Quantized Orbit Model", domain: "Atomic", depth: "Foundational", renderer: "atom", summary: "Electrons occupy quantized shells and emit or absorb photons during transitions.", equation: "En = -13.6 eV / n^2" },
  { id: "quantum-cloud", name: "Quantum Mechanical Electron Cloud", domain: "Atomic", depth: "Advanced", renderer: "cloud", summary: "Electrons are represented by probability orbitals rather than fixed planetary paths.", equation: "Schrodinger wavefunction psi gives probability density |psi|^2" },
  { id: "orbital-spdf", name: "s, p, d, f Orbital Model", domain: "Chemistry", depth: "Advanced", renderer: "cloud", summary: "Atomic orbitals describe electron probability geometry used for bonding and spectroscopy.", equation: "quantum numbers n, l, m, s" },
  { id: "lewis", name: "Lewis Dot Bonding Model", domain: "Chemistry", depth: "Foundational", renderer: "molecule", summary: "Valence electrons are shown as dots to reason about covalent bonds, lone pairs, and octets.", equation: "octet rule: stable valence shell tendency" },
  { id: "vsepr", name: "VSEPR Molecular Geometry", domain: "Chemistry", depth: "Foundational", renderer: "molecule", summary: "Electron domains repel and determine molecular shapes such as linear, trigonal, tetrahedral, and bent.", equation: "geometry from electron-domain minimization" },
  { id: "hybridization", name: "Hybrid Orbital Model", domain: "Chemistry", depth: "Advanced", renderer: "molecule", summary: "Atomic orbitals combine into sp, sp2, sp3 and related hybrids to explain molecular geometry.", equation: "linear combination of atomic orbitals" },
  { id: "mo", name: "Molecular Orbital Theory", domain: "Chemistry", depth: "Research", renderer: "cloud", summary: "Electrons occupy delocalized molecular orbitals across atoms, explaining magnetism and bond order.", equation: "bond order = (bonding - antibonding) / 2" },
  { id: "crystal", name: "Crystal Lattice Model", domain: "Chemistry", depth: "Advanced", renderer: "lattice", summary: "Repeating 3D unit cells model ionic, metallic, and covalent network solids.", equation: "unit cell symmetry + lattice parameters" },
  { id: "kinetic-gas", name: "Kinetic Molecular Theory", domain: "Chemistry", depth: "Foundational", renderer: "particles", summary: "Gas particles move randomly; pressure comes from collisions with container walls.", equation: "PV = nRT and KEavg proportional to T" },
  { id: "collision", name: "Collision Theory", domain: "Chemistry", depth: "Foundational", renderer: "particles", summary: "Reaction rate depends on collision frequency, orientation, and activation energy.", equation: "rate proportional to successful collisions" },
  { id: "arrhenius", name: "Arrhenius Rate Model", domain: "Chemistry", depth: "Advanced", renderer: "barrier", summary: "Temperature changes reaction rate through the activation-energy barrier.", equation: "k = A e^(-Ea/RT)" },
  { id: "equilibrium", name: "Chemical Equilibrium Model", domain: "Chemistry", depth: "Advanced", renderer: "balance", summary: "Forward and reverse processes reach dynamic balance; disturbances shift the system.", equation: "K = products / reactants" },
  { id: "acid-base", name: "Bronsted-Lowry Acid-Base Model", domain: "Chemistry", depth: "Foundational", renderer: "molecule", summary: "Acids donate protons and bases accept protons, extending beyond simple water solutions.", equation: "acid -> H+ donor, base -> H+ acceptor" },
  { id: "redox", name: "Redox Electron Transfer Model", domain: "Chemistry", depth: "Advanced", renderer: "field", summary: "Oxidation and reduction transfer electrons, driving batteries, corrosion, and electrolysis.", equation: "oxidation loses electrons, reduction gains electrons" },
  { id: "thermo-chem", name: "Chemical Thermodynamics", domain: "Chemistry", depth: "Advanced", renderer: "barrier", summary: "Energy, entropy, and free energy predict whether reactions are favorable.", equation: "Delta G = Delta H - T Delta S" },
  { id: "newton", name: "Newtonian Mechanics", domain: "Physics", depth: "Foundational", renderer: "orbit", summary: "Forces change motion and explain projectiles, orbits, machines, and structural loads.", equation: "F = ma" },
  { id: "gravity", name: "Universal Gravitation", domain: "Physics", depth: "Foundational", renderer: "orbit", summary: "Masses attract with inverse-square force, modeling planets, satellites, and tides.", equation: "F = Gm1m2/r^2" },
  { id: "energy", name: "Conservation Of Energy", domain: "Physics", depth: "Foundational", renderer: "barrier", summary: "Energy transforms between kinetic, potential, thermal, electrical, and chemical forms.", equation: "Etotal = constant in isolated system" },
  { id: "wave", name: "Mechanical Wave Model", domain: "Physics", depth: "Foundational", renderer: "wave", summary: "Disturbances carry energy through a medium, explaining sound, water waves, and seismic waves.", equation: "v = f lambda" },
  { id: "optics", name: "Ray And Wave Optics", domain: "Physics", depth: "Advanced", renderer: "wave", summary: "Light reflects, refracts, interferes, and diffracts; both ray and wave models are useful.", equation: "n1 sin(theta1) = n2 sin(theta2)" },
  { id: "electric-field", name: "Electric Field Model", domain: "Physics", depth: "Foundational", renderer: "field", summary: "Charges create fields that exert forces on other charges.", equation: "E = F/q and E = kQ/r^2" },
  { id: "magnetic-field", name: "Magnetic Field Model", domain: "Physics", depth: "Advanced", renderer: "field", summary: "Moving charges and magnets create magnetic fields that exert forces on currents and charges.", equation: "F = qv x B" },
  { id: "maxwell", name: "Maxwell Electromagnetic Field Model", domain: "Physics", depth: "Research", renderer: "field", summary: "Electric and magnetic fields form a unified system that propagates as electromagnetic waves.", equation: "c = 1 / sqrt(mu0 epsilon0)" },
  { id: "circuit", name: "Circuit Network Model", domain: "Engineering", depth: "Foundational", renderer: "circuit", summary: "Voltage, current, and resistance networks model electronics, sensors, and power systems.", equation: "V = IR, Kirchhoff laws" },
  { id: "semiconductor", name: "Semiconductor Band Model", domain: "Engineering", depth: "Research", renderer: "barrier", summary: "Band gaps, carriers, and junctions explain diodes, transistors, solar cells, and sensors.", equation: "conductivity from carrier density and mobility" },
  { id: "relativity", name: "Special Relativity", domain: "Physics", depth: "Advanced", renderer: "space", summary: "Space and time depend on observer motion; energy and mass are related.", equation: "E = mc^2 and gamma = 1/sqrt(1-v^2/c^2)" },
  { id: "quantum", name: "Quantum Superposition Model", domain: "Physics", depth: "Research", renderer: "cloud", summary: "Systems can occupy superposed states and produce probabilistic measurement outcomes.", equation: "state = sum ci |i>" },
  { id: "nuclear", name: "Nuclear Shell And Decay Model", domain: "Physics", depth: "Advanced", renderer: "atom", summary: "Nucleons occupy energy levels and unstable nuclei decay by alpha, beta, or gamma processes.", equation: "N = N0 e^(-lambda t)" },
  { id: "fluid", name: "Fluid Dynamics Model", domain: "Engineering", depth: "Advanced", renderer: "flow", summary: "Pressure, velocity, viscosity, and turbulence model air, water, storms, and pipes.", equation: "continuity and Bernoulli approximations" },
  { id: "heat-transfer", name: "Heat Transfer Model", domain: "Engineering", depth: "Advanced", renderer: "flow", summary: "Conduction, convection, and radiation move thermal energy across systems.", equation: "q = -k grad T" }
];

const cyberDataset = [
  { id: "PH-001", type: "phishing-url", label: "synthetic credential lure", text: "login portal clone uses urgent invoice language, lookalike domain, password capture form, and rapid redirect", anomaly: 86, confidence: 91 },
  { id: "PH-002", type: "phishing-url", label: "synthetic OAuth consent lure", text: "fake app consent requests mailbox scope and persistence through refresh token", anomaly: 78, confidence: 84 },
  { id: "MW-101", type: "malware-log", label: "fictional loader behavior", text: "process spawns script interpreter, writes scheduled task, contacts command node, scans local subnet", anomaly: 92, confidence: 88 },
  { id: "MW-102", type: "malware-log", label: "fictional lateral movement", text: "credential reuse against file share, remote service creation, privilege escalation attempt, archive staging", anomaly: 95, confidence: 90 },
  { id: "AI-201", type: "attack-simulation", label: "AI generated breach chain", text: "initial access through phishing, identity compromise, data discovery, staged exfiltration, autonomous defense response", anomaly: 89, confidence: 87 },
  { id: "MI-301", type: "misinformation-graph", label: "synthetic influence operation", text: "seed accounts amplify false disaster claim through bot-like clusters and cross-platform repost timing", anomaly: 82, confidence: 80 },
  { id: "DF-401", type: "defense-memory", label: "lockdown playbook", text: "isolate identity provider, revoke risky sessions, quarantine endpoint group, preserve logs, publish verified advisory", anomaly: 71, confidence: 93 },
  { id: "RS-501", type: "research-note", label: "benchmark protocol", text: "compare agent response latency, anomaly precision, retrieval relevance, false positive rate, and lockdown coverage", anomaly: 64, confidence: 89 }
];

const researchPapers = [
  { title: "Aegis Atlas Whitepaper", kind: "PDF-ready", summary: "Methodology for static-hosted multi-agent cyber intelligence fusion with synthetic datasets." },
  { title: "Experiment 01: Retrieval Relevance", kind: "Benchmark", summary: "Measures whether embedding search retrieves matching threat evidence and response memory." },
  { title: "Experiment 02: Autonomous Defense Simulation", kind: "Simulation", summary: "Tests fictional containment decisions under different attack pressure settings." },
  { title: "Experiment 03: Misinformation Graph Propagation", kind: "Graph Study", summary: "Models how synthetic influence nodes amplify disaster misinformation." }
];

const cyberAgents = {
  investigator: { name: "Investigator Agent", memory: [], goal: "timeline reconstruction and evidence linking" },
  analyst: { name: "Analyst Agent", memory: [], goal: "confidence, anomaly, and impact scoring" },
  threat: { name: "Threat Agent", memory: [], goal: "fictional adversary chain simulation" },
  research: { name: "Research Agent", memory: [], goal: "retrieval, methodology, and benchmark synthesis" }
};

const cyberScenarios = {
  phishing: ["Lookalike login portal observed", "Credential capture event simulated", "Impossible travel identity signal", "Investigator links mailbox rule change", "Analyst recommends token revocation"],
  malware: ["Suspicious process tree generated", "Scheduled task persistence simulated", "Subnet scan reaches finance node", "Threat Agent predicts lateral movement", "Defense isolates endpoint ring"],
  misinfo: ["Seed account posts false claim", "Bot cluster amplification begins", "Graph centrality spike detected", "Research Agent retrieves influence benchmark", "Verified advisory reduces spread"],
  fusion: ["Multi-source anomaly fusion begins", "Agents negotiate response priority", "Neural-symbolic rule flags breach path", "Autonomous defense locks critical segment", "Whitepaper benchmark updated"]
};

let sessionIncidents = [...incidents];
let map;
let disasterLayer;
let humidityLayer;
let responseLayer;
let hazardChart;
let forecastChart;
let modelFrame;
let modelPaused = false;
let modelTime = 0;
let cyberFrame;
let cyberTime = 0;
let attackStep = 0;
let lockdownActive = false;
let activeAgent = "investigator";

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
  renderIntelligenceCore(data);
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

function calculateAnomalies(data) {
  const scores = data.map(riskScore);
  const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
  const deviation = Math.sqrt(variance) || 1;
  return data.map((item) => {
    const score = riskScore(item);
    const z = (score - mean) / deviation;
    const reasons = [];
    if (item.humidity >= 85) reasons.push("extreme humidity amplifier");
    if (item.readiness <= 50) reasons.push("low readiness");
    if (item.trend >= 12) reasons.push("fast 72h growth");
    if (item.exposure >= 25) reasons.push("large population exposure");
    return { item, score, z, reasons };
  }).filter((entry) => entry.z > 0.55 || entry.reasons.length >= 2)
    .sort((a, b) => b.score - a.score);
}

function buildRecommendations(data) {
  const top = [...data].sort((a, b) => riskScore(b) - riskScore(a)).slice(0, 4);
  return top.map((item) => {
    const score = riskScore(item);
    const confidence = Math.min(96, Math.round(52 + item.severity * 3 + item.trend * 1.2 + item.exposure * 0.25));
    let action = "Maintain monitoring, verify local reports, and refresh exposure estimates.";
    if (item.type === "Flood" || item.type === "Cyclone") action = "Pre-position water rescue, shelters, sanitation, and road-access intelligence.";
    if (item.type === "Wildfire") action = "Prioritize evacuation corridors, air-quality monitoring, fuel maps, and power grid checks.";
    if (item.type === "Earthquake" || item.type === "Tsunami") action = "Audit hospitals, bridges, ports, communications, and rapid search-and-rescue staging.";
    if (item.type === "Drought" || item.type === "Heat") action = "Model water demand, crop stress, cooling centers, and public-health outreach.";
    return { item, score, confidence, action };
  });
}

function answerAnalystQuery(query, data) {
  const normalized = query.toLowerCase();
  let working = data;
  const regions = [...new Set(data.map((item) => item.region))];
  const regionMatch = regions.find((region) => normalized.includes(region.toLowerCase()));
  if (regionMatch) working = working.filter((item) => item.region === regionMatch);
  const typeMatch = [...new Set(data.map((item) => item.type))].find((type) => normalized.includes(type.toLowerCase()));
  if (typeMatch) working = working.filter((item) => item.type === typeMatch);
  if (!working.length) return "No matching incident vectors found for that query.";

  const sorted = [...working].sort((a, b) => riskScore(b) - riskScore(a));
  const avgRisk = sorted.reduce((sum, item) => sum + riskScore(item), 0) / sorted.length;
  const exposure = sorted.reduce((sum, item) => sum + item.exposure, 0);
  const humidCount = sorted.filter((item) => item.humidity >= 75).length;

  if (normalized.includes("humidity")) {
    const humiditySorted = [...working].sort((a, b) => b.humidity - a.humidity);
    return `Humidity analysis: ${humiditySorted[0].name} is highest at ${Math.round(humiditySorted[0].humidity)}%. ${humidCount}/${working.length} matching incidents are above 75%, so flood, heat-index, corrosion, and disease-vector risk should be reviewed.`;
  }
  if (normalized.includes("why") || normalized.includes("first") || normalized.includes("priority")) {
    const top = sorted[0];
    return `Priority result: ${top.name} comes first with score ${riskScore(top)} because severity is ${fmt.format(top.severity)}/10, exposure is ${fmt.format(top.exposure)}M, readiness is ${Math.round(top.readiness)}%, humidity is ${Math.round(top.humidity)}%, and trend is +${fmt.format(top.trend)}.`;
  }
  if (normalized.includes("cluster")) {
    const cluster = buildRiskClusters(working)[0];
    return `Cluster result: ${cluster.region} is the strongest cluster with average risk ${cluster.score} across ${cluster.items.length} incident vectors.`;
  }
  return `Analyst result: ${working.length} matching vectors, average risk ${Math.round(avgRisk)}, exposed population ${fmt.format(exposure)}M, humidity-stressed vectors ${humidCount}. Highest concern: ${sorted[0].name} (${riskScore(sorted[0])}).`;
}

function renderIntelligenceCore(data) {
  const anomalies = calculateAnomalies(data).slice(0, 4);
  $("#anomalyPanel").innerHTML = `
    <div class="intel-item"><strong>Anomaly Detector</strong><p>${anomalies.length} outlier vectors found by z-score, readiness, humidity, exposure, and trend rules.</p></div>
    ${anomalies.map((entry) => `
      <div class="intel-item">
        <strong>${entry.item.name}</strong>
        <p>Score ${entry.score} | z ${fmt.format(entry.z)} | ${entry.reasons.join(", ") || "statistical outlier"}</p>
      </div>
    `).join("")}
  `;

  $("#recommendationPanel").innerHTML = `
    <div class="intel-item"><strong>Action Engine</strong><p>Recommendations are generated from hazard type, score, exposure, trend, and readiness gap.</p></div>
    ${buildRecommendations(data).map((rec) => `
      <div class="intel-item">
        <strong>${rec.item.region}: ${rec.score}</strong>
        <p>${rec.action}</p>
        <div class="confidence-bar"><span style="width: ${rec.confidence}%"></span></div>
      </div>
    `).join("")}
  `;
  $("#analystAnswer").textContent = answerAnalystQuery($("#analystQuery").value, data);
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
  map = { engine: "aegis-svg" };
  renderMapLayers();
}

function projectPoint(lat, lng, width = 1000, height = 560) {
  return {
    x: ((lng + 180) / 360) * width,
    y: ((90 - lat) / 180) * height
  };
}

function polygonPoints(shape) {
  const points = [];
  for (let index = 0; index < shape.length; index += 2) {
    points.push(`${shape[index]},${shape[index + 1]}`);
  }
  return points.join(" ");
}

function buildRiskClusters(data) {
  const regions = groupedByRegion(data);
  return Object.entries(regions).map(([region, items]) => {
    const weight = items.reduce((sum, item) => sum + riskScore(item), 0);
    const lat = items.reduce((sum, item) => sum + item.lat * riskScore(item), 0) / weight;
    const lng = items.reduce((sum, item) => sum + item.lng * riskScore(item), 0) / weight;
    const score = Math.round(weight / items.length);
    return { region, items, lat, lng, score };
  }).sort((a, b) => b.score - a.score);
}

function renderMapLayers() {
  if (!map) return;
  const showDisasters = $("#layerDisasters").checked;
  const showHumidity = $("#layerHumidity").checked;
  const showResponse = $("#layerResponse").checked;
  const showClusters = $("#layerClusters").checked;
  const threshold = Number($("#severityRange").value);
  const data = adjustedIncidents().filter((item) => item.severity >= threshold);
  const clusters = buildRiskClusters(data);
  const land = [
    [70, 95, 210, 105, 245, 185, 185, 230, 72, 205],
    [215, 235, 315, 245, 345, 360, 292, 482, 230, 396],
    [420, 118, 548, 105, 610, 166, 575, 248, 438, 235],
    [500, 246, 640, 250, 693, 355, 604, 410, 505, 340],
    [640, 142, 818, 120, 906, 210, 852, 310, 682, 276],
    [772, 328, 900, 350, 938, 445, 826, 492, 744, 420],
    [290, 82, 395, 82, 420, 132, 322, 150]
  ];

  const humidityFields = data.map((item) => {
    const point = projectPoint(item.lat, item.lng);
    return `<circle cx="${point.x}" cy="${point.y}" r="${Math.max(24, item.humidity * 0.9)}" fill="#5ca8ff" opacity="${Math.min(0.26, item.humidity / 360)}" />`;
  }).join("");

  const responseFields = data.map((item) => {
    const point = projectPoint(item.lat, item.lng);
    return `<circle cx="${point.x}" cy="${point.y}" r="${Math.max(18, (105 - item.readiness) * 0.72)}" fill="none" stroke="#d8a548" stroke-width="2" stroke-dasharray="5 7" opacity="0.65" />`;
  }).join("");

  const clusterFields = clusters.map((cluster) => {
    const point = projectPoint(cluster.lat, cluster.lng);
    return `
      <circle cx="${point.x}" cy="${point.y}" r="${18 + cluster.items.length * 7}" fill="#ff6b57" opacity="0.16" stroke="#ff6b57" stroke-width="1.5" />
      <text x="${point.x + 14}" y="${point.y - 14}" fill="#edf7f4" font-size="13">${cluster.region} ${cluster.score}</text>
    `;
  }).join("");

  const markers = data.map((item) => {
    const score = riskScore(item);
    const color = score > 82 ? "#ff6b57" : score > 68 ? "#d8a548" : "#49c6a2";
    const point = projectPoint(item.lat, item.lng);
    return `
      <g class="map-node" data-name="${item.name}" data-type="${item.type}" data-region="${item.region}" data-score="${score}" data-humidity="${Math.round(item.humidity)}" data-readiness="${Math.round(item.readiness)}">
        <circle cx="${point.x}" cy="${point.y}" r="${7 + item.severity}" fill="${color}" stroke="#edf7f4" stroke-width="1.2" opacity="0.9" />
        <text x="${point.x + 13}" y="${point.y + 4}" fill="#edf7f4" font-size="12">${score}</text>
      </g>
    `;
  }).join("");

  $("#map").innerHTML = `
    <svg class="atlas-map" viewBox="0 0 1000 560" role="img" aria-label="Aegis Atlas computed world risk map">
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#29433d" stroke-width="0.7" opacity="0.45" />
        </pattern>
      </defs>
      <rect width="1000" height="560" fill="url(#grid)" />
      ${land.map((shape) => `<polygon points="${polygonPoints(shape)}" fill="#172622" stroke="#365b52" stroke-width="1.4" />`).join("")}
      ${showHumidity ? humidityFields : ""}
      ${showResponse ? responseFields : ""}
      ${showClusters ? clusterFields : ""}
      ${showDisasters ? markers : ""}
      <text x="24" y="38" fill="#49c6a2" font-size="18" font-weight="800">AEGIS ATLAS OFFLINE RISK PROJECTION</text>
      <text x="24" y="62" fill="#9fb8b0" font-size="12">Equirectangular model | computed locally | no external map tiles</text>
    </svg>
    <div id="mapTooltip" class="map-tooltip hidden"></div>
  `;
  bindMapTooltips();
  const factor = scenarioMultipliers[$("#scenarioSelect").value];
  const topCluster = clusters[0];
  $("#mapInsight").textContent = `${factor.label} Showing ${data.length} incidents at severity ${threshold}+ with computed humidity fields, response gaps, and ${clusters.length} regional risk clusters. Strongest cluster: ${topCluster ? `${topCluster.region} (${topCluster.score})` : "none"}.`;
}

function bindMapTooltips() {
  const tooltip = $("#mapTooltip");
  document.querySelectorAll(".map-node").forEach((node) => {
    node.addEventListener("mousemove", (event) => {
      tooltip.classList.remove("hidden");
      tooltip.style.left = `${event.offsetX + 18}px`;
      tooltip.style.top = `${event.offsetY + 18}px`;
      tooltip.innerHTML = `<strong>${node.dataset.name}</strong><br>${node.dataset.type} | ${node.dataset.region}<br>Risk: ${node.dataset.score}<br>Humidity: ${node.dataset.humidity}%<br>Readiness: ${node.dataset.readiness}%`;
    });
    node.addEventListener("mouseleave", () => tooltip.classList.add("hidden"));
  });
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

function filteredModels() {
  const search = $("#modelSearch").value.trim().toLowerCase();
  const domain = $("#modelDomainFilter").value;
  const depth = $("#modelDepthFilter").value;
  return modelCatalog.filter((modelItem) => {
    const searchText = `${modelItem.name} ${modelItem.domain} ${modelItem.depth} ${modelItem.summary} ${modelItem.equation}`.toLowerCase();
    const searchMatch = !search || searchText.includes(search);
    const domainMatch = domain === "All" || modelItem.domain === domain;
    const depthMatch = depth === "All" || modelItem.depth === depth;
    return searchMatch && domainMatch && depthMatch;
  });
}

function renderModelAtlas() {
  const models = filteredModels();
  const activeId = $("#activeModelSelect").value || modelCatalog[0].id;
  const counts = modelCatalog.reduce((acc, item) => {
    acc[item.domain] = (acc[item.domain] || 0) + 1;
    return acc;
  }, {});
  $("#modelAtlasStats").innerHTML = [
    `<span>${modelCatalog.length} total models</span>`,
    ...Object.entries(counts).map(([domain, count]) => `<span>${domain}: ${count}</span>`),
    `<span>${models.length} shown</span>`
  ].join("");
  $("#modelAtlas").innerHTML = models.map((modelItem) => `
    <div class="model-card ${modelItem.id === activeId ? "active" : ""}" data-model-id="${modelItem.id}">
      <strong>${modelItem.name}<span>${modelItem.depth}</span></strong>
      <p>${modelItem.summary}</p>
      <div class="tag-list"><span>${modelItem.domain}</span><span>${modelItem.renderer}</span><span>${modelItem.equation}</span></div>
    </div>
  `).join("");
  document.querySelectorAll(".model-card").forEach((card) => {
    card.addEventListener("click", () => {
      $("#activeModelSelect").value = card.dataset.modelId;
      renderModelAtlas();
      updateModelReadout();
    });
  });
}

function populateModelSelect() {
  $("#activeModelSelect").innerHTML = modelCatalog
    .map((modelItem) => `<option value="${modelItem.id}">${modelItem.name}</option>`)
    .join("");
}

function activeModel() {
  return modelCatalog.find((modelItem) => modelItem.id === $("#activeModelSelect").value) || modelCatalog[0];
}

function updateModelReadout() {
  const modelItem = activeModel();
  $("#modelReadout").innerHTML = `<strong>${modelItem.name}</strong><br>${modelItem.summary}<br>Core relation: ${modelItem.equation}`;
}

function drawSphere(ctx, x, y, z, radius, color, alpha = 1) {
  const scale = 1 + z * 0.0018;
  const r = Math.max(1, radius * scale);
  const gradient = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r);
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(0.18, color);
  gradient.addColorStop(1, "#07100e");
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.globalAlpha = 1;
}

function point3d(cx, cy, radius, angle, tilt = 0.55, phase = 0) {
  const x = cx + Math.cos(angle) * radius;
  const y = cy + Math.sin(angle) * radius * tilt + Math.sin(phase) * 8;
  const z = Math.sin(angle) * radius;
  return { x, y, z };
}

function drawAtomModel(ctx, modelItem, width, height, complexity, time) {
  const cx = width / 2;
  const cy = height / 2;
  const shells = modelItem.id === "thomson" ? 0 : Math.max(1, Math.min(4, Math.round(complexity / 2)));
  drawSphere(ctx, cx, cy, 0, modelItem.id === "thomson" ? 88 : 30, modelItem.id === "thomson" ? "#d8a548" : "#ff6b57", modelItem.id === "thomson" ? 0.45 : 1);
  if (modelItem.id === "thomson") {
    for (let i = 0; i < complexity + 8; i++) {
      const angle = time * 0.4 + i * 2.4;
      const p = point3d(cx, cy, 34 + (i % 4) * 12, angle, 0.72, i);
      drawSphere(ctx, p.x, p.y, p.z, 7, "#5ca8ff", 0.95);
    }
    return;
  }
  for (let s = 1; s <= shells; s++) {
    const radius = 55 + s * 38;
    ctx.strokeStyle = "rgba(237, 247, 244, 0.28)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, radius, radius * (0.45 + s * 0.05), s * 0.52, 0, Math.PI * 2);
    ctx.stroke();
    const electrons = modelItem.id === "bohr" ? s * 2 : s + 1;
    for (let e = 0; e < electrons; e++) {
      const p = point3d(cx, cy, radius, time * (0.8 + s * 0.15) + e * (Math.PI * 2 / electrons), 0.5, s);
      drawSphere(ctx, p.x, p.y, p.z, 6, "#5ca8ff", 0.96);
    }
  }
}

function drawCloudModel(ctx, width, height, complexity, time) {
  const cx = width / 2;
  const cy = height / 2;
  drawSphere(ctx, cx, cy, 0, 24, "#ff6b57", 1);
  for (let i = 0; i < complexity * 28; i++) {
    const angle = i * 2.399 + time * 0.15;
    const radius = 18 + ((i * 17) % 170);
    const p = point3d(cx, cy, radius, angle, 0.62 + (i % 5) * 0.05, i);
    drawSphere(ctx, p.x, p.y, p.z, 2.4 + (i % 3), i % 2 ? "#5ca8ff" : "#49c6a2", 0.2 + (i % 5) * 0.04);
  }
}

function drawMoleculeModel(ctx, width, height, complexity, time) {
  const cx = width / 2;
  const cy = height / 2;
  const atoms = Math.max(3, complexity + 2);
  drawSphere(ctx, cx, cy, 0, 24, "#d8a548", 1);
  for (let i = 0; i < atoms; i++) {
    const angle = time * 0.25 + i * Math.PI * 2 / atoms;
    const p = point3d(cx, cy, 95, angle, 0.54, i);
    ctx.strokeStyle = "rgba(237,247,244,0.36)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    drawSphere(ctx, p.x, p.y, p.z, 16, i % 2 ? "#49c6a2" : "#5ca8ff", 1);
  }
}

function drawLatticeModel(ctx, width, height, complexity, time) {
  const cx = width / 2;
  const cy = height / 2;
  const step = 48;
  const nodes = [];
  for (let x = -2; x <= 2; x++) {
    for (let y = -2; y <= 2; y++) {
      for (let z = -1; z <= 1; z++) {
        if (Math.abs(x) + Math.abs(y) + Math.abs(z) <= complexity) {
          nodes.push({ x: cx + x * step + z * 20, y: cy + y * step * 0.62 - z * 20, z: z * 60 });
        }
      }
    }
  }
  nodes.forEach((a) => nodes.forEach((b) => {
    const distance = Math.hypot(a.x - b.x, a.y - b.y);
    if (distance > 34 && distance < 58) {
      ctx.strokeStyle = "rgba(237,247,244,0.12)";
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }));
  nodes.forEach((node, index) => drawSphere(ctx, node.x + Math.sin(time + index) * 2, node.y, node.z, 9, index % 2 ? "#49c6a2" : "#d8a548", 0.9));
}

function drawParticlesModel(ctx, width, height, complexity, time) {
  const boxX = width * 0.18;
  const boxY = height * 0.18;
  const boxW = width * 0.64;
  const boxH = height * 0.64;
  ctx.strokeStyle = "rgba(237,247,244,0.35)";
  ctx.strokeRect(boxX, boxY, boxW, boxH);
  for (let i = 0; i < complexity * 8; i++) {
    const x = boxX + ((Math.sin(time * (0.6 + i * 0.03) + i) + 1) / 2) * boxW;
    const y = boxY + ((Math.cos(time * (0.5 + i * 0.02) + i * 1.7) + 1) / 2) * boxH;
    drawSphere(ctx, x, y, Math.sin(i + time) * 70, 6, i % 3 ? "#5ca8ff" : "#ff6b57", 0.88);
  }
}

function drawWaveModel(ctx, width, height, complexity, time) {
  const mid = height / 2;
  for (let layer = 0; layer < 3; layer++) {
    ctx.strokeStyle = layer === 0 ? "#49c6a2" : layer === 1 ? "#5ca8ff" : "#d8a548";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x <= width; x += 8) {
      const y = mid + Math.sin(x * 0.018 * (layer + 1) + time * (1.2 + layer * 0.4)) * (18 + complexity * 4) + (layer - 1) * 42;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}

function drawFieldModel(ctx, width, height, complexity, time) {
  const cx = width / 2;
  const cy = height / 2;
  drawSphere(ctx, cx - 90, cy, 0, 22, "#ff6b57", 1);
  drawSphere(ctx, cx + 90, cy, 0, 22, "#5ca8ff", 1);
  for (let i = 0; i < complexity * 5; i++) {
    const offset = (i - complexity * 2.5) * 14;
    ctx.strokeStyle = `rgba(73,198,162,${0.18 + (i % 4) * 0.05})`;
    ctx.beginPath();
    ctx.moveTo(cx - 90, cy);
    ctx.bezierCurveTo(cx - 25, cy + offset + Math.sin(time + i) * 12, cx + 25, cy - offset, cx + 90, cy);
    ctx.stroke();
  }
}

function drawCircuitModel(ctx, width, height, complexity, time) {
  const x = width * 0.2;
  const y = height * 0.28;
  const w = width * 0.6;
  const h = height * 0.42;
  ctx.strokeStyle = "#49c6a2";
  ctx.lineWidth = 4;
  ctx.strokeRect(x, y, w, h);
  for (let i = 0; i < complexity; i++) {
    const px = x + ((time * 48 + i * 70) % (w * 2 + h * 2));
    let dotX = x;
    let dotY = y;
    if (px < w) { dotX = x + px; dotY = y; }
    else if (px < w + h) { dotX = x + w; dotY = y + px - w; }
    else if (px < w * 2 + h) { dotX = x + w - (px - w - h); dotY = y + h; }
    else { dotX = x; dotY = y + h - (px - w * 2 - h); }
    drawSphere(ctx, dotX, dotY, 0, 5, "#d8a548", 1);
  }
  ctx.fillStyle = "#edf7f4";
  ctx.fillText("R", x + w * 0.48, y - 14);
  ctx.fillText("V", x - 28, y + h * 0.55);
}

function drawBarrierModel(ctx, width, height, complexity, time) {
  const base = height * 0.72;
  ctx.strokeStyle = "#5ca8ff";
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let x = 0; x <= width; x += 6) {
    const peak = Math.exp(-Math.pow((x - width / 2) / 120, 2)) * (90 + complexity * 12);
    const y = base - peak;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  const particleX = (time * 90) % width;
  const particleY = base - Math.exp(-Math.pow((particleX - width / 2) / 120, 2)) * (90 + complexity * 12) - 16;
  drawSphere(ctx, particleX, particleY, 0, 12, "#ff6b57", 1);
}

function drawFlowModel(ctx, width, height, complexity, time) {
  for (let stream = 0; stream < complexity + 4; stream++) {
    const y = height * 0.2 + stream * (height * 0.6 / (complexity + 3));
    ctx.strokeStyle = stream % 2 ? "#5ca8ff" : "#49c6a2";
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    for (let x = 0; x <= width; x += 10) {
      const wave = Math.sin(x * 0.018 + time + stream) * 16;
      if (x === 0) ctx.moveTo(x, y + wave);
      else ctx.lineTo(x, y + wave);
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawSpaceModel(ctx, width, height, complexity, time) {
  const cx = width / 2;
  const cy = height / 2;
  for (let r = 40; r < 230; r += 28) {
    ctx.strokeStyle = `rgba(92,168,255,${0.12 + r / 1100})`;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r * (1 + Math.sin(time) * 0.05), r * 0.42, time * 0.08, 0, Math.PI * 2);
    ctx.stroke();
  }
  drawSphere(ctx, cx, cy, 0, 34 + complexity, "#d8a548", 1);
}

function drawModelFrame() {
  const canvas = $("#modelCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const speed = Number($("#modelSpeed").value) / 55;
  const complexity = Number($("#modelComplexity").value);
  if (!modelPaused) modelTime += 0.018 * speed;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#07100e";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(41,67,61,0.38)";
  for (let x = 0; x < width; x += 45) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 45) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  const modelItem = activeModel();
  if (modelItem.renderer === "atom") drawAtomModel(ctx, modelItem, width, height, complexity, modelTime);
  else if (modelItem.renderer === "cloud") drawCloudModel(ctx, width, height, complexity, modelTime);
  else if (modelItem.renderer === "molecule") drawMoleculeModel(ctx, width, height, complexity, modelTime);
  else if (modelItem.renderer === "lattice") drawLatticeModel(ctx, width, height, complexity, modelTime);
  else if (modelItem.renderer === "particles") drawParticlesModel(ctx, width, height, complexity, modelTime);
  else if (modelItem.renderer === "wave") drawWaveModel(ctx, width, height, complexity, modelTime);
  else if (modelItem.renderer === "field") drawFieldModel(ctx, width, height, complexity, modelTime);
  else if (modelItem.renderer === "circuit") drawCircuitModel(ctx, width, height, complexity, modelTime);
  else if (modelItem.renderer === "barrier") drawBarrierModel(ctx, width, height, complexity, modelTime);
  else if (modelItem.renderer === "flow") drawFlowModel(ctx, width, height, complexity, modelTime);
  else if (modelItem.renderer === "space") drawSpaceModel(ctx, width, height, complexity, modelTime);
  else if (modelItem.renderer === "orbit") drawAtomModel(ctx, modelItem, width, height, complexity, modelTime);
  ctx.fillStyle = "#edf7f4";
  ctx.font = "18px Inter, sans-serif";
  ctx.fillText(modelItem.name, 24, 34);
  ctx.fillStyle = "#9fb8b0";
  ctx.font = "13px Inter, sans-serif";
  ctx.fillText(modelItem.equation, 24, 58);
  modelFrame = requestAnimationFrame(drawModelFrame);
}

function initModelLab() {
  populateModelSelect();
  renderModelAtlas();
  updateModelReadout();
  if (modelFrame) cancelAnimationFrame(modelFrame);
  drawModelFrame();
}

function embedText(text) {
  const vector = new Array(32).fill(0);
  text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean).forEach((token) => {
    let hash = 0;
    for (let i = 0; i < token.length; i++) hash = (hash * 31 + token.charCodeAt(i)) >>> 0;
    vector[hash % vector.length] += 1 + Math.min(token.length, 12) / 12;
  });
  const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0)) || 1;
  return vector.map((value) => value / magnitude);
}

function cosineSimilarity(a, b) {
  return a.reduce((sum, value, index) => sum + value * b[index], 0);
}

const vectorStore = cyberDataset.map((doc) => ({ ...doc, embedding: embedText(`${doc.type} ${doc.label} ${doc.text}`) }));

function retrieveDocuments(query, limit = 4) {
  const queryVector = embedText(query);
  return vectorStore
    .map((doc) => ({ ...doc, score: cosineSimilarity(queryVector, doc.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function remember(agentId, entry) {
  cyberAgents[agentId].memory.unshift({ time: new Date().toLocaleTimeString(), entry });
  cyberAgents[agentId].memory = cyberAgents[agentId].memory.slice(0, 6);
}

function runRetrieval() {
  const query = $("#retrievalQuery").value;
  const results = retrieveDocuments(query);
  remember(activeAgent, `Retrieved ${results.length} documents for "${query}"`);
  $("#retrievalOutput").innerHTML = results.map((doc) => `
    <div class="memory-item">
      <strong>${doc.id} | ${doc.label}</strong>
      <p>${doc.text}</p>
      <div class="tag-list"><span>${doc.type}</span><span>similarity ${fmt.format(doc.score * 100)}%</span><span>anomaly ${doc.anomaly}</span></div>
    </div>
  `).join("");
  renderAgents();
}

function renderAgents() {
  document.querySelectorAll(".agent-card").forEach((card) => {
    const agent = cyberAgents[card.dataset.agent];
    card.classList.toggle("active", card.dataset.agent === activeAgent);
    const latest = agent.memory[0]?.entry || `Goal: ${agent.goal}`;
    card.innerHTML = `<strong>${agent.name}</strong><p>${latest}</p>`;
  });
}

function renderDatasetPanel() {
  $("#datasetPanel").innerHTML = cyberDataset.map((doc) => `
    <div class="dataset-item">
      <strong>${doc.id} | ${doc.type}</strong>
      <p>${doc.label}: ${doc.text}</p>
      <div class="tag-list"><span>anomaly ${doc.anomaly}</span><span>confidence ${doc.confidence}%</span></div>
    </div>
  `).join("");
}

function renderPapersPanel() {
  $("#papersPanel").innerHTML = researchPapers.map((paper) => `
    <div class="paper-item">
      <strong>${paper.title}</strong>
      <p>${paper.kind}: ${paper.summary}</p>
    </div>
  `).join("");
}

function cyberStats() {
  const scenario = $("#attackScenario")?.value || "phishing";
  const pressure = Number($("#attackPressure")?.value || 6);
  const docs = retrieveDocuments(scenario, 5);
  const anomaly = Math.round(docs.reduce((sum, doc) => sum + doc.anomaly, 0) / docs.length + pressure * 1.8);
  const confidence = Math.min(98, Math.round(docs.reduce((sum, doc) => sum + doc.confidence, 0) / docs.length + (lockdownActive ? 5 : 0)));
  const lockdown = lockdownActive ? Math.min(99, 54 + pressure * 4 + attackStep * 6) : Math.max(8, attackStep * 8);
  return { anomaly, confidence, lockdown, count: cyberDataset.length };
}

function renderCyberMetrics() {
  const stats = cyberStats();
  $("#attackCount").textContent = stats.count;
  $("#confidenceScore").textContent = `${stats.confidence}%`;
  $("#anomalyScore").textContent = stats.anomaly;
  $("#lockdownScore").textContent = `${stats.lockdown}%`;
}

function drawTelemetry() {
  const canvas = $("#telemetryCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#07100e";
  ctx.fillRect(0, 0, w, h);
  const stats = cyberStats();
  const series = [
    { color: "#ff6b57", base: stats.anomaly, label: "anomaly" },
    { color: "#49c6a2", base: stats.confidence, label: "confidence" },
    { color: "#d8a548", base: stats.lockdown, label: "lockdown" }
  ];
  series.forEach((line, idx) => {
    ctx.strokeStyle = line.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x < w; x += 8) {
      const value = line.base + Math.sin(cyberTime + x * 0.025 + idx) * 9 + Math.cos(x * 0.04) * 4;
      const y = h - 22 - Math.max(0, Math.min(100, value)) / 100 * (h - 48);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = line.color;
    ctx.fillText(line.label, 18 + idx * 110, 22);
  });
}

function drawAttackCanvas() {
  const canvas = $("#attackCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const nodes = [
    { id: "Internet", x: 95, y: 250 },
    { id: "Email", x: 240, y: 160 },
    { id: "Identity", x: 410, y: 150 },
    { id: "Endpoint", x: 410, y: 330 },
    { id: "Data Lake", x: 610, y: 150 },
    { id: "Operations", x: 610, y: 330 },
    { id: "Defense AI", x: 820, y: 250 }
  ];
  const edges = [[0,1], [1,2], [1,3], [2,4], [3,5], [4,6], [5,6], [6,2], [6,3]];
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#07100e";
  ctx.fillRect(0, 0, w, h);
  edges.forEach(([a, b], index) => {
    const active = index <= attackStep;
    ctx.strokeStyle = active ? (lockdownActive ? "#49c6a2" : "#ff6b57") : "rgba(237,247,244,0.16)";
    ctx.lineWidth = active ? 4 : 1.5;
    ctx.beginPath();
    ctx.moveTo(nodes[a].x, nodes[a].y);
    ctx.lineTo(nodes[b].x, nodes[b].y);
    ctx.stroke();
  });
  nodes.forEach((node, index) => {
    const active = index <= attackStep + 1;
    drawSphere(ctx, node.x, node.y, Math.sin(cyberTime + index) * 50, active ? 22 : 16, active ? (lockdownActive ? "#49c6a2" : "#ff6b57") : "#5ca8ff", active ? 1 : 0.55);
    ctx.fillStyle = "#edf7f4";
    ctx.font = "14px Inter, sans-serif";
    ctx.fillText(node.id, node.x - 32, node.y + 42);
  });
  ctx.fillStyle = "#9fb8b0";
  ctx.fillText(lockdownActive ? "AI response active: segments quarantined and evidence preserved" : "Synthetic attack propagation: fictional training simulation", 24, 32);
}

function renderAttackTimeline() {
  const scenario = $("#attackScenario").value;
  const steps = cyberScenarios[scenario].slice(0, attackStep + 1);
  $("#attackTimeline").innerHTML = steps.map((step, index) => `
    <div class="memory-item"><strong>T+${index * 7}m</strong><p>${step}</p></div>
  `).join("");
}

function runAttackSimulation() {
  const scenario = $("#attackScenario").value;
  attackStep = (attackStep + 1) % cyberScenarios[scenario].length;
  remember("threat", `Simulated ${scenario} step ${attackStep + 1}`);
  remember("investigator", cyberScenarios[scenario][attackStep]);
  remember("analyst", `Anomaly ${cyberStats().anomaly}, confidence ${cyberStats().confidence}%`);
  renderAttackTimeline();
  renderCyberMetrics();
  renderAgents();
}

function drawArchitecture() {
  const canvas = $("#architectureCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const nodes = [
    ["Synthetic Dataset", 130, 92, "#5ca8ff"],
    ["Embedding Engine", 320, 92, "#49c6a2"],
    ["Vector Memory", 510, 92, "#d8a548"],
    ["Agents", 700, 92, "#ff6b57"],
    ["Simulation Engine", 320, 280, "#5ca8ff"],
    ["Research Dashboard", 510, 280, "#49c6a2"],
    ["Whitepaper Output", 700, 280, "#d8a548"]
  ];
  const edges = [[0,1], [1,2], [2,3], [3,5], [4,5], [5,6], [2,4], [3,4]];
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#07100e";
  ctx.fillRect(0, 0, w, h);
  edges.forEach(([a, b], index) => {
    const from = nodes[a];
    const to = nodes[b];
    ctx.strokeStyle = index % 2 ? "#49c6a2" : "#5ca8ff";
    ctx.globalAlpha = 0.35 + Math.sin(cyberTime + index) * 0.15;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(from[1], from[2]);
    ctx.bezierCurveTo((from[1] + to[1]) / 2, from[2] - 50, (from[1] + to[1]) / 2, to[2] + 50, to[1], to[2]);
    ctx.stroke();
  });
  ctx.globalAlpha = 1;
  nodes.forEach(([label, x, y, color], index) => {
    drawSphere(ctx, x, y, Math.sin(cyberTime + index) * 50, 28, color, 1);
    ctx.fillStyle = "#edf7f4";
    ctx.font = "14px Inter, sans-serif";
    ctx.fillText(label, x - 58, y + 52);
  });
}

function cyberLoop() {
  cyberTime += 0.03;
  drawTelemetry();
  drawAttackCanvas();
  drawArchitecture();
  cyberFrame = requestAnimationFrame(cyberLoop);
}

function downloadWhitepaper() {
  const text = [
    "AEGIS ATLAS CYBER INTELLIGENCE WHITEPAPER",
    "Founder: Viren Singh",
    "",
    "Abstract",
    "This document describes a static-hosted research prototype for multi-agent cyber intelligence fusion using a synthetic safety dataset, local embeddings, vector retrieval, memory, attack-chain simulation, telemetry, and interactive architecture visualization.",
    "",
    "Dataset",
    ...cyberDataset.map((doc) => `${doc.id}: ${doc.type} | ${doc.label} | anomaly ${doc.anomaly} | confidence ${doc.confidence}`),
    "",
    "Methodology",
    "Documents are embedded locally using hashed token vectors. Retrieval ranks records by cosine similarity. Agents store short-term memory after retrieval and simulation events.",
    "",
    "Experiments",
    ...researchPapers.map((paper) => `${paper.title}: ${paper.summary}`),
    "",
    "Safety",
    "All attack chains are fictional and designed for defensive education, research presentation, and static GitHub Pages hosting."
  ].join("\n");
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "aegis-atlas-cyber-whitepaper.txt";
  link.click();
  URL.revokeObjectURL(url);
}

function initCyberLab() {
  renderAgents();
  renderDatasetPanel();
  renderPapersPanel();
  runRetrieval();
  renderAttackTimeline();
  renderCyberMetrics();
  if (!cyberFrame) cyberLoop();
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
  initModelLab();
  initCyberLab();
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
      if (button.dataset.view === "map" && map) setTimeout(renderMapLayers, 80);
    });
  });

  ["layerDisasters", "layerHumidity", "layerResponse", "layerClusters", "severityRange", "scenarioSelect"].forEach((id) => {
    $(`#${id}`).addEventListener("input", () => {
      updateOverview();
      renderMapLayers();
    });
  });

  $("#simulateBtn").addEventListener("click", runSimulation);
  $("#exportBtn").addEventListener("click", exportData);
  $("#generateReportBtn").addEventListener("click", generateReport);
  $("#downloadReportBtn").addEventListener("click", downloadReport);
  $("#askAnalystBtn").addEventListener("click", () => renderIntelligenceCore(adjustedIncidents()));
  $("#disciplineFilter").addEventListener("input", renderProjectLibrary);
  $("#levelFilter").addEventListener("input", renderProjectLibrary);
  $("#calculatorSelect").addEventListener("input", renderCalculatorInputs);
  $("#calculateBtn").addEventListener("click", runCalculation);
  $("#generateBriefBtn").addEventListener("click", generateScienceBrief);
  $("#modelSearch").addEventListener("input", renderModelAtlas);
  $("#modelDomainFilter").addEventListener("input", renderModelAtlas);
  $("#modelDepthFilter").addEventListener("input", renderModelAtlas);
  $("#activeModelSelect").addEventListener("input", () => {
    renderModelAtlas();
    updateModelReadout();
  });
  $("#modelSpeed").addEventListener("input", updateModelReadout);
  $("#modelComplexity").addEventListener("input", updateModelReadout);
  $("#modelPauseBtn").addEventListener("click", () => {
    modelPaused = !modelPaused;
    $("#modelPauseBtn").textContent = modelPaused ? "Resume Model" : "Pause Model";
  });
  document.querySelectorAll(".agent-card").forEach((card) => {
    card.addEventListener("click", () => {
      activeAgent = card.dataset.agent;
      renderAgents();
    });
  });
  $("#retrievalBtn").addEventListener("click", runRetrieval);
  $("#runAttackBtn").addEventListener("click", runAttackSimulation);
  $("#lockdownBtn").addEventListener("click", () => {
    lockdownActive = !lockdownActive;
    remember("analyst", lockdownActive ? "Lockdown activated across critical segments" : "Lockdown released for research reset");
    $("#lockdownBtn").textContent = lockdownActive ? "Release Lockdown" : "Trigger Lockdown";
    renderCyberMetrics();
    renderAgents();
  });
  $("#attackScenario").addEventListener("input", () => {
    attackStep = 0;
    lockdownActive = false;
    $("#lockdownBtn").textContent = "Trigger Lockdown";
    renderAttackTimeline();
    renderCyberMetrics();
  });
  $("#attackPressure").addEventListener("input", renderCyberMetrics);
  $("#downloadWhitepaperBtn").addEventListener("click", downloadWhitepaper);
}

bindEvents();
const storedUser = localStorage.getItem("aegisAtlasUser");
if (storedUser) showApp(storedUser);
