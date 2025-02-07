'use client';

import { Suspense } from 'react';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

// Dynamically import the MDX component
const MDXRemote = dynamic(
  async () => {
    const { MDXRemote: Component } = await import('next-mdx-remote');
    return Component;
  },
  { ssr: false }
);

// Need to import dynamic after the above import to avoid ESM issues
import dynamic from 'next/dynamic';

interface BlogContentProps {
  content: MDXRemoteSerializeResult;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="mt-8">
      <Suspense fallback={<div>Loading...</div>}>
        <MDXRemote {...content} />
      </Suspense>
    </div>
  );
} 