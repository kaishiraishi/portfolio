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

  // Auto-discover images in public/
  const publicDir = path.join(process.cwd(), 'public', 'image');
  let autoImages: string[] = [];
  if (fs.existsSync(publicDir)) {
    const folders = fs.readdirSync(publicDir);
    const slugLower = slug.toLowerCase();
    for (const folder of folders) {
      if (path.extname(folder)) continue; // skip files at root if any
      const folderPath = path.join(publicDir, folder);
      if (!fs.lstatSync(folderPath).isDirectory()) continue;
      
      const files = fs.readdirSync(folderPath);
      const matched = files
        .filter(f => f.toLowerCase().startsWith(`${slugLower}_`) && /\.(jpg|jpeg|png|gif|webp|mp4)$/i.test(f))
        .map(f => `/image/${folder}/${f}`);
        
      if (matched.length > 0) {
        autoImages = autoImages.concat(matched);
      }
    }
    
    autoImages.sort((a, b) => {
      const numA = parseInt(a.match(/_(\d+)\./)?.[1] || '0', 10);
      const numB = parseInt(b.match(/_(\d+)\./)?.[1] || '0', 10);
      return numA - numB;
    });
  }

  // Filter out mainImage if it's in the list so it doesn't duplicate
  if (data.image) {
    autoImages = autoImages.filter(img => img !== data.image);
  }

  // Merge discovered images with any explicitly defined images, preferring discovered.
  // We can just set it as the primary array.
  if (autoImages.length > 0) {
    data.images = autoImages;
  }

  return {
    slug,
    frontmatter: data as WorkFrontmatter,
    content,
  };
}
