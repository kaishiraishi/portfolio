import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content/works');

export interface WorkFrontmatter {
  title: string;
  summary?: string;
  date?: string;
  tags?: string[];
  repo?: string;
  demo?: string;
  image?: string;
  imageCaption?: string;
  images?: any[]; // Supports both `string` or `{src: string, caption?: string}`
  youtubeId?: string;
  role: string;
  tech: string[];
  members?: string;
  category?: string;
  achievements?: string;
  engDescription?: string;
}

export interface Work {
  slug: string;
  frontmatter: WorkFrontmatter;
}

export interface WorkDetail extends Work {
  content: string;
}

export function getAllWorks(): Work[] {
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir);
  const works = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);

      return {
        slug,
        frontmatter: data as WorkFrontmatter,
      };
    });

  // Sort by date descending
  return works.sort((a, b) => {
    if (!a.frontmatter.date) return 1;
    if (!b.frontmatter.date) return -1;
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}

export function getWorkBySlug(slug: string): WorkDetail | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    frontmatter: data as WorkFrontmatter,
    content,
  };
}
