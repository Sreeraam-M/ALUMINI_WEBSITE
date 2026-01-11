const mapContainer = document.getElementById("map-container");
const infoPanel = document.getElementById("info-panel");
const countryTitle = document.getElementById("country-title");
const alumniList = document.getElementById("alumni-list");

console.log("mapLogic loaded");

async function initMap() {
  console.log("initMap running");

  const members = await fetchSheetData();
  console.log("Members fetched:", members.length);

  const grouped = groupByCountry(members);
  console.log("Grouped data:", grouped);

  Object.keys(grouped).forEach(country => {
    if (!countryCenters[country]) {
      console.warn("No center for", country);
      return;
    }

    const marker = document.createElement("div");
    marker.className = "marker";

    marker.style.left = countryCenters[country].x + "%";
    marker.style.top = countryCenters[country].y + "%";

    marker.onclick = () => {
      showCountryDetails(country, grouped[country]);
    };

    mapContainer.appendChild(marker);
  });
}

function showCountryDetails(country, people) {
  console.log("Clicked:", country);
  console.log("People array:", people);

  infoPanel.classList.remove("hidden");
  countryTitle.textContent = `${country} · ${people.length} Members`;

  alumniList.innerHTML = "";

  people.forEach(person => {
    const li = document.createElement("li");
    li.textContent = `${person.name} (${person.batch || "—"} | ${person.branch || "—"})`;
    alumniList.appendChild(li);
  });
}

initMap();
