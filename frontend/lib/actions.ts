'use server'
import pg from 'pg'

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const getAllNewsAction = async ()=>{
    try {
        const { rows } = await pool.query('SELECT * FROM news');
        await new Promise(resolve => setTimeout(resolve, 2000));
        return rows;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

export const getNewsItemAction = async (slug:string)=>{
    try{
        const { rows } = await pool.query('SELECT * FROM news WHERE slug = $1',[slug]);
        return rows[0];
    }catch (error){
        console.error('Error fetching news:', error);
        return {};
    }
}

export const getAvailableNewsYearsAction = async ()=>{
    const years = await pool.query("SELECT TO_CHAR(TO_TIMESTAMP(date, 'YYYY'), 'YYYY') as year FROM news")
    return years.rows.map((year) => +year.year)

}

export const getAvailableNewsMonthsAction = async (year : number)=>{
    const months = await pool.query("SELECT DISTINCT TO_CHAR(TO_TIMESTAMP(date, 'YYYY-MM-DD'), 'MM') AS month FROM news WHERE TO_CHAR(TO_TIMESTAMP(date, 'YYYY-MM-DD'), 'YYYY') = $1", [year])
    return months.rows.map((month) => +month.month);
}

export async function getNewsForYearAction(year:number) {
    const news = await pool
        .query(
            "SELECT * FROM news WHERE TO_CHAR(TO_TIMESTAMP(date, 'YYYY-MM-DD'), 'YYYY') = $1 ORDER BY date DESC", [year]
        )

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return news.rows;
}

export async function getNewsForYearAndMonthAction(year:number, month:number) {
    const news = await pool
        .query(
            "SELECT * FROM news WHERE TO_CHAR(TO_TIMESTAMP(date, 'YYYY-MM-DD'), 'YYYY') = $1 AND TO_CHAR(TO_TIMESTAMP(date, 'YYYY-MM-DD'), 'MM') = $2 ORDER BY date DESC",[year, month]
        )

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return news.rows;
}