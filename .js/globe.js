const SHEET_API = "https://api.sheetbest.com/sheets/60275bf2-85fc-43db-a059-064117495204";

const globe = Globe()
  .globeImageUrl("//unpkg.com/three-globe/example/img/earth-day.jpg")
  .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
  .backgroundImageUrl(null)
  .pointAltitude(0.03)
  .pointColor(() => "rgba(0, 100, 200, 0.8)")
  .pointRadius(0.5)
  (document.getElementById("globeViz"));

fetch(SHEET_API)
  .then(res => res.json())
  .then(rows => {
    const points = [];
    const countriesSet = new Set();

    rows.forEach(row => {
      const location = row.District || row.State || row.Country;
      if (locationMap[location]) {
        points.push({
          lat: locationMap[location][0],
          lng: locationMap[location][1],
          name: row.Name || "Alumni",
          batch: row.Batch || "N/A"
        });
      }
      if (row.Country) countriesSet.add(row.Country);
    });

    globe.pointsData(points);

    globe.labelsData(points)
      .labelLat(d => d.lat)
      .labelLng(d => d.lng)
      .labelText(d => `${d.name} (${d.batch})`)
      .labelSize(1)
      .labelDotRadius(0.2);

    // Populate right-side country list
    const countryUl = document.getElementById("countryItems");
    Array.from(countriesSet).sort().forEach(country => {
      const li = document.createElement("li");
      li.textContent = country;
      countryUl.appendChild(li);
    });
  })
  .catch(err => console.error("Error fetching alumni data:", err));

