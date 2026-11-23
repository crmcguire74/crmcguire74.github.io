// Submit every sitemap URL to IndexNow (Bing, Yandex, Seznam, Naver, etc.).
// Run after a deploy is live: npm run indexnow
import fs from 'node:fs';

const HOST = 'paguire.com';
const KEY = '966d88d4c0d0267e4401105a49119247';

const sitemap = fs.readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs -> HTTP ${res.status}`);
if (!res.ok && res.status !== 202) process.exit(1);
