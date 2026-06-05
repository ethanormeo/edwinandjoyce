import brand from "@/data/brand.json";

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(brand.seo.jsonld) }}
    />
  );
}
