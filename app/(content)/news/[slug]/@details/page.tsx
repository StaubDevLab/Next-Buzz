import React from 'react';
import {DUMMY_NEWS} from "@/dummy-news";
import Image from "next/image";
import {notFound} from 'next/navigation'
import Link from "next/link";

const NewsDetail = ({params}: { params: { slug: string } }) => {
    const newsSlug = params.slug;
    const newsItem = DUMMY_NEWS.find(newsItem => newsItem.slug === newsSlug);
    if (!newsItem) notFound()
    return (
        <article className={"news-article"}>
            <header>
                <Link href={`/news/${newsItem?.slug}/image`}>

                <Image src={`/images/news/${newsItem?.image}`} alt={newsItem?.title} width={150} height={150}/>
                </Link>
                <h1>{newsItem?.title}</h1>
                <time dateTime={newsItem?.date}>
                    {newsItem?.date}
                </time>
            </header>
            <p>{newsItem?.content}</p>
        </article>
    );
};

export default NewsDetail;