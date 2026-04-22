type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

function sanitizeJsonLd(value: string) {
  return value.replace(/</g, "\\u003c");
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(JSON.stringify(data)) }}
    />
  );
}
