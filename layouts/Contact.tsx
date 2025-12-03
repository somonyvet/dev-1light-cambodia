"use client";

import ContactForm from "@partials/ContactForm";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

const Contact = ({info}) => {
    const [mounted, setMounted] = useState<boolean>(false);
    const {t} = useTranslation();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return <section className="section pt-[140px]">
        <div className="container text-center">
            <h1 className="font-primary font-bold" data-aos="fade-up">{t("contact.preTitle")}</h1>
            <h1 className="bg-gradient text-transparent bg-clip-text" data-aos="fade-up" data-aos-delay={100}>{t("contact.title")}</h1>

            <div className="section row pb-0">
                <div className="content col-12 md:col-6 lg:col-5 md:text-start md:ps-5 md:order-2">
                    <h4 className="md:mt-0" data-aos="fade-up" data-aos-delay={200}>{t(info.title)}</h4>
                    <p className="mt-4" data-aos="fade-up" data-aos-delay={300}>{t(info.description)}</p>
                    <ul className="contact-list mt-5">
                        <li data-aos="fade-up" data-aos-delay={400}>
                            <span className="font-bold">{t("contact.phone")}: +885 102 661 26</span>
                        </li>
                        <li data-aos="fade-up" data-aos-delay={400}>
                            <span className="font-bold">{t("contact.form.controls.email")}: onelightworld.kh@gmail.com</span>
                        </li>
                        {/*{info.contacts.map((contact: any, index: number) => (*/}
                        {/*    <li key={index} data-aos="fade-up" data-aos-delay={(index + 4) * 100}>*/}
                        {/*        {markdownify(contact, "strong", "text-dark")}*/}
                        {/*    </li>*/}
                        {/*))}*/}
                    </ul>
                </div>
                <div className="col-12 md:col-6 lg:col-7 md:order-1">
                    <ContactForm/>
                </div>
            </div>
        </div>
    </section>
};

export default Contact;
