import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { generateMetadata as genMeta, generateArticleStructuredData } from '@/lib/seo';
import { formatBlogContent } from '@/lib/blog-content';
import MarketingPageShell from '@/components/content/MarketingPageShell';
import MarketingFooter from '@/components/content/MarketingFooter';

async function getBlogPost(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blog/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {};
  }

  return genMeta({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.description,
    keywords:
      post.seoKeywords && post.seoKeywords.length > 0
        ? post.seoKeywords
        : [post.category, 'restaurant management'],
    image: post.image || '/images/og-image.jpg',
    url: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.publishedAt || post.createdAt,
    author: post.author,
    section: post.category,
    tags: post.tags || [post.category],
  });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const structuredData = generateArticleStructuredData({
    headline: post.title,
    description: post.description,
    image: post.image
      ? post.image.startsWith('http')
        ? post.image
        : `https://tasteiq.com${post.image}`
      : 'https://tasteiq.com/images/og-image.jpg',
    datePublished: post.publishedAt || post.createdAt,
    author: post.author,
    publisher: {
      name: 'TasteIQ',
      logo: 'https://tasteiq.com/images/logo.png',
    },
  });

  const formattedContent = formatBlogContent(post.content);

  return (
    <MarketingPageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="blog-article">
        <div className="wrap blog-article-inner">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/blog">Blog</Link>
            <span>/</span>
            <span>{post.title}</span>
          </nav>

          <header className="blog-article-header">
            <span className="blog-tag">{post.category}</span>
            <h1 className="blog-article-title">{post.title}</h1>
            <div className="blog-article-meta">
              <span>{post.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.publishedAt || post.createdAt}>
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span aria-hidden="true">·</span>
              <span>{post.readTime} min read</span>
              {post.views > 0 ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{post.views} views</span>
                </>
              ) : null}
            </div>
            {post.tags && post.tags.length > 0 ? (
              <div className="blog-tags" style={{ marginTop: '16px' }}>
                {post.tags.map((tag: string) => (
                  <span key={tag} className="blog-tag-pill">
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}
          </header>

          {post.image ? (
            <div className="blog-hero-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image} alt={post.title} />
            </div>
          ) : null}

          <div className="mkt-prose" dangerouslySetInnerHTML={{ __html: formattedContent }} />

          <div className="mkt-author-box">
            <h3>About the author</h3>
            <p>
              {post.author} is part of the TasteIQ team, helping restaurants run better on one F&amp;B
              stack.
            </p>
          </div>

          <Link href="/blog" className="mkt-back-link">
            ← Back to blog
          </Link>
        </div>
      </article>
      <MarketingFooter />
    </MarketingPageShell>
  );
}
