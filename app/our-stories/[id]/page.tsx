import BlogDetail from "@layouts/BlogDetail";

interface PageProps {
    params: {
        id: string;
    }
}
const BlogDetailPage = async ({params}: PageProps) => {
    return (
        <div className="section pt-[150px]">
            <BlogDetail id={params.id}/>
        </div>
    )
}

export default BlogDetailPage