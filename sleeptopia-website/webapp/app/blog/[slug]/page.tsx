import { getBlogPost, getBlogPosts } from '@/lib/blog';
import Footer from '@/components/footer';
import { notFound } from 'next/navigation';
import BlogContent from '@/components/blog-content';
import AppPromotion from '@/components/app-promotion';
import { Metadata, ResolvingMetadata } from 'next';
import config from '@/config';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${post.title} | ${config.appName} Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `${config.domainName}blog/${post.slug}`,
      siteName: config.appName,
      locale: 'en_US',
      images: previousImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      site: config.social.x,
    },
    alternates: {
      canonical: `${config.domainName}blog/${post.slug}`,
    }
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  if (!Array.isArray(posts)) {
    console.error('getBlogPosts did not return an array:', posts);
    return [];
  }
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    notFound();
  }

  const promotionProps = {
    title: "Ready to Improve Your Sleep?",
    description: "Join thousands of users who are strengthening their airways and sleeping better with our guided exercises. Download Sleeptopia today."
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container max-w-3xl mx-auto px-6 py-12">
        <article className="prose prose-lg dark:prose-invert max-w-none
          prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl 
          prose-p:leading-relaxed prose-p:mb-4 
          prose-a:text-primary hover:prose-a:text-primary/80 
          prose-img:rounded-lg
          prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
          prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
          prose-li:mb-2
          prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:pl-4 prose-blockquote:italic
          prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-muted/50 prose-pre:p-4 prose-pre:rounded-lg
          prose-strong:font-bold prose-em:italic
          prose-hr:border-muted
          [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          <div className="flex items-center gap-2 text-muted-foreground mb-8">
            <time dateTime={post.date} className="text-sm">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span className="text-sm">•</span>
            <span className="text-sm">{post.readingTime}</span>
          </div>
          <BlogContent content={post.content} />
        </article>
        <AppPromotion {...promotionProps} />
      </main>
      <Footer />
    </div>
  );
}