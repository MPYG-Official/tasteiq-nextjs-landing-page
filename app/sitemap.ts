import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';
import { FOODS_SITE_URL } from '@/lib/site-urls';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tasteiq.com';

  // Static pages
  const routes = [
    '',
    '/vision',
    '/fnb',
    '/hotels',
    '/affiliate',
    '/pricing',
    '/privacy-policy',
    '/terms-and-condition',
    '/refund-and-cancellation-policy',
    '/sales',
    '/sales-partner',
    '/blog',
    '/careers',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority:
      route === ''
        ? 1
        : route === '/vision' || route === '/fnb' || route === '/hotels'
          ? 0.9
          : 0.8,
  }));

  const foodsSite = {
    url: FOODS_SITE_URL,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  };

  // Fetch blog posts from database
  try {
    const blogPosts = await prisma.blogPost.findMany({
      where: { published: true },
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    const blogRoutes = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return [...routes, foodsSite, ...blogRoutes];
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    return [...routes, foodsSite];
  }
}

