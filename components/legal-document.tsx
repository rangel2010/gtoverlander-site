import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

interface RelatedDoc {
  href: string;
  label: string;
}

interface LegalDocumentProps {
  title: string;
  subtitle?: string;
  lastUpdated: string;
  content: string;
  relatedDocs?: RelatedDoc[];
}

export function LegalDocument({
  title,
  subtitle,
  lastUpdated,
  content,
  relatedDocs,
}: LegalDocumentProps) {
  return (
    <>
      <section className="bg-gt-bg text-gt-text">
        <div className="container-wide py-12 md:py-16 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-medium leading-[1.15] mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base text-gt-text-muted mb-3 font-sans">
              {subtitle}
            </p>
          )}
          <p className="text-sm text-gt-text-muted">
            Última atualização: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="bg-gt-bg border-t border-gt-border py-12 md:py-16">
        <article className="container-narrow gt-prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // h1 vem da página (não do markdown)
              h1: () => null,
              h2: ({ children }) => (
                <h2 className="text-2xl font-medium text-gt-text mt-12 mb-4 leading-tight">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-medium text-gt-text mt-8 mb-3 leading-snug">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gt-text font-sans leading-relaxed mb-4">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="text-gt-text font-sans leading-relaxed mb-6 space-y-2 list-disc pl-6">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="text-gt-text font-sans leading-relaxed mb-6 space-y-2 list-decimal pl-6">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li className="pl-1">{children}</li>,
              strong: ({ children }) => (
                <strong className="font-medium text-gt-text">{children}</strong>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-gt-orange bg-gt-card pl-5 pr-4 py-4 my-6 text-gt-text-muted font-sans rounded-r-md">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => {
                const isInternal = href?.startsWith('/');
                if (isInternal && href) {
                  return (
                    <Link
                      href={href}
                      className="text-gt-orange hover:underline font-sans"
                    >
                      {children}
                    </Link>
                  );
                }
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gt-orange hover:underline font-sans"
                  >
                    {children}
                  </a>
                );
              },
              hr: () => (
                <hr className="my-8 border-0 border-t border-gt-border" />
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm border-collapse font-sans">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-gt-card">{children}</thead>
              ),
              tbody: ({ children }) => <tbody>{children}</tbody>,
              tr: ({ children }) => (
                <tr className="border-b border-gt-border">{children}</tr>
              ),
              th: ({ children }) => (
                <th className="text-left text-gt-text font-medium px-4 py-2 border border-gt-border">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="text-gt-text-muted px-4 py-2 border border-gt-border align-top">
                  {children}
                </td>
              ),
              code: ({ children }) => (
                <code className="bg-gt-card text-gt-text-muted px-1.5 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </section>

      {relatedDocs && relatedDocs.length > 0 && (
        <section className="bg-gt-card border-t border-gt-border py-12">
          <div className="container-narrow">
            <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-4 font-sans">
              Documentos relacionados
            </p>
            <ul className="space-y-2 font-sans">
              {relatedDocs.map((doc) => (
                <li key={doc.href}>
                  <Link
                    href={doc.href}
                    className="text-gt-orange hover:underline"
                  >
                    {doc.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
