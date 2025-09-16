interface DocsProps {
  params: { slug: string[] };
}

export default function Docs({ params }: DocsProps) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Docs Page</h1>
      <p>
        Slug:{" "}
        <span style={{ color: "blue", fontWeight: "bold" }}>
          {params.slug.join(" / ")}
        </span>
      </p>
    </div>
  );
}