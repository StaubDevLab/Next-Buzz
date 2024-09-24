import React from 'react';
import NewsList from "@/components/news-list";
import {getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth} from "@/lib/news";
import Link from "next/link";

const FilteredNewsPage = async ({params}:{params:{filter:string}}) => {
    const filter = params.filter;
    const selectedYear = filter?.[0]
    const selectedMonth = filter?.[1]
    const years = await getAvailableNewsYears()
    let news;
    let months;
    let links = years
    if (selectedYear && !selectedMonth) {
        news = await getNewsForYear(selectedYear);
        links = await getAvailableNewsMonths(+selectedYear);
    }
    if (selectedYear && selectedMonth) {
        news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
        links = []
    }
    let newsContent = <p>No news found for the selected period</p>;

    if (news && news.length > 0) {
        newsContent = <NewsList news={news}/>
    }
    months = await getAvailableNewsMonths(+selectedYear) as number[]
    if (selectedYear && !years.includes(+selectedYear) ||
        selectedMonth && months && !months.includes(+selectedMonth)) {
        throw new Error('Invalid filter')
    }

    return (
        <>
        <header id="archive-header">
            <nav>
                <ul>
                    {links.map((link) => {
                        const href = selectedYear ? `/archive/${selectedYear}/${link}` : `/archive/${link}`;
                       return <li key={link}>
                            <Link href={href}>{link}</Link>
                        </li>
                    })}
                </ul>
            </nav>
        </header>
            {newsContent}
        </>
    );
};

export default FilteredNewsPage;