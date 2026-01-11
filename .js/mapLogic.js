const mapContainer = document.getElementById("map-container");
const infoPanel = document.getElementById("info-panel");
const countryTitle = document.getElementById("country-title");
const alumniList = document.getElementById("alumni-list");

async function initMap() {
  const members = await fetchSheetData();        // from sheetFetch.js
  const grouped = groupByCountry(members);       // from dataGroup.js

  Object.keys(grouped).forEach(country => {
    if (!countryCenters[country]) return;

    const count = grouped[country].length;

    const marker = document.createElement("div");
    marker.className = "marker";

    marker.style.left = countryCenters[country].x + "%";
    marker.style.top = countryCenters[country].y + "%";

    // Scale marker size based on count
    const size = Math.min(18 + count * 2, 40);
    marker.style.width = size + "px";
    marker.style.height = size + "px";

    marker.onclick = () =>
      showCountryDetails(country, grouped[country]);

    mapContainer.appendChild(marker);
  });
}

function showCountryDetails(country, people) {
  infoPanel.classList.remove("hidden");
  countryTitle.textContent = `${country} · ${people.length} Members`;
  alumniList.innerHTML = "";

  people.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.name} (${p.batch} – ${p.branch})`;
    alumniList.appendChild(li);
  });
}

initMap();
