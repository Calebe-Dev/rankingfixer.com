import { SITE_URL, modifiedDate, publishedDate } from '$lib/site';

export const prerender = true;

// Todas as páginas do site, descobertas no build: página nova entra no sitemap sozinha.
// Ordem: home primeiro, depois das páginas publicadas mais recentemente para as mais antigas
// (empate: última alteração, depois o caminho), para as novas aparecerem no topo do arquivo.
const paths = Object.keys(import.meta.glob('/src/routes/**/+page.svelte'))
	.map((file) => file.replace('/src/routes', '').replace('/+page.svelte', '') || '/')
	.filter((path) => !path.includes('['))
	.sort(
		(a, b) =>
			Number(b === '/') - Number(a === '/') ||
			publishedDate(b).localeCompare(publishedDate(a)) ||
			modifiedDate(b).localeCompare(modifiedDate(a)) ||
			a.localeCompare(b)
	);

export function GET() {
	const urls = paths
		.map((path) => {
			const loc = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
			// lastmod = última mudança de conteúdo da própria página (a mesma do dateModified do schema)
			return `\t<url>\n\t\t<loc>${loc}</loc>\n\t\t<lastmod>${modifiedDate(path)}</lastmod>\n\t</url>`;
		})
		.join('\n');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
		{ headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
	);
}
