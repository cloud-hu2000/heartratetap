export type Source = {
  name: string;
  publisher: string;
  url: string;
  note: string;
};

export default function SourceList({ sources }: { sources: Source[] }) {
  return (
    <section className="blog-section source-list" aria-labelledby="sources-heading">
      <h2 id="sources-heading">Sources and further reading</h2>
      <p>
        We use named, authoritative sources for health reference ranges. The descriptions below explain what each source
        supports; external sites are responsible for their own content.
      </p>
      <ul>
        {sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} rel="noopener noreferrer">
              {source.name}
            </a>{" "}
            <span>— {source.publisher}. {source.note}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
