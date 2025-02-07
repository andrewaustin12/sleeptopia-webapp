import { getBlogPosts } from '@/lib/blog';
import config from '@/config';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blog posts
  const posts = await getBlogPosts();
  
  // Remove https:// from domain
  const domain = config.domainName.replace('https://', '');
  
  // Create blog post entries
  const blogEntries = posts.map((post) => ({
    url: `https://${domain}blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Define static pages
  const staticPages = [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `https://${domain}blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `https://${domain}privacypolicy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.9,
    },
    {
      url: `https://${domain}termsofservice`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.9,
    },
    {
      url: `https://${domain}feature-requests`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.9,
    },
  ];

  // Combine all entries
  return [...staticPages, ...blogEntries];
} 