type Country = {
  name: {
    common: string;
  };
};

async function getCountries(): Promise<Country[]> {
  const response = await fetch("https://restcountries.com/v3.1/all");
  return response.json();
}

export default async function Home() {
  const countries = await getCountries();
  console.log(countries);
  return (
    <section className="grid grid-cols-5 w-full container">
      {countries.map((country) => (
        <article
          className="h-64 min-w-full p-2 bg-gray-600 border-2 m-2"
          key={country.name.common}
        >
          <h1>{country.name.common}</h1>
        </article>
      ))}
    </section>
  );
}
