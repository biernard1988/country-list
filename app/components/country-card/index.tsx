import Image from "next/image";
import Link from "next/link";

export default function CountryCard({
  name,
  flag,
  flagAlt,
}: {
  name: string;
  flag: string;
  flagAlt: string;
}) {
  return (
    <Link href={`/country/${name}`}>
      <article
        className="h-64 p-2 mx-3 my-1 sm:m-1 md:m-1 lg:my-3 bg-gray-500 hover:border transition-all rounded-lg"
        key={name}
      >
        <div className="h-40 overflow-hidden rounded-xl relative">
          <Image src={flag} alt={flagAlt} fill className="object-cover" />
        </div>
        <h1 className="mt-5 font-bold text-center">{name}</h1>
      </article>
    </Link>
  );
}
