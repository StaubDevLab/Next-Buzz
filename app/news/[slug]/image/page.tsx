import React from 'react';
import {DUMMY_NEWS} from "@/dummy-news";
import {notFound} from "next/navigation";
import Image from "next/image";

const ImagePage = ({params} : {params:{slug:string}}) => {
    const newsSlug = params.slug;
    const newsItem = DUMMY_NEWS.find(newsItem => newsItem.slug === newsSlug);
    if (!newsItem) notFound()
    return (
        <div className={"fullscreen-image"}>
            <Image src={`/images/news/${newsItem.image}`} alt={newsItem.title} width={1000} height={1000}/>
        </div>
    );
};

export default ImagePage;