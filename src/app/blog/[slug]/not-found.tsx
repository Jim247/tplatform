import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-6 text-center">
      <h1 className="text-4xl font-bold mb-4 text-white">Post Not Found</h1>
      <p className="text-gray-400 mb-6">The blog post you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/blog" className="text-amber-400 hover:text-amber-300">
        ← Back to Blog
      </Link>
    </main>
  );
}
