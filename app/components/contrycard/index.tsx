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
        className="h-64 min-w-full p-2 m-3 bg-gray-500 rounded-lg"
        key={name}
      >
        <div className="h-40 p-2 overflow-hidden rounded-xl relative">
          <Image src={flag} alt={flagAlt} fill className="object-cover" />
        </div>
        <h1 className="mt-3 font-bold text-center">{name}</h1>
      </article>
    </Link>
  );
}
