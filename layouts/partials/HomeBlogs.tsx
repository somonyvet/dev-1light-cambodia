"use client";

import "swiper/swiper.min.css";
import {Swiper, SwiperSlide} from "swiper/react";
import Link from "next/link";
import {Autoplay, Pagination} from "swiper";
import Image from "next/image";
import {useEffect, useState} from "react";
import {BlogProps} from "@partials/Blogs";
import {useLoading} from "../../services/loading.service";
import {useTranslation} from "react-i18next";

const HomeBlogs = ({blog}) => {
    const {onSetIsLoading} = useLoading();
    const [blogs, setBlogs] = useState<BlogProps[]>([]);
    const [mounted, setMounted] = useState<boolean>(false);
    const {t} = useTranslation();

    useEffect(() => {
        setMounted(true);
        onSetIsLoading(true);
        fetch("/api/blogs", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(data => {
            setBlogs(data.data.slice(0, 2));
        }).catch(err => console.log(err)).finally(() => onSetIsLoading(false))

        // eslint-disable-next-line
    }, []);

    if (!mounted) return null;

    return <div>
        <div className="text-center">
            <div className="coatainer mx-auto lg:col-10" data-aos="fade-up">
                <h1 className="font-primary font-bold bg-gradient text-transparent bg-clip-text">{t(blog.title)}</h1>
            </div>
            {blogs.map((blog: BlogProps, index: number) => {
                const isOdd = index % 2 !== 0;
                return (
                    <section
                        key={`blog-${index}`}
                        className={`section ${index === 0 && "pt-12"} ${isOdd && "bg-theme-light"}`}
                    >
                        <div className="container">
                            <div className="items-center gap-8 md:grid md:grid-cols-2">
                                {/* Carousel */}
                                <div className={`service-carousel ${!isOdd && "md:order-2"}`} data-aos={isOdd ? "fade-up" : "fade-up"} data-aos-delay={(index + 1) * 100}>
                                    <Swiper
                                        modules={[Autoplay, Pagination]}
                                        pagination={
                                            blog.images.length > 1 ? {clickable: true} : false
                                        }
                                        autoplay={{
                                            delay: 5000,
                                            disableOnInteraction: false,
                                        }}
                                    >
                                        {/* Slides */}
                                        {blog.images.map((slide: string, index: number) => (
                                            <SwiperSlide key={index} className="aspect-[3/2] overflow-hidden relative rounded-xl">
                                                <Image src={`${slide}`} alt="" className="object-cover" fill/>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>

                                {/* Content */}
                                <div
                                    data-aos={isOdd ? "fade-up" : "fade-up"} data-aos-delay={(index + 1) * 100}
                                    className={`${isOdd ? 'text-start md:text-end' : 'text-start'} mt-5 md:mt-0 ${
                                        !isOdd && "md:order-1"
                                    }`}
                                >
                                    <h2 className="font-primary font-bold leading-[40px]">
                                        <span className="text-transparent bg-gradient bg-clip-text"> {blog.title}</span>
                                    </h2>
                                    <div className="mb-2 mt-4" dangerouslySetInnerHTML={{__html: blog.content}}></div>
                                    <Link
                                        href={`/blogs/${blog.id}`}
                                        className="cta-link inline-flex items-center"
                                    >
                                        {t("readMore")}
                                        <Image
                                            className="ml-1"
                                            src="/images/arrow-right.svg"
                                            width={18}
                                            height={18}
                                            alt="arrow"
                                            priority
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            })}
        </div>
    </div>
}

export default HomeBlogs