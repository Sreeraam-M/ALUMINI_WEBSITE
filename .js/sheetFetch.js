const SHEET_URL =
"https://opensheet.elk.sh/1UTwwuL5kWOIe5P1TwW6L-gihPHxS2KCvnh5AOvPKmjI/1";

async function fetchSheetData(){
  const res = await fetch(SHEET_URL);
  const data = await res.json();

  return data
    .filter(row => row.NAME)
    .map(row=>{
      const loc = row.LOCATION ? row.LOCATION.trim() : "INDIA";
      const country = loc.includes(",")
        ? loc.split(",").pop().trim()
        : loc;

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
