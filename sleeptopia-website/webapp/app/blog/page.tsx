import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import { formatDistanceToNow } from 'date-fns';
import { Card } from '@/components/ui/card';
import Footer from '@/components/footer';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-muted-foreground mb-4">{post.description}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{formatDistanceToNow(new Date(post.date), { addSuffix: true })}</span>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}