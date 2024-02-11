import React from "react";

export default function CountryPage({
  params: { name },
}: {
  params: { name: string };
}) {
  return <div>{name}</div>;
}
