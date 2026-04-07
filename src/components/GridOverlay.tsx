"use client";

export default function GridOverlay() {
    return (
        <div
            className="fixed inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: -1 }}
            aria-hidden="true"
        >
            {/* 8-column vertical guides — uses CSS tokens from globals.css */}
            <div
                className="w-full h-full mx-auto"
                style={{
                    maxWidth: "var(--max-width)",
                    paddingLeft: "var(--margin-desktop)",
                    paddingRight: "var(--margin-desktop)",
                }}
            >
                <div
                    className="h-full"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(var(--grid-columns), 1fr)",
                        gap: "var(--gutter)",
                    }}
                >
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            style={{
                                background: "var(--grid-fill-color)",
                                borderLeft: `1px solid var(--grid-line-color)`,
                                borderRight: `1px solid var(--grid-line-color)`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
