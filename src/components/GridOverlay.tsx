"use client";

export default function GridOverlay() {
    return (
        <div
            className="fixed inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: -1 }}
            aria-hidden="true"
        >
            {/* Vertical guides */}
            <div
                className="w-full h-full mx-auto"
                style={{
                    maxWidth: "var(--max-width)",
                }}
            >
                {/* Desktop 8-column grid */}
                <div className="hidden md:grid absolute inset-0 md:grid-cols-8 md:gap-4 md:px-8 lg:px-[72px] mx-auto w-full h-full max-w-[1152px]">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={`desk-${i}`}
                            className="h-full"
                            style={{
                                background: "var(--grid-fill-color)",
                                borderLeft: `1px solid var(--grid-line-color)`,
                                borderRight: `1px solid var(--grid-line-color)`,
                            }}
                        />
                    ))}
                </div>
                {/* Mobile 4-column grid */}
                <div className="grid md:hidden absolute inset-0 grid-cols-4 gap-4 px-4 h-full w-full">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={`mob-${i}`}
                            className="h-full"
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
