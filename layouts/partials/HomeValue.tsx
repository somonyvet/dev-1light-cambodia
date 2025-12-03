"use client";

import {markdownify} from "@lib/utils/textConverter";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

const HomeValue = ({value}) => {
    const [mounted, setMounted] = useState<boolean>(false);
    const {t} = useTranslation();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return <div className="relative">
        <div className="absolute w-[100px] h-[100px] bg-gradient left-40 top-20 -z-[1] animate-pulse"></div>
        <div className="absolute w-[100px] h-[100px] bg-gradient right-40 bottom-40 rounded-full -z-[1] animate-pulse"></div>
        <div className="section bg-white/50 backdrop-blur-lg z-[1]">
            <div className="container">
                <div className="row text-center">
                    <div className="mx-auto lg:col-10" data-aos="fade-up">
                        <h1 className="text-black">{t(value.preTitle)} <span
                            className="font-primary font-bold bg-gradient text-transparent bg-clip-text">{t(value.title)}</span>
                        </h1>
                        <p className="mt-4 text-base md:text-lg lg:text-xl" data-aos="fade-up" data-aos-delay={100}>{markdownify(t(value.subTitle))}</p>
                    </div>
                    <div className="my-20 grid grid-cols-1 md:grid-cols-2 gap-10">
                        {value.actions.map((action: any, index: number) => (
                            <div key={index} className="md:text-start" data-aos={index ? "fade-up" : "fade-up"} data-aos-delay={200}>
                                <h3>{t(action.heading)}</h3>
                                <p className="my-4">{t(action.body)}</p>
                                <Link href={action.link} target="_blank" className="btn btn-primary rounded-full">{t(action.cta)}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default HomeValue;
