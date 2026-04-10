const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');
const slug = 'hatsu';
const files = fs.readdirSync(publicDir);
const imgs = files.filter(f => f.toLowerCase().startsWith(`${slug}_`) && /\.(jpg|jpeg|png|gif|webp|mp4)$/i.test(f));
console.log(imgs);
