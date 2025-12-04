"use client";

import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

const HomeDonation = ({donation}) => {
    const [mounted, setMounted] = useState<boolean>(false);
    const {t} = useTranslation();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return <div className="relative">
        <div className="absolute w-[100px] h-[100px] bg-gradient left-40 top-20 rounded-3xl -z-[1]"></div>
        <div className="absolute w-[50px] h-[50px] bg-gradient right-40 bottom-40 rounded-2xl -z-[1]"></div>
        <div className="section bg-white/50 backdrop-blur-lg z-[1]">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:items-center">
                    <div className="text-center md:text-start order-2 md:order-1" data-aos="fade-up">
                        <h1 className="inline-block font-primary font-bold bg-gradient text-transparent bg-clip-text">{t(donation.title)}</h1>
                        <p className="my-4 text-base md:text-lg lg:text-xl">{t(donation.description)}</p>
                        <Link href="/donation" className="btn btn-primary rounded-full">{t(donation.cta)}</Link>
                    </div>
                    <div className="text-center relative inline-block w-2/3 aspect-square order-1 md:order-2" data-aos="zoom-in">
                        <Image
                            src="/images/home-donation-1.jpg"
                            alt="donation-img" width={300} height={300}
                            className="w-full h-auto object-cover rounded-2xl cursor-pointer transition-all duration-150 ease-linear hover:scale-105 hover:-translate-y-2 hover:z-[1] aspect-square relative left-1/2 bottom-1/2"/>
                        <Image
                            src="/images/home-donation-2.jpg"
                            alt="donation-img" width={300} height={300}
                            className="absolute left-0 top-0 w-full h-auto object-cover rounded-2xl cursor-pointer transition-all duration-150 ease-linear hover:scale-105 hover:-translate-y-2 hover:z-[1] aspect-square"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default HomeDonation