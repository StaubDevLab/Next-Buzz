import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;
interface NewsItem {
  id: number;
  slug: string;
  title: string;
  image: string;
  date: string;
  content: string;
}

const DUMMY_NEWS: Omit<NewsItem, 'id'>[] = [
  {
    slug: 'will-ai-replace-humans',
    title: 'Will AI Replace Humans?',
    image: 'ai-robot.jpg',
    date: '2021-07-01',
    content:
        'Since late 2022 AI is on the rise and therefore many people worry whether AI will replace humans. The answer is not that simple. AI is a tool that can be used to automate tasks, but it can also be used to augment human capabilities. The future is not set in stone, but it is clear that AI will play a big role in the future. The question is how we will use it.',
  },
  {
    slug: 'beaver-plague',
    title: 'A Plague of Beavers',
    image: 'beaver.jpg',
    date: '2022-05-01',
    content:
        'Beavers are taking over the world. They are building dams everywhere and flooding entire cities. What can we do to stop them?',
  },
  {
    slug: 'couple-cooking',
    title: 'Spend more time together!',
    image: 'couple-cooking.jpg',
    date: '2024-03-01',
    content:
        'Cooking together is a great way to spend more time with your partner. It is fun and you get to eat something delicious afterwards. What are you waiting for? Get cooking!',
  },
  {
    slug: 'hiking',
    title: 'Hiking is the best!',
    image: 'hiking.jpg',
    date: '2024-01-01',
    content:
        'Hiking is a great way to get some exercise and enjoy the great outdoors. It is also a great way to clear your mind and reduce stress. So what are you waiting for? Get out there and start hiking!',
  },
  {
    slug: 'landscape',
    title: 'The beauty of landscape',
    image: 'landscape.jpg',
    date: '2022-07-01',
    content:
        'Landscape photography is a great way to capture the beauty of nature. It is also a great way to get outside and enjoy the great outdoors. So what are you waiting for? Get out there and start taking some pictures!',
  },
];

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initDb() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS news (
        id SERIAL PRIMARY KEY,
        slug TEXT UNIQUE,
        title TEXT,
        content TEXT,
        date TEXT,
        image TEXT
      )
    `);

    const { rows } = await client.query('SELECT COUNT(*) as count FROM news');
    if (parseInt(rows[0].count) === 0) {
      const insertQuery = `
        INSERT INTO news (slug, title, content, date, image)
        VALUES ($1, $2, $3, $4, $5)
      `;

      for (const news of DUMMY_NEWS) {
        await client.query(insertQuery, [news.slug, news.title, news.content, news.date, news.image]);
      }
    }
  } finally {
    client.release();
  }
}

const app = express();

app.use(cors());

app.get('/news', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM news');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

initDb().then(() => {
  app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
  });
}).catch(error => {
  console.error('Failed to initialize database:', error);
  process.exit(1);
});