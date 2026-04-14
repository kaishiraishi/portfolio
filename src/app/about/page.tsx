import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | 白石 快 - Portfolio",
};

import ImageGallery from "@/components/ImageGallery";

export default function AboutPage() {
    return (
        <div className="max-w-[1152px] mx-auto px-4 md:px-8 py-20 font-extralight text-primary">
            <div className="grid grid-cols-8 gap-x-4 gap-y-24">
                {/* ─ Header ─ */}
                <header className="col-span-5 md:col-span-4 self-start">
                    <div className="space-y-12">
                        {/* ─ Name Block ─ */}
                        <div>
                            <h2 className="text-4xl sm:text-5xl font-light tracking-tight mb-2">白石 快</h2>
                            <p className="text-xl tracking-[0.1em] opacity-60 font-light font-['Helvetica_Neue',Helvetica,sans-serif]">KAI SHIRAISHI</p>
                        </div>

                        {/* ─ Basic Info & Affiliation ─ */}
                        <div className="text-sm font-light opacity-60 leading-relaxed space-y-1 mt-6">
                            <p>2003 / 07 / 21</p>
                            <p>芸術工学 / Design Engineer</p>
                            <div className="h-4"></div>
                            <p>東京都立大学</p>
                            <p>システムデザイン研究科 インダストリアルアート学域</p>
                            <p>インタフェースデザインスタジオ</p>
                            <p>データサイエンス副専攻</p>
                        </div>

                        {/* ─ Awards ─ */}
                        <section className="pt-4">

                            <ul className="space-y-3">
                                <li>
                                    <div className="text-sm">WIRED CREATIVE HACK AWARD</div>
                                    <div className="text-xs opacity-60">Finalist</div>
                                </li>
                                <li>
                                    <div className="text-sm">PLATEAU AWARD</div>
                                    <div className="text-xs opacity-60">奨励賞</div>
                                </li>
                                <li>
                                    <div className="text-sm">ENTRE BLOOM</div>
                                    <div className="text-xs opacity-60">最優秀賞</div>
                                </li>
                            </ul>
                        </section>
                    </div>
                </header>

                {/* ─ Visual ─ */}
                <div className="col-span-3 md:col-start-6 mt-12 md:mt-24">
                    <div className="scale-75 origin-top-right">
                        <ImageGallery
                            images={[{ src: "/portfolio/image/About/About.jpg", caption: "" }]}
                            imageClassName="transition-all duration-700 w-full h-auto object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100"
                        />
                    </div>
                </div>

                {/* ─ Philosophy ─ */}
                <div className="col-span-8 grid grid-cols-8 gap-x-4 items-center relative">
                    {/* Background image: 5 cols, pushed further right */}
                    <div className="col-span-8 md:col-start-4 md:col-span-5 row-start-1 z-0 pointer-events-none md:translate-x-8">
                        <ImageGallery
                            images={[{ src: "/portfolio/image/arrival_scan_15_edited.png", alt: "" }]}
                            imageClassName="w-full h-auto object-cover opacity-80"
                        />
                    </div>

                    {/* Foreground text */}
                    <section className="col-span-8 md:col-start-1 md:col-span-6 row-start-1 z-10">
                        <h2 className="text-xs tracking-[0.3em] uppercase mb-12 opacity-70">Philosophy: Analog / Digital</h2>
                        <blockquote className="text-2xl sm:text-3xl leading-relaxed mb-12 py-4">
                            “五感のインプットを、デジタルの体験へ。”
                        </blockquote>
                        <div className="space-y-8 text-lg leading-relaxed font-light">
                            <p>
                                どんなに技術が進歩しても、人を最後に突き動かすのは鼻腔を抜ける空気・風の肌触りや、鼓動のリズムといった根源的な体験だと私は考えます。だからこそ机上の設計図だけで作品を語らず、足で歩き、手で触れ、心で “揺らぎ” を捕まえる。そこで得た温度を、プログラムとピクセルで再構成し、ワクワクさせるデジタルな体験へ<span className="whitespace-nowrap">昇華させます。</span>
                            </p>
                            <p>
                                私が目指すのは、アルゴリズムが正解を提示して体験を最適化し、迷いや偶然を消し去ることではありません。進歩した技術を使って世界の解像度だけを上げ、可能性をそっと照らしながら、最後の意思決定は身体と直感に委ねたい。偶然が起きうる余白を守る—そんなテクノロジーのあり方を探求しています。
                            </p>
                        </div>
                    </section>
                </div>



                {/* ─ Hobby ─ */}
                <div className="col-span-8 mt-12">
                    <section className="w-full">
                        <h2 className="text-xs tracking-[0.3em] uppercase mb-12 opacity-70">Hobby</h2>
                        <div className="space-y-24">
                            {/* Hobby 1 */}
                            <div className="grid grid-cols-8 gap-x-4 gap-y-8 items-start">
                                <div className="col-span-8 md:col-span-3 space-y-4 md:pr-8 pt-1">
                                    <h3 className="text-2xl font-light leading-none">縦走登山</h3>
                                    <p className="text-sm opacity-60 leading-relaxed md:pr-4">
                                        アルプスの稜線をテントを担いで歩いています。自分の足で高い所へ登り、その場の空気感を肌で感じることは、画面の中だけでは得られない強いインスピレーションの源です。
                                    </p>
                                </div>
                                <div className="col-span-8 md:col-span-5">
                                    <ImageGallery
                                        images={[
                                            { src: "/portfolio/image/Hobby_1_1.jpeg", alt: "縦走登山 1" },
                                            { src: "/portfolio/image/hobby_1_2.jpg", alt: "縦走登山 2" },
                                            { src: "/portfolio/image/hobby_1_3.jpeg", alt: "縦走登山 3" }
                                        ]}
                                        galleryClassName="grid grid-cols-3 gap-3 md:gap-4"
                                        itemClassName="overflow-hidden bg-black/5 aspect-[3/4]"
                                        imageClassName="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-700"
                                    />
                                </div>
                            </div>
                            {/* Hobby 2 */}
                            <div className="grid grid-cols-8 gap-x-4 gap-y-8 items-start">
                                <div className="col-span-8 md:col-span-3 space-y-4 md:pr-8 pt-1">
                                    <h3 className="text-2xl font-light leading-none">古民家改装</h3>
                                    <p className="text-sm opacity-60 leading-relaxed md:pr-4">
                                        父親と共に森のログハウスを改装中。焚き火を囲み、自分の手で住環境を作り変えていくプロセスは、ものづくりの原点を感じる大切な時間です。
                                    </p>
                                </div>
                                <div className="col-span-8 md:col-span-5">
                                    <ImageGallery
                                        images={[
                                            { src: "/portfolio/image/Hobby_2_1.jpg", alt: "古民家改装 1" },
                                            { src: "/portfolio/image/Hobby_2_2.jpeg", alt: "古民家改装 2" },
                                            { src: "/portfolio/image/Hobby_2_3.jpeg", alt: "古民家改装 3" }
                                        ]}
                                        galleryClassName="grid grid-cols-3 gap-3 md:gap-4"
                                        itemClassName="overflow-hidden bg-black/5 aspect-[3/4]"
                                        imageClassName="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-700"
                                    />
                                </div>
                            </div>
                            {/* Hobby 3 */}
                            <div className="grid grid-cols-8 gap-x-4 gap-y-8 items-start">
                                <div className="col-span-8 md:col-span-3 space-y-4 md:pr-8 pt-1">
                                    <h3 className="text-2xl font-light leading-none">夜景スポット探し</h3>
                                    <p className="text-sm opacity-60 leading-relaxed md:pr-4">
                                        地形図や航空写真から仮説を立て、実際に足を運んで答え合わせをする。自分だけの絶景ポイントを見つけた時の達成感は格別です。
                                    </p>
                                </div>
                                <div className="col-span-8 md:col-span-5">
                                    <ImageGallery
                                        images={[
                                            { src: "/portfolio/image/hobby_3_1.jpg", alt: "夜景スポット探し 1" },
                                            { src: "/portfolio/image/hobby_3_2.jpg", alt: "夜景スポット探し 2" },
                                            { src: "/portfolio/image/hobby_3_3.JPG", alt: "夜景スポット探し 3" }
                                        ]}
                                        galleryClassName="grid grid-cols-3 gap-3 md:gap-4"
                                        itemClassName="overflow-hidden bg-black/5 aspect-[3/4]"
                                        imageClassName="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* ─ Copyright Footer ─ */}
            <div className="mt-32 pt-12 border-t border-[#999999]/30 flex justify-center">
                <div className="text-[10px] tracking-[0.12em] text-[#999999]/80 font-light font-['Helvetica_Neue',Helvetica,sans-serif] uppercase">
                    © 2026 kaishiraishi all rights reserved
                </div>
            </div>
        </div>
    );
}
