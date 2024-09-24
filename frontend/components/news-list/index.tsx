import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {News} from "@/@types/News";

const NewsList = ({news} : {news : News[]}) => {

    return (
        <div>
            <ul className={"news-list"}>
                {news.map((newsItem) => (
                    <li key={newsItem.id}>
                        <Link href={`/news/${newsItem.slug}`}>
                            <Image src={`/images/news/${newsItem.image}`} alt={newsItem.title} width={300}
                                   height={300}/>
                            <span>{newsItem.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsList;