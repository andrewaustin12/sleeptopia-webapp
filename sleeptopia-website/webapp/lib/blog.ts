import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

const postsDirectory = path.join(process.cwd(), 'content/blog/posts');

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: MDXRemoteSerializeResult;
  readingTime: string;
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  const fileNames = await fs.readdir(postsDirectory);
  const posts = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = await fs.readFile(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/g).length;
        const readingTime = `${Math.ceil(wordCount / wordsPerMinute)} min read`;

        // Serialize MDX content
        const mdxSource = await serialize(content, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
          parseFrontmatter: false,
        });

        return {
          slug,
          title: data.title,
          date: data.date,
          description: data.description,
          content: mdxSource,
          readingTime,
        };
      })
  );

  return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/g).length;
    const readingTime = `${Math.ceil(wordCount / wordsPerMinute)} min read`;

    // Serialize MDX content
    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
      parseFrontmatter: false,
    });

    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      content: mdxSource,
      readingTime,
    };
  } catch (error) {
    console.error('Error getting blog post:', error);
    return null;
  }
}