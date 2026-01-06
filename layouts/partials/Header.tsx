"use client";

import Logo from "@components/Logo";
import menu from "@config/menu.json";
import Link from "next/link";
import {usePathname} from "next/navigation";
import React, {useContext, useEffect, useState} from "react";
import config from "../../config/config.json";
import {checkIsActive} from "@lib/utils/route";
import {useTranslation} from "react-i18next";
import Image from "next/image";
import {AppContext} from "@components/AppTranslation";

const Header = () => {
    const [mounted, setMounted] = useState<boolean>(false);
    const [navOpen, setNavOpen] = useState<boolean>(false);
    const pathname = usePathname();
    const {main} = menu as any;
    const {logo} = config.site;
    const {enable, label, link} = config.nav_button;
    const {t, i18n} = useTranslation();
    const {onLocaleChange} = useContext(AppContext);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <header className="header" data-aos="fade-down">
            <nav className="navbar container pl-0.5">
                {/* logo */}
                <div className="order-0">
                    <Logo src={logo}/>
                </div>

                {/* navbar toggler */}
                <div className="flex gap-2 justify-end items-center">
                    <div className="relative group block md:hidden">
                        <div className="h-full bg-transparent border-0 outline-0 transition-all duration-150 p-1.5 rounded-md hover:bg-stone-200">
                            <Image src={i18n.language === "en" ? "/icons/english.svg" : "/icons/khmer.svg"} alt="lang-flag" width={24} height={24}/>
                        </div>
                        <div className="absolute w-[150px] h-auto top-full right-0 bg-white shadow-lg rounded-lg py-3 hidden group-hover:block" role="alert">
                            <button className={`h-full bg-transparent border-0 outline-0 transition-all duration-150 px-3 py-2 hover:bg-stone-200 hover:pl-4 flex gap-2 items-center w-full ${i18n.language === "en" && "text-black"}`} onClick={() => onLocaleChange("en")}>
                                <Image src="/icons/english.svg" alt="lang-flag" width={24} height={24}/>
                                {t("english")}
                                {i18n.language === "en" && <Image src="/icons/check.svg" alt="check" width={18} height={18} className="ml-2"/>}
                            </button>
                            <button className={`h-full bg-transparent border-0 outline-0 transition-all duration-150 px-3 py-2 hover:bg-stone-200 hover:pl-4 flex gap-1.5 items-center w-full ${i18n.language === "km" && "text-bla"}`} onClick={() => onLocaleChange("km")}>
                                <Image src="/icons/khmer.svg" alt="lang-flag" width={24} height={24}/>
                                {t("khmer")}
                                {i18n.language === "km" && <Image src="/icons/check.svg" alt="check" width={18} height={18} className="ml-2"/>}
                            </button>
                        </div>
                    </div>
                    <button
                        id="show-button"
                        className="order-2 flex cursor-pointer items-center md:order-1 md:hidden"
                        onClick={() => setNavOpen(!navOpen)}
                    >
                        {navOpen ? (
                            <svg className="h-6 fill-current" viewBox="0 0 20 20">
                                <title>Menu Open</title>
                                <polygon
                                    points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                                    transform="rotate(45 10 10)"
                                />
                            </svg>
                        ) : (
                            <svg className="h-6 fill-current" viewBox="0 0 20 20">
                                <title>Menu Close</title>
                                <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"/>
                            </svg>
                        )}
                    </button>
                </div>

                {/* Menu */}
                <div
                    id="nav-menu"
                    className={`transition-all duration-500 order-3 md:order-1 lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-1/2 ${
                        navOpen ? "max-h-[1000px]" : "max-h-0"
                    }`}
                >
                    <ul className="navbar-nav block w-full md:flex md:w-auto lg:space-x-2">
                        {main.map((menu: any, i: number) => (
                            <React.Fragment key={`menu-${i}`}>
                                {menu.hasChildren ? (
                                    <li className="nav-item nav-dropdown group relative">
                                        <span className="nav-link inline-flex items-center">{menu.name}
                                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                            </svg>
                                        </span>
                                        <ul
                                            className="nav-dropdown-list hidden group-hover:block md:invisible md:absolute md:block md:opacity-0 md:group-hover:visible md:group-hover:opacity-100">
                                            {menu.children.map((child: any, i: number) => (
                                                <li className="nav-dropdown-item" key={`children-${i}`}>
                                                    <Link
                                                        href={child.url}
                                                        className="nav-dropdown-link block"
                                                    >
                                                        {t(child.name)}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <Link
                                            href={menu.url}
                                            onClick={() => setNavOpen(false)}
                                            className={`nav-link inline-block ${
                                                checkIsActive(pathname, menu.url) ? "nav-link-active" : ""
                                            }`}
                                        >
                                            {t(menu.name)}
                                        </Link>
                                    </li>
                                )}
                            </React.Fragment>
                        ))}
                        {enable && (
                            <li className="md:hidden my-3">
                                <Link
                                    className="btn btn-primary rounded-full z-0 py-[14px]"
                                    href={link}
                                    rel=""
                                >
                                    {t(label)}
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                {enable && (
                    <div
                        className="order-1 ml-auto hidden items-center justify-end md:order-2 md:ml-0 md:flex gap-2">
                        <Link className="btn btn-primary z-0 py-3 px-6 rounded-full" href={link}>
                            {t(label)}
                        </Link>
                        <div className="relative group">
                            <div className="h-full bg-transparent border-0 outline-0 transition-all duration-150 px-3 py-2 rounded-lg hover:bg-stone-200 flex gap-1 items-center w-[120px]">
                                <Image src={i18n.language === "en" ? "/icons/english.svg" : "/icons/khmer.svg"} alt="lang-flag" width={24} height={24}/>
                                {i18n.language === "en" ? t("english") : t("khmer")}
                            </div>
                            <div className="absolute w-[130%] h-auto top-full right-0 bg-white shadow-lg rounded-lg py-3 hidden group-hover:block" role="alert">
                                <button className={`h-full bg-transparent border-0 outline-0 transition-all duration-150 px-3 py-2 hover:bg-stone-200 hover:pl-4 flex gap-1.5 items-center w-full ${i18n.language === "en" && "text-black"}`} onClick={() => onLocaleChange("en")}>
                                    <Image src="/icons/english.svg" alt="lang-flag" width={24} height={24}/>
                                    {t("english")}
                                    {i18n.language === "en" && <Image src="/icons/check.svg" alt="check" width={18} height={18} className="ml-2"/>}
                                </button>
                                <button className={`h-full bg-transparent border-0 outline-0 transition-all duration-150 px-3 py-2 hover:bg-stone-200 hover:pl-4 flex gap-1.5 items-center w-full ${i18n.language === "km" && "text-bla"}`} onClick={() => onLocaleChange("km")}>
                                    <Image src="/icons/khmer.svg" alt="lang-flag" width={24} height={24}/>
                                    {t("khmer")}
                                    {i18n.language === "km" && <Image src="/icons/check.svg" alt="check" width={18} height={18} className="ml-2"/>}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Header