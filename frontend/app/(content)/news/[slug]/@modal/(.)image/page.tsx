'use client'
import React from 'react';
import {DUMMY_NEWS} from "@/dummy-news";
import {notFound, useRouter} from "next/navigation";
import Image from "next/image";

const ImagePage = ({params}: { params: { slug: string } }) => {
    const router = useRouter()
    const newsSlug = params.slug;
    const newsItem = DUMMY_NEWS.find(newsItem => newsItem.slug === newsSlug);
    if (!newsItem) notFound()
    return (
        <>
            <div className="modal-backdrop" onClick={()=>router.back()}>
                <dialog className="modal" open>

                    <div className={"fullscreen-image"}>
                        <Image src={`/images/news/${newsItem.image}`} alt={newsItem.title} width={500} height={500}/>
                    </div>
                </dialog>
            </div>
        </>
    );
};

export default ImagePage;