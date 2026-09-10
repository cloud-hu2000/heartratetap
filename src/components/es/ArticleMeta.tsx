import Link from "next/link";
type ArticleMetaProps = {
  published: string;
  reviewed: string;
  readingTime: string;
};
export default function ArticleMeta({
  published,
  reviewed,
  readingTime
}: ArticleMetaProps) {
  return <aside className="article-meta" aria-label="Información sobre el artículo">
      <div className="article-meta-row">
        <span>Por el equipo de producción y editorial HeartRateTap</span>
        <span>Publicado {published}</span>
        <span>Contenido revisado {reviewed}</span>
        <span>{readingTime}</span>
      </div>
      <p>
        El comportamiento del producto se revisa contra el código público; las referencias de salud se revisan contra las fuentes mencionadas en la página. Esto es revisión editorial, no revisión médica, y ningún revisor clínico está implícito.{" "}
        Consulta nuestra <Link href="/es/about#editorial-standards">política editorial y de correcciones</Link>.
      </p>
    </aside>;
}
