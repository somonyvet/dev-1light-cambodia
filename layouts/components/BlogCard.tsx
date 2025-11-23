import {FC, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import moment from "moment";

interface Props {
    id: string;
    thumbnail: string;
    title: string;
    slug?: string;
    content?: string;
    date: string | number;
    onClick?: () => void;
    view?: "horizontal" | "vertical";
}

const BlogCard: FC<Props> = ({id, thumbnail, title, slug, content, date, onClick, view = "vertical"}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [imageLoading, setImageLoading] = useState<boolean>(true);
    const router = useRouter();

    const handleClick = () => {
        setLoading(true);
        if (!loading) {
            if (onClick)
                onClick();
            else
                router.push(`/blogs/${id}`);
        }
    }

    return <div className={`w-full flex flex-col ${view === "horizontal" && "md:flex-row md:min-h-[280px]"} shadow ${loading ? "cursor-progress" : "transition-all duration-150 cursor-pointer group hover:shadow-xl"}`} onClick={handleClick}>
        <div className={`relative overflow-hidden aspect-[4/2.5] ${view === "horizontal" ? "w-full md:w-[35%]" : "w-full"}`}>
            {loading && <>
                <div className="absolute bg-stone-50/50 w-full h-full left-0 top-0 z-[1]"></div>
                <div className="absolute w-[12%] aspect-square z-[2] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Image src="/icons/tube-spinner-loading.svg" alt="loading-spinner" width={20} height={20} className="w-full h-auto"/>
                </div>
            </>}
            <Image src={imageLoading ? "/images/blank-image-placeholder.jpg" : thumbnail} alt="blog-thumbnail" fill className="object-cover transition-all duration-150 w-full group-hover:scale-105" onLoadingComplete={() => setImageLoading(false)}/>
        </div>
        <div className="py-3 px-4 space-y-2">
            <h5 className={`overflow-hidden line-clamp-1 sm:line-clamp-2 ${view === "vertical" && "text-lg md:text-xl"}`}>{title}</h5>
            {content && <div dangerouslySetInnerHTML={{__html: content}} className="text-dark overflow-hidden line-clamp-2 md:line-clamp-3"></div>}
            <p className="text-sm overflow-hidden line-clamp-1">{moment(date).format("LLL")}</p>
            <Link href={`/blogs/${id}`} className="cta-link">
                Read more
                <Image
                    className="ml-1 group-hover:ml-3"
                    src="/images/arrow-right.svg"
                    width={18}
                    height={18}
                    alt="arrow"
                    priority
                />
            </Link>
        </div>
    </div>
}

export default BlogCard