"use client";

import { useState, useEffect, useCallback } from "react";
import { resolveAssetPath } from "@/lib/resolveAssetPath";

export type ImageItem = {
    src: string;
    caption?: string;
    alt?: string;
};

interface ImageGalleryProps {
    mainImage?: string;
    mainImageCaption?: string;
    images?: (string | ImageItem)[];
    imageClassName?: string;
    galleryClassName?: string;
    itemClassName?: string;
}

export default function ImageGallery({ 
    mainImage, 
    mainImageCaption, 
    images = [], 
    imageClassName,
    galleryClassName = "space-y-16",
    itemClassName = "flex flex-col items-start w-full"
}: ImageGalleryProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // Normalize images into a single consistent array
    const allImages: ImageItem[] = [];
    
    // Check if mainImage is already explicitly placed in the images array
    const isMainImageInList = images.some(img => 
        typeof img === "string" ? img === mainImage : img.src === mainImage
    );

    if (mainImage && !isMainImageInList) {
        allImages.push({ src: resolveAssetPath(mainImage), caption: mainImageCaption });
    }
    
    images.forEach(img => {
        if (typeof img === "string") {
            allImages.push({ src: resolveAssetPath(img) });
        } else {
            allImages.push({ src: resolveAssetPath(img.src), caption: img.caption, alt: img.alt });
        }
    });

    const handlePrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setLightboxIndex(prev => prev !== null ? (prev > 0 ? prev - 1 : allImages.length - 1) : null);
    }, [allImages.length]);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setLightboxIndex(prev => prev !== null ? (prev < allImages.length - 1 ? prev + 1 : 0) : null);
    }, [allImages.length]);

    useEffect(() => {
        if (lightboxIndex === null) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightboxIndex(null);
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, handlePrev, handleNext]);

    if (allImages.length === 0) return null;

    const currentImg = lightboxIndex !== null ? allImages[lightboxIndex] : null;

    return (
        <>
            {/* Base Gallery Flow */}
            <div className={galleryClassName}>
                {allImages.map((img, i) => {
                    // Skip rendering if src is empty or not provided
                    if (!img.src) return null;
                    
                    return (
                        <div key={i} className={`relative ${itemClassName}`}>
                            <button 
                                onClick={() => setLightboxIndex(i)}
                                className="relative w-full h-full outline-none cursor-zoom-in group flex-shrink-0 bg-transparent flex items-center justify-center"
                            >
                                {/\.(mp4|webm)$/i.test(img.src) ? (
                                    <video
                                        src={img.src}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className={`w-full h-full object-contain ${imageClassName || 'opacity-100 group-hover:opacity-80 transition-all duration-700'}`}
                                    />
                                ) : (
                                    <img
                                        src={img.src}
                                        alt={img.alt || img.caption || `Image ${i + 1}`}
                                        className={`w-full h-full object-contain ${imageClassName || 'opacity-100 group-hover:opacity-80 transition-all duration-700'}`}
                                    />
                                )}
                            </button>
                            {/* Static Caption (Normal View) */}
                            {(img.alt || img.caption) && (
                                <p className="absolute -bottom-6 sm:-bottom-8 left-0 text-xs sm:text-sm text-[#777777] opacity-90 font-light tracking-wide w-full text-left">
                                    {img.alt || img.caption}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Lightbox Modal */}
            {currentImg && lightboxIndex !== null && (
                <div 
                    className="fixed inset-0 z-50 bg-white/60 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-6 md:p-12 cursor-zoom-out animate-in fade-in"
                    onClick={() => setLightboxIndex(null)}
                >
                    {/* Counter (e.g., 01 / 03) */}
                    {allImages.length > 1 && (
                        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 md:top-12 md:left-12 text-sm font-light tracking-[0.2em] text-[#999999] opacity-80">
                            {String(lightboxIndex + 1).padStart(2, '0')} / {String(allImages.length).padStart(2, '0')}
                        </div>
                    )}

                    {/* Left Arrow */}
                    {allImages.length > 1 && (
                        <button 
                            onClick={handlePrev}
                            className="absolute left-2 sm:left-6 md:left-12 top-1/2 -translate-y-1/2 p-2 sm:p-4 text-[#999999] opacity-40 hover:opacity-100 transition-colors outline-none cursor-pointer"
                            aria-label="Previous image"
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-8 sm:h-8">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                    )}

                    {/* Right Arrow */}
                    {allImages.length > 1 && (
                        <button 
                            onClick={handleNext}
                            className="absolute right-2 sm:right-6 md:right-12 top-1/2 -translate-y-1/2 p-2 sm:p-4 text-[#999999] opacity-40 hover:opacity-100 transition-colors outline-none cursor-pointer"
                            aria-label="Next image"
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-8 sm:h-8">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    )}

                    {/* Image and Caption Container */}
                    <div className="flex flex-col items-start justify-center max-w-[90vw] md:max-w-5xl">
                        {/\.(mp4|webm)$/i.test(currentImg.src) ? (
                            <video 
                                src={currentImg.src} 
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-auto h-auto max-h-[60vh] sm:max-h-[70vh] md:max-h-[75vh] object-contain shadow-2xl"
                            />
                        ) : (
                            <img 
                                src={currentImg.src} 
                                alt={currentImg.alt || currentImg.caption || "Lightbox full view"}
                                className="w-auto h-auto max-h-[60vh] sm:max-h-[70vh] md:max-h-[75vh] object-contain shadow-2xl"
                            />
                        )}
                        {/* Static Caption (Lightbox View) */}
                        {(currentImg.alt || currentImg.caption) && (
                            <p className="mt-4 text-sm text-[#777777] opacity-90 font-light tracking-wide w-full text-left">
                                {currentImg.alt || currentImg.caption}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
