"use client";

import {markdownify} from "@lib/utils/textConverter";
import Link from "next/link";
import {HomeContactVideo} from "../../constants/medias";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

function Cta({cta}) {
    const [mounted, setMounted] = useState<boolean>(false);
    const {t} = useTranslation();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <section className="section px-4 pt-5 md:pt-10" data-aos="fade-up">
            <div className="section py-[70px] container rounded-xl shadow transition-all duration-300 hover:scale-105">
                <div className="row mx-auto items-center justify-center gap-10">
                    <div className="md:col-5 lg:col-4">
                        <video muted autoPlay className="w-full rounded-xl" loop>
                            <source src={HomeContactVideo} type="video/mp4"/>
                        </video>
                    </div>
                    <div className="mt-5 text-center md:col-6 lg:col-5 md:mt-0 md:text-left">
                        <h2>{t(cta?.title[0] ?? "")}</h2>
                        <h3 className="text-transparent bg-gradient bg-clip-text">{t(cta?.title[1] ?? "")}</h3>
                        <p className="my-4">{markdownify(t(cta?.content ?? ""))}</p>
                        {cta.button.enable && (
                            <Link
                                className="btn btn-primary mt-1"
                                href={cta.button.link}
                                rel={cta.button.rel}
                            >
                                {t(cta.button.label)}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cta