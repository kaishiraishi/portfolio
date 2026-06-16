const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : '';

export function resolveAssetPath(src: string): string {
  if (!src) return src;

  // Ignore external URLs, data URLs, or relative paths that don't start with /
  if (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('//') ||
    src.startsWith('data:') ||
    !src.startsWith('/')
  ) {
    return src;
  }

  // Strip existing basePath to normalize (handles "/portfolio/image.png" -> "/image.png")
  let cleanSrc = src;
  if (cleanSrc.startsWith('/portfolio/')) {
    cleanSrc = cleanSrc.substring('/portfolio'.length);
  }

  // Prepend basePath
  return `${basePath}${cleanSrc}`;
}
