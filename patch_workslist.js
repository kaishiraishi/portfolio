const fs = require('fs');
let code = fs.readFileSync('src/components/WorksList.tsx', 'utf8');

code = code.replace(
    /\{work\.frontmatter\.image && \(\s*<img\s*src=\{work\.frontmatter\.image\}\s*alt=""\s*className="w-full h-full object-cover grayscale brightness-125"\s*\/>\s*\)\}/g,
    `{work.frontmatter.image && (
                            /\\.(mp4|webm)$/i.test(work.frontmatter.image) ? (
                                <video
                                    src={work.frontmatter.image}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover grayscale brightness-125"
                                />
                            ) : (
                                <img
                                    src={work.frontmatter.image}
                                    alt=""
                                    className="w-full h-full object-cover grayscale brightness-125"
                                />
                            )
                        )}`
);

fs.writeFileSync('src/components/WorksList.tsx', code);
