import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/sanity/queries';
import { PILLAR_TITLES } from '@/lib/sanity/types';

// OG image gerada dinamicamente pra cada post do blog.
// Aparece quando alguém compartilha o link no WhatsApp, X, LinkedIn, etc.
// 1200x630 = padrão do Open Graph

export const runtime = 'edge';
export const alt = 'GT Overlander';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  const title = post?.title ?? 'GT Overlander';
  const category = post?.category ? PILLAR_TITLES[post.category] : 'Blog';
  const author = post?.authorName ?? 'GT Overlander';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0f0f0f',
          padding: '80px',
          color: '#f5f5f5',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Header com logo e categoria */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <svg
              width="44"
              height="36"
              viewBox="0 0 100 80"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3,72 L26,32 L34,46 L50,18 L66,46 L74,32 L97,72 Z"
                fill="#f5f5f5"
              />
              <path d="M50,18 L55,26 L48,28 Z" fill="#0f0f0f" />
              <path d="M66,46 L70,52 L64,54 Z" fill="#0f0f0f" />
            </svg>
            <span
              style={{
                fontSize: '20px',
                letterSpacing: '0.18em',
                color: '#f5f5f5',
                fontWeight: 600,
              }}
            >
              GT OVERLANDER
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: '18px',
              color: '#e06226',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              fontWeight: 600,
            }}
          >
            {category}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 60 ? '60px' : title.length > 40 ? '70px' : '80px',
            fontWeight: 700,
            lineHeight: 1.05,
            color: '#f5f5f5',
            letterSpacing: '-0.01em',
            margin: '40px 0',
          }}
        >
          {title}
        </div>

        {/* Author */}
        <div
          style={{
            display: 'flex',
            fontSize: '24px',
            color: '#a6a6a6',
          }}
        >
          {author}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
