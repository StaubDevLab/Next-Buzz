import React from 'react';
import {DUMMY_NEWS} from "@/dummy-news";
import Image from "next/image";
import {notFound} from 'next/navigation'
import Link from "next/link";
import {getNewsBySlug} from "@/lib/news";
import {News} from "@/@types/News";

const NewsDetail = async ({params}: { params: { slug: string } }) => {
    const newsSlug = params.slug;
    const newsItem = await getNewsBySlug(newsSlug) as News;
    console.log("NEWSITEM", newsItem)
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