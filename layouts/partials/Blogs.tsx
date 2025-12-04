"use client";

import React, {useEffect, useState} from "react";
import BlogCard from "@components/BlogCard";
import {useTranslation} from "react-i18next";

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
    const [firstBlog, setFirstBlog] = useState<BlogProps>();
    const [restBlogs, setRestBlogs] = useState<BlogProps[]>([]);
    const [mounted, setMounted] = useState<boolean>(false);
    const [paging, setPaging] = useState(null);
    const {t} = useTranslation();

    const fetchBlogs = async (page: number) => {
        setLoading(true);
        await fetch(`/api/blogs?page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(res => {
            setFirstBlog(res.data[0]);
            const data = [...restBlogs, ...res.data];
            setRestBlogs(data);
            setPaging(res.paging);
        }).catch(err => console.log(err)).finally(() => setLoading(false))
    }

    useEffect(() => {
        setMounted(true);
        fetchBlogs(1).then();
        // eslint-disable-next-line
    }, []);

    if (!mounted) return null;

    return (
        <>
            <h1 className="h1 text-center font-bold font-primary text-transparent bg-gradient bg-clip-text" data-aos="fade-up">{t(titles[0])}</h1>
            <h2 className="h2 text-center font-bold font-primary" data-aos="fade-up" data-aos-delay={100}>{t(titles[1])}</h2>
            <div className="section pt-[50px]">
                {(loading && !restBlogs.length) ? <div className="text-center">
                    {t("loading")}
                </div> : <>
                    {firstBlog && <BlogCard id={firstBlog.id} title={firstBlog.title} thumbnail={firstBlog.thumbnail} date={firstBlog.createdAt} view="horizontal" content={firstBlog.content} data-aos="fade-up" data-aos-delay={200}/>}
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