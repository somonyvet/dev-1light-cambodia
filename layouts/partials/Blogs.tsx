"use client";

import {useEffect, useState} from "react";
import BlogCard from "@components/BlogCard";

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

const Blogs = ({blogs}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [firstBlog, setFirstBlog] = useState<BlogProps>();
    const [restBlogs, setRestBlogs] = useState<BlogProps[]>([]);

    useEffect(() => {
        setLoading(true);
        fetch("/api/blogs", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(data => {
            setFirstBlog(data.data[0]);
            setRestBlogs(data.data.slice(0));
        }).catch(err => console.log(err)).finally(() => setLoading(false))
    }, []);

    return (
        <div className="section pt-[50px]">
            {loading ? <div className="text-center">
                Loading...
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
        </div>
    )
}

export default Blogs