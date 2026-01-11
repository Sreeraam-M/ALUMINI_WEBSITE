return data
  .filter(row => row.NAME && row.LOCATION)
  .map(row => {
    const loc = row.LOCATION.trim();
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
