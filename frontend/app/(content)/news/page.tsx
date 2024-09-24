import React from 'react';
import NewsList from "@/components/news-list";
import {News} from "@/@types/News";
import {getAllNews} from "@/lib/news";

const NewsPage = async () => {

   const news = await getAllNews()


    return (
        <div>
            <h1>News Page</h1>

            <NewsList news={news}/>
        </div>
    );
};

export default NewsPage;