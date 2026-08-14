import Link from "next/link";
import { getRelatedGuides } from "@/lib/guide-content.es";
const BlogKnowledgeHub = ({
  currentPath
}: {
  currentPath: string;
}) => {
  const relatedGuides = getRelatedGuides(currentPath);
  return <section className="blog-section">
      <h2>Guías de frecuencia cardíaca relacionadas</h2>
      <p>
        Continuar con una pregunta estrechamente relacionada, o navegar por la biblioteca completa. Cada guía tiene un trabajo distinto para que la técnica de medición, el seguimiento personal, el contexto de ejercicio y la metodología de producto sigan siendo fáciles de distinguir.
      </p>
      <div className="tool-link-grid">
        <Link href="/es/">Utilice la calculadora LPM basada en el toque</Link>
        <Link href="/es/guides">Examine todos los guías</Link>
      </div>
      <ul>
        {relatedGuides.map(guide => <li key={guide.path}>
            <Link href={guide.path}>{guide.title}</Link>
          </li>)}
      </ul>
      <p>
        ¿Listo para ponerlo en práctica?{" "}
        <Link href="/es/" className="blog-inline-cta">
          abrir la calculadora
        </Link>{" "}
        y ver la actualización de estimación basada en el toque.
      </p>
    </section>;
};
export default BlogKnowledgeHub;
