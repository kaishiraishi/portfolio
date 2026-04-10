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
                <header className="col-span-8 md:col-span-4 self-start">
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
                <div className="col-span-8 md:col-span-3 md:col-start-6">
                    <ImageGallery
                        images={[{ src: "/image/About/About.jpg", caption: "" }]}
                        imageClassName="opacity-90 group-hover:opacity-100 transition-all duration-700"
                    />
                </div>

                {/* ─ Philosophy ─ */}
                <section className="col-span-8 md:col-span-5">
                    <h2 className="text-xs tracking-[0.3em] uppercase mb-12 opacity-70">Philosophy: Analog / Digital</h2>
                    <blockquote className="text-2xl sm:text-3xl leading-relaxed mb-12 text-center py-4">
                        “五感のインプットを、デジタルの体験へ。”
                    </blockquote>
                    <div className="space-y-8 text-lg leading-relaxed opacity-80 font-light">
                        <p>
                            どんなに技術が進歩しても、人を最後に突き動かすのは鼻腔を抜ける空気・風の肌触りや、鼓動のリズムといった根源的な体験だと私は考えます。だからこそ机上の設計図だけで作品を語らず、足で歩き、手で触れ、心で “揺らぎ” を捕まえる。そこで得た温度を、プログラムとピクセルで再構成し、ワクワクさせるデジタルな体験へ<span className="whitespace-nowrap">昇華させます。</span>
                        </p>
                        <p>
                            私が目指すのは、アルゴリズムが正解を提示して体験を最適化し、迷いや偶然を消し去ることではありません。進歩した技術を使って世界の解像度だけを上げ、可能性をそっと照らしながら、最後の意思決定は身体と直感に委ねたい。偶然が起きうる余白を守る—そんなテクノロジーのあり方を探求しています。
                        </p>
                    </div>
                </section>



                {/* ─ Hobby ─ */}
                <div className="col-span-8 mt-12">
                    <section className="max-w-[480px]">
                        <h2 className="text-xs tracking-[0.3em] uppercase mb-12 opacity-70">Hobby</h2>
                        <div className="space-y-12">
                            <div className="space-y-3">
                                <h3 className="text-2xl font-light">縦走登山</h3>
                                <p className="text-sm opacity-60 leading-relaxed">
                                    アルプスの稜線をテントを担いで歩いています。自分の足で高い所へ登り、その場の空気感を肌で感じることは、画面の中だけでは得られない強いインスピレーションの源です。
                                </p>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-2xl font-light">古民家改装</h3>
                                <p className="text-sm opacity-60 leading-relaxed">
                                    父親と共に森のログハウスを改装中。焚き火を囲み、自分の手で住環境を作り変えていくプロセスは、ものづくりの原点を感じる大切な時間です。
                                </p>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-2xl font-light">夜景スポット探し</h3>
                                <p className="text-sm opacity-60 leading-relaxed">
                                    地形図や航空写真から仮説を立て、実際に足を運んで答え合わせをする。自分だけの絶景ポイントを見つけた時の達成感は格別です。
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
