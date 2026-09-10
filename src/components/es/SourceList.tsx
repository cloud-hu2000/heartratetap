export type Source = {
  name: string;
  publisher: string;
  url: string;
  note: string;
};
export default function SourceList({
  sources
}: {
  sources: Source[];
}) {
  return <section className="blog-section source-list" aria-labelledby="sources-heading">
      <h2 id="sources-heading">Fuentes y lecturas complementarias</h2>
      <p>
        Usamos fuentes identificadas y fiables para los intervalos de referencia de salud. Las descripciones indican qué respalda cada fuente; los sitios externos son responsables de su propio contenido.
      </p>
      <ul>
        {sources.map(source => <li key={source.url}>
            <a href={source.url} rel="noopener noreferrer">
              {source.name}
            </a>{" "}
            <span>— {source.publisher}. {source.note}</span>
          </li>)}
      </ul>
    </section>;
}
