const fs = require('fs');
let text = fs.readFileSync('src/lib/works.ts', 'utf-8');

text = text.replace(
  /const publicDir = path\.join\(process\.cwd\(\), 'public'\);/,
  "const publicDir = path.join(process.cwd(), 'public', 'image');"
);

text = text.replace(
  /if \(fs\.existsSync\(publicDir\)\) \{[\s\S]*?autoImages = files[\s\S]*?\.map\(f => `\/\$\{f\}`\);\n\s*}/,
  `if (fs.existsSync(publicDir)) {
    const folders = fs.readdirSync(publicDir);
    const slugLower = slug.toLowerCase();
    for (const folder of folders) {
      if (path.extname(folder)) continue; // skip files at root if any
      const folderPath = path.join(publicDir, folder);
      if (!fs.lstatSync(folderPath).isDirectory()) continue;
      
      const files = fs.readdirSync(folderPath);
      const matched = files
        .filter(f => f.toLowerCase().startsWith(\`\${slugLower}_\`) && /\\.(jpg|jpeg|png|gif|webp|mp4)$/i.test(f))
        .map(f => \`/image/\${folder}/\${f}\`);
        
      if (matched.length > 0) {
        autoImages = autoImages.concat(matched);
      }
    }
    
    autoImages.sort((a, b) => {
      const numA = parseInt(a.match(/_(\\d+)\\./)?.[1] || '0', 10);
      const numB = parseInt(b.match(/_(\\d+)\\./)?.[1] || '0', 10);
      return numA - numB;
    });
  }`
);

fs.writeFileSync('src/lib/works.ts', text);
