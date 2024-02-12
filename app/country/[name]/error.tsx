"use client";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

export default function Error() {
  return (
    <section className="flex flex-col container items-center justify-center mt-20">
      <h1>Ops, we couldn't find any result</h1>
      <Link href="/" className="flex">
        <ArrowBigLeft />
        Go back
      </Link>
    </section>
  );
}
