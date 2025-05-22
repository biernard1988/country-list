"use client"
import React, { useState, useEffect } from "react"
import CountryCard from "./components/country-card"

export type Country = {
  name: {
    common: string
    official: string
  }
  flags: {
    svg: string
    alt: string
  }
  capital: string
  region: string
  subregion: string
  population: number
  languages?: {
    [key: string]: string
  }
  borders?: string[]
  cca3: string
}

async function getCountries(): Promise<Country[]> {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all")
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching countries:", error)
    return [] // Return an empty array to prevent breaking the app
  }
}

const Home: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  )

  useEffect(() => {
    async function fetchCountries() {
      try {
        const fetchedCountries = await getCountries()
        setCountries(fetchedCountries)
      } catch (error) {
        console.error("Error in fetchCountries:", error)
      }
    }
    fetchCountries()
  }, [])

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchText = event.target.value
    setSearchTerm(searchText)
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
    setTypingTimeout(
      setTimeout(() => {
        setSearchTerm(searchText)
      }, 300)
    )
  }

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col items-center w-full">
      <input
        className="text-black p-3 mt-10 outline-0 rounded-lg"
        type="search"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      {countries.length === 0 ? (
        <p className="mt-10 text-red-500">
          Failed to fetch countries. Please try again later.
        </p>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 container gap-2 mt-10">
          {filteredCountries.map((country, index) => (
            <CountryCard
              key={index}
              name={country.name.common}
              flag={country.flags.svg}
              flagAlt={country.flags.alt}
            />
          ))}
        </section>
      )}
    </div>
  )
}

export default Home
