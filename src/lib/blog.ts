import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author?: string;
  excerpt?: string;
  content?: string;
  contentHtml?: string;
}

const postsDirectory = path.join(process.cwd(), 'src/app/blog/posts');

function getAllPostFiles(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllPostFiles(filePath));
    } else if (file === 'index.md' || file.endsWith('.md')) {
      results.push(filePath);
    }
  });
  return results;
}

export function getAllPosts(): BlogPost[] {
  const files = getAllPostFiles(postsDirectory);
  const posts = files.map((filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Handle both folder-based (index.md) and direct .md files
    let slug: string;
    if (path.basename(filePath) === 'index.md') {
      slug = path.basename(path.dirname(filePath));
    } else {
      slug = path.basename(filePath, '.md');
    }

    return {
      slug,
      title: data.title || slug,
      date: typeof data.date === 'string' ? data.date : String(data.date || ''),
      author: data.author || '',
      excerpt: data.excerpt || '',
      content,
    };
  });

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const files = getAllPostFiles(postsDirectory);
  let filePath: string | undefined;

  // First try to find folder-based structure (index.md)
  filePath = files.find(
    (file) => path.basename(file) === 'index.md' && path.basename(path.dirname(file)) === slug
  );

  // If not found, try direct .md file
  if (!filePath) {
    filePath = files.find((file) => path.basename(file, '.md') === slug);
  }

  if (!filePath || !fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || slug,
    date: typeof data.date === 'string' ? data.date : String(data.date || ''),
    author: data.author || '',
    excerpt: data.excerpt || '',
    content,
  };
}

export async function getPostWithHtml(slug: string): Promise<BlogPost | null> {
  const post = getPostBySlug(slug);
  if (!post || !post.content) return null;

  const processedContent = await remark().use(html).process(post.content);
  return {
    ...post,
    contentHtml: processedContent.toString(),
  };
}
