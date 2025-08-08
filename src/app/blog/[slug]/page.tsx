import { getPostWithHtml } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import formatUkDate from '@utils/FormatUkDate';

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostWithHtml(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <Link href="/blog" className="text-amber-400 hover:text-amber-300 mb-6 inline-block">
        ← Back to Blog
      </Link>
      <article className="space-y-6">
        <h1 className="text-4xl font-bold mb-4 text-white">{post.title}</h1>
        <div className="text-sm text-gray-400 mb-4">
          {formatUkDate(post.date)} {post.author && `• ${post.author}`}
        </div>
        <div className="mb-4" />
        <div
          className="prose prose-invert prose-amber max-w-none text-white [&>*]:text-white space-y-4"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
        />
      </article>
    </main>
  );
}
