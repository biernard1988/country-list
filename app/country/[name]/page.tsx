import type { Country } from "@/app/page";
import { CornerUpLeft, Home, Globe, Users, Speech } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CountryCard from "@/app/components/country-card";

async function getCountryByName(name: string): Promise<Country> {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries: Country[] = await response.json();

  return countries.find((country: Country) => country.name.common === name)!;
}

async function getCountryBordersByName(name: string) {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries: Country[] = await response.json();

  const country = countries.find(
    (country: Country) => country.name.common === name
  )!;

  return country.borders?.map((border) => {
    const borderCountry = countries.find((country) => country.cca3 === border)!;
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
  const borderCountries = await getCountryBordersByName(decodeURI(name));

  const formatter = Intl.NumberFormat("en", {
    notation: "compact",
  });

  return (
    <section className="flex flex-col container mb-3">
      <h1 className="text-3xl lg:text-5xl text-center font-bold my-16">
        {country.name.official}
      </h1>

      <div className="xl:flex xl:justify-center">
        <Link
          href="/"
          className="flex items-center gap-2 py-2 ml-3 text-gray-400 hover:text-white transition-colors xl:flex-col xl:mr-2"
        >
          <CornerUpLeft size={20} /> Back
        </Link>
        <article className="flex md:flex-row flex-col justify-between items-center xl:justify-evenly xl:w-3/5 p-8 bg-gray-500 mx-4 rounded-xl">
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Home size={20} />
              {country.capital && (
                <h2>
                  <b className="text-lg">Capital:</b> {country.capital}
                </h2>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Globe size={20} />
              <h2>
                <b className="text-lg">Continent:</b> {country.region}
                {country.subregion && ` - ${country.subregion}`}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Users size={20} />
              <h2>
                <b className="text-lg">Population: </b>
                {formatter.format(country.population)}
              </h2>
            </div>
            <div className="flex gap-2">
              <Speech size={20} />
              {country.languages && (
                <h2>
                  <b className="text-lg">Languages:</b>
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
          <div className="mb-5 shadow-lg md:order-last order-first">
            <Image
              src={country.flags.svg}
              alt={country.flags.alt}
              className="object-cover"
              width={500}
              height={560}
            />
          </div>
        </article>
      </div>
      <section className="flex flex-col justify-center items-center">
        <h3 className="my-12 text-2xl lg:text-3xl text-center font-semibold">
          Bordering Countries
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 w-full">
          {borderCountries &&
            borderCountries.map((border) => (
              <CountryCard key={border.name} {...border} />
            ))}
        </div>
      </section>
    </section>
  );
}
