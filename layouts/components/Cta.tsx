import {markdownify} from "@lib/utils/textConverter";
import Link from "next/link";

function Cta({cta}) {
    return (
        <section className="section px-4 pt-5 md:pt-10" data-aos="fade-up">
            <div className="section py-[70px] container rounded-xl shadow transition-all duration-300 hover:scale-105">
                <div className="row mx-auto items-center justify-center gap-10">
                    <div className="md:col-5 lg:col-4">
                        {/*<Image*/}
                        {/*    className="w-full"*/}
                        {/*    src={cta?.image}*/}
                        {/*    alt="call to action image"*/}
                        {/*    width={325}*/}
                        {/*    height={206}*/}
                       {/*/>*/}
                        <video muted autoPlay className="w-full rounded-xl" loop>
                            <source src="/videos/contact-vdo.MP4" type="video/mp4"/>
                        </video>
                    </div>
                    <div className="mt-5 text-center md:col-6 lg:col-5 md:mt-0 md:text-left">
                        <h2>{cta?.title[0]}</h2>
                        <h3 className="text-transparent bg-gradient bg-clip-text">{cta?.title[1]}</h3>
                        <p className="my-4">{markdownify(cta?.content)}</p>
                        {cta.button.enable && (
                            <Link
                                className="btn btn-primary mt-1"
                                href={cta.button.link}
                                rel={cta.button.rel}
                            >
                                {cta.button.label}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cta