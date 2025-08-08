import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import formatUkDate from '@/utils/FormatUkDate';
import { blogMetadata } from '@/utils/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = blogMetadata;

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-4xl mx-auto py-12 px-6 space-y-8">
      <h1 className="text-4xl font-bold mb-8 text-white">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-gray-400">No blog posts found.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-gray-700 pb-6">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-bold text-yellow-300 hover:text-yellow-300 mb-2">
                  {post.title}
                </h2>
              </Link>
              <div className="text-sm text-gray-400 mb-3">
                {formatUkDate(post.date)} {post.author && `• ${post.author}`}
              </div>
              {post.excerpt && <p className="text-gray-200 mb-4">{post.excerpt}</p>}
              <Link
                href={`/blog/${post.slug}`}
                className="text-yellow-300 hover:text-yellow-300 font-medium"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
