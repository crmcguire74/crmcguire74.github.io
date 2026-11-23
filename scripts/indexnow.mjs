// Notify IndexNow search engines (Bing, Yandex, Seznam, Naver, Yep) that pages changed.
// Run only after the Netlify deploy is live.
//
//   npm run indexnow                          # submit every URL in the sitemap
//   npm run indexnow -- /resume/ /blog/       # submit only specific pages
//   npm run indexnow -- --dry-run             # print what would be sent, send nothing
import fs from 'node:fs';

const HOST = 'paguire.com';
const KEY = '966d88d4c0d0267e4401105a49119247';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const paths = args.filter((arg) => !arg.startsWith('--'));

let urlList;
if (paths.length) {
  urlList = paths.map((p) => new URL(p, `https://${HOST}/`).href);
} else {
  const sitemap = fs.readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
  urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

console.log(`IndexNow: ${urlList.length} URL(s)`);
urlList.forEach((u) => console.log(`  ${u}`));
if (dryRun) {
  console.log('Dry run: nothing submitted.');
  process.exit(0);
}

// Make sure the key file is reachable first; engines reject submissions otherwise.
const keyRes = await fetch(KEY_LOCATION);
const keyBody = keyRes.ok ? (await keyRes.text()).trim() : '';
if (keyBody !== KEY) {
  console.error(`Key file not live at ${KEY_LOCATION} (HTTP ${keyRes.status}). Deploy first.`);
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});

const MEANING = {
  200: 'OK - URLs accepted.',
  202: 'Accepted - key validation pending; this is normal on the first submission.',
  400: 'Bad request - invalid format.',
  403: 'Forbidden - key not valid or key file not found.',
  422: 'Unprocessable - URLs do not belong to the host, or key mismatch.',
  429: 'Too many requests - slow down and retry later.',
};
console.log(`HTTP ${res.status}: ${MEANING[res.status] || res.statusText}`);
if (res.status !== 200 && res.status !== 202) process.exit(1);
