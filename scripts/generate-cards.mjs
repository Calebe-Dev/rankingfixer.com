// Gera o card de compartilhamento (Open Graph / Twitter, 1200×630 JPG) de cada página a partir do
// build: título = H1 da página. Uso: npm run build && npm run cards (e build de novo para publicar).
// Requer Google Chrome e ffmpeg instalados (renderização local, sem serviço externo).
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const BUILD = path.join(ROOT, '.svelte-kit/cloudflare');
const OUT = path.join(ROOT, 'static/images/share');
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'cards-'));
fs.mkdirSync(OUT, { recursive: true });

const dec = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

// rótulo do card por tipo de página
const label = (slug) => {
	if (slug === 'home') return 'Technical SEO consultant and developer';
	if (slug === 'guides') return 'Guides';
	if (slug.startsWith('guides-')) return 'Technical SEO guide';
	if (slug === 'about') return 'About';
	if (['white-label-technical-seo', 'technical-seo-for-law-firms', 'ecommerce-technical-seo'].includes(slug)) return 'Who it is for';
	return 'Service';
};

// todas as páginas .html do build, inclusive em subpastas (guides/...)
const pages = (dir, base = '') =>
	fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
		if (e.isDirectory()) return e.name.startsWith('_') ? [] : pages(path.join(dir, e.name), `${base}${e.name}/`);
		return e.name.endsWith('.html') && e.name !== '404.html' ? [`${base}${e.name}`] : [];
	});

for (const file of pages(BUILD)) {
	const html = fs.readFileSync(path.join(BUILD, file), 'utf8');
	const slug = file === 'index.html' ? 'home' : file.replace(/\.html$/, '').replace(/\//g, '-');
	const h1 = dec((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1].replace(/<[^>]+>/g, '').trim());
	const size = h1.length > 52 ? 58 : h1.length > 36 ? 66 : 74;
	const card = `<!doctype html><html><head><meta charset="utf-8"><style>
		html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#0b1220;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}
		.light{position:absolute;inset:0;background:
			radial-gradient(640px 420px at 0% 0%,rgba(18,194,107,.28),transparent 70%),
			radial-gradient(560px 420px at 100% 100%,rgba(59,130,246,.22),transparent 70%)}
		.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(233,238,248,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(233,238,248,.06) 1px,transparent 1px);
			background-size:48px 48px;-webkit-mask-image:linear-gradient(to bottom,#000 20%,transparent)}
		.gauge{position:absolute;right:72px;top:50%;transform:translateY(-50%);width:300px;height:300px}
		.content{position:absolute;left:72px;top:64px;bottom:64px;width:720px;display:flex;flex-direction:column}
		.brand{display:flex;align-items:center;gap:16px;color:#fff;font-weight:800;font-size:32px;letter-spacing:-.02em}
		.brand img{width:60px;height:60px}
		.label{margin-top:auto;align-self:flex-start;padding:8px 18px;border-radius:999px;font-size:20px;font-weight:700;color:#0b1220;background:#12c26b}
		h1{margin:20px 0 0;color:#fff;font-size:${size}px;line-height:1.04;letter-spacing:-.035em;font-weight:850}
		.foot{margin-top:28px;color:#a9b5cc;font-size:24px;font-weight:600}
		.foot b{color:#fff}
		.bar{position:absolute;left:0;right:0;bottom:0;height:10px;background:linear-gradient(90deg,#ff4e42,#e67700,#12c26b)}
	</style></head><body>
		<div class="light"></div><div class="grid"></div>
		<svg class="gauge" viewBox="0 0 120 120" fill="none">
			<circle cx="60" cy="60" r="50" stroke="#1b2640" stroke-width="12"/>
			<circle cx="60" cy="60" r="50" stroke="#12c26b" stroke-width="12" stroke-linecap="round" stroke-dasharray="314 314" transform="rotate(-90 60 60)"/>
			<text x="60" y="72" text-anchor="middle" font-family="system-ui,sans-serif" font-size="34" font-weight="800" fill="#7ee2a8">100</text>
		</svg>
		<div class="content">
			<div class="brand"><img src="file://${ROOT}/static/images/logo.svg">Ranking Fixer</div>
			<div class="label">${esc(label(slug))}</div>
			<h1>${esc(h1)}</h1>
			<div class="foot"><b>rankingfixer.com</b> · Technical SEO fixes by a developer</div>
		</div>
		<div class="bar"></div>
	</body></html>`;
	const htmlFile = path.join(TMP, `${slug}.html`);
	const png = path.join(TMP, `${slug}.png`);
	fs.writeFileSync(htmlFile, card);
	execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--allow-file-access-from-files',
		'--window-size=1200,630', `--user-data-dir=${path.join(TMP, 'profile')}`, `--screenshot=${png}`, `file://${htmlFile}`], { stdio: 'ignore' });
	execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', png, '-q:v', '3', path.join(OUT, `${slug}.jpg`)]);
	console.log(`${slug}.jpg  ${Math.round(fs.statSync(path.join(OUT, `${slug}.jpg`)).size / 1024)} KB  "${h1}"`);
}
