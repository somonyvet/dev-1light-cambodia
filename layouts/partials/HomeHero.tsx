"use client";

import {markdownify} from "@lib/utils/textConverter";
import Link from "next/link";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {HomeHeroVideo} from "../../constants/medias";
import {useTranslation} from "react-i18next";

const HomeHero = ({hero}) => {
    const [mounted, setMounted] = useState<boolean>(false);
    const [muted, setMuted] = useState<boolean>(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const {t, i18n} = useTranslation();

    const onToggleAudio = () => {
        if (muted && videoRef.current)
            videoRef.current.play().then();
        setMuted(!muted);
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <section className="section pt-[140px]">
            <div className="container">
                <div className="row md:text-center">
                    <div className="mx-auto lg:col-10">
                    <h1 className={`font-primary font-bold bg-gradient text-transparent bg-clip-text ${i18n.language === "km" && "leading-[60px] sm:leading-[80px]"}`} data-aos="fade-up">{t(hero.title)}</h1>
                        <p className="mt-4 text-base md:text-lg lg:text-xl" data-aos="fade-up" data-aos-delay={100}>{markdownify(t(hero.content))}</p>
                        <div className="mt-4 flex gap-2 md:gap-5 md:justify-center">
                            {hero.ctaButtons.map((btn: any, index: number) => (
                                <div key={index} data-aos={index ? "fade-up" :"fade-up"} data-aos-delay={200}>
                                    <Link
                                        className={`btn ${btn.variant}`}
                                        href={btn.link}
                                    >
                                        {t(btn.label)}
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 relative" data-aos="fade-up" data-aos-delay={300}>
                            <video className="w-full h-auto rounded-xl" loop autoPlay muted={muted} ref={videoRef}>
                                <source src={HomeHeroVideo} type="video/mp4"/>
                            </video>
                            <button className="z-10 absolute w-10 h-10 rounded-full right-3 bottom-3 border-0 bg-dark/50 text-center content-center p-0 hover:bg-dark/75" onClick={onToggleAudio}>
                                <Image src={muted ? "/icons/unmuted.svg" : "/icons/muted.svg"} alt="mute-control" width={20} height={20} className="mx-auto"/>
                            </button>
                        </div>
                        {/*<Image*/}
                        {/*    className="mx-auto mt-12 rounded-xl"*/}
                        {/*    src={hero.image}*/}
                        {/*    width={750}*/}
                        {/*    height={390}*/}
                        {/*    style={{width: "auto", height: "auto"}}*/}
                        {/*    alt="hero-image"*/}
                        {/*    priority*/}
                        {/*    data-aos="fade-up"*/}
                        {/*    data-aos-delay={300}*/}
                        {/*/>*/}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeHero;
