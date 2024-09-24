import {News} from "@/@types/News";
import {DUMMY_NEWS} from '@/dummy-news';
import {
    getAllNewsAction,
    getAvailableNewsMonthsAction,
    getAvailableNewsYearsAction, getNewsForYearAction, getNewsForYearAndMonthAction,
    getNewsItemAction
} from "@/lib/actions";

export  async function getAllNews():Promise<News[]> {
    return await getAllNewsAction();


}

export async function getNewsBySlug(slug:string):Promise<News> {
    return await getNewsItemAction(slug);
}
export async function getLatestNews():Promise<News[]> {
    const news = await getAllNews()
    return news.slice(0, 3);
}

export async function getAvailableNewsYears() : Promise<number[]> {

    return await getAvailableNewsYearsAction()
}

export async function getAvailableNewsMonths(year : number):Promise<number[]> {
    return await getAvailableNewsMonthsAction(year)
}

export async function getNewsForYear(year : string):Promise<News[]> {
    return await getNewsForYearAction(+year)
}

export async function getNewsForYearAndMonth(year : string, month : string):Promise<News[]> {
    return await getNewsForYearAndMonthAction(+year, +month)
}
