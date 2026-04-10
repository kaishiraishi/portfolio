const fs = require('fs');
let code = fs.readFileSync('src/components/ImageGallery.tsx', 'utf8');

code = code.replace(
  '<img\n                                src={img.src}\n                                alt={img.caption || `Image ${i + 1}`}\n                                className={`w-full h-full object-contain ${imageClassName || \'opacity-100 group-hover:opacity-80 transition-all duration-700\'}`}\n                            />',
  `{/\\.(mp4|webm)$/i.test(img.src) ? (
                                <video
                                    src={img.src}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className={\`w-full h-full object-contain \${imageClassName || 'opacity-100 group-hover:opacity-80 transition-all duration-700'}\`}
                                />
                            ) : (
                                <img
                                    src={img.src}
                                    alt={img.caption || \`Image \${i + 1}\`}
                                    className={\`w-full h-full object-contain \${imageClassName || 'opacity-100 group-hover:opacity-80 transition-all duration-700'}\`}
                                />
                            )}`
);

code = code.replace(
  '<img \n                            src={currentImg.src} \n                            alt={currentImg.caption || "Lightbox full view"}\n                            className="w-auto h-auto max-h-[75vh] object-contain shadow-2xl"\n                        />',
  `{/\\.(mp4|webm)$/i.test(currentImg.src) ? (
                            <video 
                                src={currentImg.src} 
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-auto h-auto max-h-[75vh] object-contain shadow-2xl"
                            />
                        ) : (
                            <img 
                                src={currentImg.src} 
                                alt={currentImg.caption || "Lightbox full view"}
                                className="w-auto h-auto max-h-[75vh] object-contain shadow-2xl"
                            />
                        )}`
);

fs.writeFileSync('src/components/ImageGallery.tsx', code);
