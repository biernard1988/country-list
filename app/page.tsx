import Image from "next/image";
import Link from "next/link";

type Country = {
  name: {
    common: string;
  };
  flags: {
    svg: string;
    alt: string;
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
    <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full container gap-2 mt-10">
      {countries.map((country) => (
        <Link href={`/country/${country.name.common}`}>
          <article
            className="h-64 min-w-full p-2 m-3 bg-gray-500 rounded-lg hover:shadow-inner transition-all"
            key={country.name.common}
          >
            <div className="w-auto h-40 p-2 overflow-hidden rounded-xl relative">
              <Image
                src={country.flags.svg}
                alt={country.flags.alt}
                fill
                className="object-cover"
              />
            </div>
            <h1 className="mt-3 text-center">{country.name.common}</h1>
          </article>
        </Link>
      ))}
    </section>
  );
}
