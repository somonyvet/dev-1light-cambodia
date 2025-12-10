import {getListPage} from "@lib/contentParser";
import Blogs from "@partials/Blogs";
import config from "@config/config.json";
import SeoMeta from "@layouts/SeoMeta";

const {blog_folder} = config.settings;

const BlogPage = async () => {
    const postIndex = await getListPage(`content/${blog_folder}/_index.md`);
    const {frontmatter} = postIndex;
    const {title} = frontmatter;
    const titles = title.split(": ");

    return (
        <>
            <SeoMeta title={title}/>
            <section className="section pt-[140px]">
                <div className="container">
                    <Blogs titles={titles}/>
                </div>
            </section>
        </>
    )
}

export default BlogPage