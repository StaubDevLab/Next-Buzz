import { DUMMY_NEWS } from '@/dummy-news';
import {News} from "@/@types/News";

export function getAllNews():News[] {
    return DUMMY_NEWS;
}

export function getLatestNews():News[] {
    return DUMMY_NEWS.slice(0, 3);
}

export function getAvailableNewsYears() : number[] {
    return DUMMY_NEWS.reduce<number[]>((years, news) => {
        const year  = new Date(news.date).getFullYear() as number;
        if (!years.includes(year)) {
            years.push(year);
        }
        return years;
    }, []).sort((a, b) => b - a);
}

export function getAvailableNewsMonths(year : string):number[] {
    return DUMMY_NEWS.reduce<number[]>((months, news) => {
        const newsYear = new Date(news.date).getFullYear();
        if (newsYear === +year) {
            const month = new Date(news.date).getMonth();
            if (!months.includes(month)) {
                months.push(month + 1);
            }
        }
        return months;
    }, []).sort((a, b) => b - a);
}

export function getNewsForYear(year : string):News[] {
    return DUMMY_NEWS.filter(
        (news) => new Date(news.date).getFullYear() === +year
    );
}

export function getNewsForYearAndMonth(year : string, month : string):News[] {
    return DUMMY_NEWS.filter((news) => {
        const newsYear = new Date(news.date).getFullYear();
        const newsMonth = new Date(news.date).getMonth() + 1;
        return newsYear === +year && newsMonth === +month;
    });
}