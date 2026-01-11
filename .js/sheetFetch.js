const SHEET_URL =
  "https://opensheet.elk.sh/1UTwwuL5kWOIe5P1TwW6L-gihPHxS2KCvnh5AOvPKmjI/1";

async function fetchSheetData() {
  const res = await fetch(SHEET_URL);
  const data = await res.json();

  return data
    // 1️⃣ Remove empty & summary rows
    .filter(row => row.NAME && row.LOCATION)

    // 2️⃣ Normalize location → country
    .map(row => {
      const location = row.LOCATION.trim();

      let country = location;
      if (location.includes(",")) {
        country = location.split(",").pop().trim();
      }

      return {
        name: row.NAME.trim(),
        batch: row.BATCH || "",
        branch: row.BRANCH || "",
        email: row.EMAIL || "",
        memberType: row["MEMBER TYPE"] || "",
        memberSince: row["MEMBER SINCE"] || "",
        country: country.toUpperCase()
      };
    });
}
