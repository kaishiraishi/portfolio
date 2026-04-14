const matter = require('gray-matter');
const fs = require('fs');
const path = require('path');

const slug = 'otherworks';
const contentDir = path.join(process.cwd(), 'content/works');
const filePath = path.join(contentDir, `${slug}.mdx`);
const fileContent = fs.readFileSync(filePath, 'utf8');
const { data } = matter(fileContent);

const publicDir = path.join(process.cwd(), 'public', 'image');
let autoImages = [];
if (fs.existsSync(publicDir)) {
  const folders = fs.readdirSync(publicDir);
  const slugLower = slug.toLowerCase();
  for (const folder of folders) {
    if (path.extname(folder)) continue;
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
}

if (data.image) {
  autoImages = autoImages.filter(img => img !== data.image);
}

let mdImages = Array.isArray(data.images) ? data.images : [];
const mdImageSrcs = mdImages.map(img => (typeof img === 'string' ? img : img.src));

const additionalImages = autoImages.filter(src => !mdImageSrcs.includes(src));

data.images = [...mdImages, ...additionalImages];

console.log("mainImage:", data.image);
console.log("images:", data.images);

const isMainImageInList = data.images.some(img => 
    typeof img === "string" ? img === data.image : img.src === data.image
);

console.log("isMainImageInList:", isMainImageInList);

// ImageGallery behavior
const allImages = [];
if (data.image && !isMainImageInList) {
    allImages.push({ src: data.image });
}
data.images.forEach(img => {
    if (typeof img === "string") {
        allImages.push({ src: img });
    } else {
        allImages.push({ src: img.src });
    }
});
console.log("allImages to be rendered:", allImages);

