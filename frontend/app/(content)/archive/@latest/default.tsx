import React from 'react';
import {getLatestNews} from "@/lib/news";
import NewsList from "@/components/news-list";

const LatestNewsPage = async () => {
    const latestNews = await getLatestNews();

    return (
        <div>
            <h1>Latest News Page</h1>
            <NewsList news={latestNews} />
        </div>
    );
};

export default LatestNewsPage;