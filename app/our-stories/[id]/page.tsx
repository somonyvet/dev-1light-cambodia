import BlogDetail from "@layouts/BlogDetail";

interface PageProps {
    params: {
        id: string;
    }
}

const fetchBlogDetail = async (id: string) => {
    const res = await fetch(`/api/blogs/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    return await res.json();
}

const BlogDetailPage = async ({params}: PageProps) => {
    return (
        <div className="section pt-[150px]">
            <BlogDetail id={params.id}/>
        </div>
    )
}

export default BlogDetailPage