import type { Country } from "@/app/page";
import { CornerUpLeft, Home, Globe, Users, Speech } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CountryCard from "@/app/components/contrycard";

/* async function getCountryByName(name: string): Promise<Country> {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=true`
  );
  return (await response.json())[0];
} */

async function getCountryByName(name: string): Promise<Country> {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries: Country[] = await response.json();

  return countries.find((country: Country) => country.name.common === name)!;
}

async function getCountryBorderByName(name: string) {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries: Country[] = await response.json();

  const country = countries.find(
    (country: Country) => country.name.common === name
  )!;

  return country.borders?.map((border) => {
    const borderCountry = countries.find((country) => country.cca3 === border);
    return {
      name: borderCountry.name.common,
      flag: borderCountry.flags.svg,
      flagAlt: borderCountry.flags.alt,
    };
  });
}

export default async function CountryPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const country = await getCountryByName(decodeURI(name));
  const borderCountries = await getCountryBorderByName(decodeURI(name));

  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
  });

  return (
    <section className="flex flex-col container">
      <h1 className="text-5xl text-center font-bold my-16">
        {country.name.common}
      </h1>

      <Link
        href="/"
        className="flex items-center gap-2 py-2 text-gray-400 hover:text-white transition-colors"
      >
        <CornerUpLeft size={20} /> Back
      </Link>
      <article className="flex md:flex-row flex-col justify-between min-w-full p-10 bg-gray-500 rounded-xl">
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Home size={20} />
            {country.capital && (
              <h2>
                <b>Capital:</b> {country.capital}
              </h2>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Globe size={20} />
            <h2>
              <b>Continent:</b> {country.region}
              {country.subregion && ` - ${country.subregion}`}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Users size={20} />
            <h2>
              <b>Population:</b> {formatter.format(country.population)}
            </h2>
          </div>
          <div className="flex gap-2">
            <Speech size={20} />
            {country.languages && (
              <h2>
                <b>Languages:</b>
                <br />
                {Object.values(country.languages).map((lang) => (
                  <span
                    key={lang}
                    className="inline-block px-2 bg-gray-600 rounded-full mt-2 mr-1"
                  >
                    {lang}
                  </span>
                ))}
              </h2>
            )}
          </div>
        </section>
        <div className="relative h-60 w-96 mb-5 shadow-md md:order-last order-first">
          <Image
            src={country.flags.svg}
            alt={country.flags.alt}
            className="object-cover"
            fill
          />
        </div>
      </article>
      <section className="flex flex-col justify-center items-center">
        <h3 className="mt-12 text-2xl text-center font-semibold">
          Bordering Countries
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 m-3 w-full container">
          {borderCountries?.map((border) => (
            <CountryCard {...border} />
          ))}
        </div>
      </section>
    </section>
  );
}