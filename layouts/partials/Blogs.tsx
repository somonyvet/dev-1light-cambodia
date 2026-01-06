"use client";

import React, {useEffect, useRef, useState} from "react";
import BlogCard from "@components/BlogCard";
import {useTranslation} from "react-i18next";
import {BlogVideo} from "../../constants/medias";
import Image from "next/image";

const StaticBlogContent = "<p>\n" +
    "  She is a mental-health patient who has already healed more than\n" +
    "  <strong>80%</strong> through proper medication.\n" +
    "</p>\n" +
    "\n" +
    "<p>\n" +
    "  Today, <strong>One Light</strong> continues to support her by providing the\n" +
    "  medicine she can no longer afford, ensuring she can complete her full\n" +
    "  treatment course and continue her journey toward recovery.\n" +
    "</p>\n" +
    "\n" +
    "<p>\n" +
    "  <span style=\"color: dodgerblue;\">#onelight</span>\n" +
    "  <span style=\"color: dodgerblue;\">#MissWorld</span>\n" +
    "  <span style=\"color: dodgerblue;\">#mentalhealth</span>\n" +
    "  <span style=\"color: dodgerblue;\">#mentalhealthmatters</span>\n" +
    "</p>\n";

export interface BlogProps {
    id: string;
    title: string;
    slug: string;
    content: string;
    thumbnail: string;
    images: string[];
    status: "published";
    createdAt: string | number | null;
    updatedAt: number | null;
}

const Blogs = ({titles}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [restBlogs, setRestBlogs] = useState<BlogProps[]>([]);
    const [mounted, setMounted] = useState<boolean>(false);
    const [paging, setPaging] = useState(null);
    const {t} = useTranslation();
    const [muted, setMuted] = useState<boolean>(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const fetchBlogs = async (page: number) => {
        setLoading(true);
        await fetch(`/api/blogs?page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(res => {
            const data = [...restBlogs, ...res.data];
            setRestBlogs(data);
            setPaging(res.paging);
        }).catch(err => console.log(err)).finally(() => setLoading(false))
    }

    const onToggleAudio = () => {
        if (muted && videoRef.current)
            videoRef.current.play().then();
        setMuted(!muted);
    }

    useEffect(() => {
        setMounted(true);
        fetchBlogs(1).then();
        setMounted(true);
        // eslint-disable-next-line
    }, []);

    if (!mounted) return null;

    return (
        <>
            <h1 className="h1 text-center font-bold font-primary text-transparent bg-gradient bg-clip-text"
                data-aos="fade-up">{t(titles[0])}</h1>
            <h2 className="h2 text-center font-bold font-primary" data-aos="fade-up"
                data-aos-delay={100}>{t(titles[1])}</h2>
            <div className="section pt-[50px]">
                {(loading && !restBlogs.length) ? <div className="text-center">
                    {t("loading")}
                </div> : <>
                    {/*{firstBlog && <BlogCard id={firstBlog.id} title={firstBlog.title} thumbnail={firstBlog.thumbnail} date={firstBlog.createdAt} view="horizontal" content={firstBlog.content} data-aos="fade-up" data-aos-delay={200}/>}*/}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                        <div className="relative" data-aos="fade-up" data-aos-delay={300}>
                            <video className="w-full aspect-video rounded-xl border" loop autoPlay muted={muted}
                                   ref={videoRef}>
                                <source src={BlogVideo} type="video/mp4"/>
                            </video>
                            <button
                                className="z-10 absolute w-10 h-10 rounded-full right-3 bottom-3 border-0 bg-dark/50 text-center content-center p-0 hover:bg-dark/75"
                                onClick={onToggleAudio}>
                                <Image src={muted ? "/icons/unmuted.svg" : "/icons/muted.svg"} alt="mute-control"
                                       width={20} height={20} className="mx-auto"/>
                            </button>
                        </div>
                        <div className="space-y-3">
                            <h4>Listening to the Heart: An Interview with a Mental Health Fighter</h4>
                            <div dangerouslySetInnerHTML={{__html: StaticBlogContent}}></div>
                        </div>
                    </div>
                    <div className="mt-[70px] grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-5">
                        {restBlogs.map((blog: BlogProps, index: number) => (
                            <div key={index} data-aos="fade-up" data-aos-delay={(index + 3) * 100}>
                                <BlogCard key={index} id={blog.id} title={blog.title} thumbnail={blog.thumbnail} date={blog.createdAt}/>
                            </div>
                        ))}
                    </div>
                </>}
                {(paging?.page < paging?.totalPages) && <button className="btn btn-outline-primary block mx-auto mt-10" onClick={() => fetchBlogs(paging.page + 1)}>{loading ? t("loadingMore") : t("loadMore")}</button>}
            </div>
        </>
    )
}

export default Blogs