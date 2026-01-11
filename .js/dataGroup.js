function groupByCountry(data) {
  const grouped = {};

  data.forEach(person => {
    const country = person.country;

    if (!grouped[country]) {
      grouped[country] = [];
    }

    grouped[country].push(person);
  });

  return grouped;
}
