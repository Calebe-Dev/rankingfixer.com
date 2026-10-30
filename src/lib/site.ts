// Fonte única dos dados do site: usada no HTML, no JSON-LD, no sitemap e nos cards.

export const SITE_URL = 'https://rankingfixer.com';
export const BRAND = 'Ranking Fixer';

// Datas de cada página, completas (ISO 8601 com fuso de Brasília), formato que o Google pede nos dados
// estruturados. Publicação: lançamento em 25/10/2026; páginas criadas depois têm a própria data.
// Alteração: última mudança relevante, no critério do Google para o lastmod do sitemap: conteúdo
// principal, dados estruturados ou links. Mudanças que valem para todas as páginas (schema, menu)
// atualizam SITEWIDE; as de uma página só entram em modifiedOn. As mesmas datas alimentam o JSON-LD,
// os metadados Open Graph, o lastmod do sitemap e o "Page updated on".
const TIME = 'T09:00:00-03:00';
const LAUNCH = '2026-10-25';
// 26/10/2026: dados estruturados ampliados e Reino Unido no menu de todas as páginas
// 29/10/2026: cinco guias novos no menu e no rodapé de todas as páginas
const SITEWIDE = '2026-10-29';
const publishedOn: Record<string, string> = {
	'/technical-seo-uk': '2026-10-26',
	'/guides/discovered-currently-not-indexed': '2026-10-29',
	'/guides/duplicate-without-user-selected-canonical': '2026-10-29',
	'/guides/soft-404': '2026-10-29',
	'/guides/sitemap-could-not-be-read': '2026-10-29',
	'/guides/website-disappeared-from-google': '2026-10-29'
};
// 29/10/2026: title e H1 da home com "technical SEO consultant"; seção de WordPress no guia de Core
// Web Vitals; links para os guias novos nas páginas do cluster de indexação e de migração
const modifiedOn: Record<string, string> = {
	'/': '2026-10-29',
	'/guides': '2026-10-29',
	'/guides/core-web-vitals-assessment-failed': '2026-10-29',
	'/guides/crawled-currently-not-indexed': '2026-10-29',
	'/guides/website-not-showing-on-google': '2026-10-29',
	'/google-indexing-issues': '2026-10-29',
	'/seo-website-migration': '2026-10-29'
};
const latest = (...dates: (string | undefined)[]) => dates.filter(Boolean).sort().at(-1) as string;
export const publishedDate = (path: string) => publishedOn[path] ?? LAUNCH;
export const modifiedDate = (path: string) => latest(publishedDate(path), SITEWIDE, modifiedOn[path]);
export const datePublished = (path: string) => `${publishedDate(path)}${TIME}`;
export const dateModified = (path: string) => `${modifiedDate(path)}${TIME}`;

// Data mais recente de todo o site (copyright e llms.txt)
export const UPDATED = latest(LAUNCH, SITEWIDE, ...Object.values(publishedOn), ...Object.values(modifiedOn));

// Responsável pelo site. O @id é o mesmo da página pessoal (calebearaujo.com.br): os dois sites
// descrevem a mesma entidade, e o Google consolida os sinais de autoria nela.
export const person = {
	id: 'https://calebearaujo.com.br/#pessoa',
	name: 'Calebe Araujo',
	fullName: 'Calebe Sousa de Araujo',
	jobTitle: 'Technical SEO Consultant and Full-Stack Developer',
	homepage: 'https://calebearaujo.com.br/',
	linkedin: 'https://www.linkedin.com/in/calebe-dev',
	github: 'https://github.com/Calebe-Dev',
	description:
		'Full-stack developer and tech lead building websites since 2015, first as a freelancer. Audits websites and fixes technical SEO problems in the code: indexing, Core Web Vitals, structured data and migrations.',
	city: 'Sorocaba',
	region: 'SP',
	country: 'Brazil',
	countryCode: 'BR',
	// emprego atual, o mesmo do schema de autor no calebearaujo.com.br
	employer: { name: 'Grupo OC', url: 'https://grupooc.com.br/' }
};

// Perfis oficiais: os mesmos do sameAs do autor no calebearaujo.com.br (entidade única nos dois sites)
export const socials = [
	{ name: 'LinkedIn', url: 'https://www.linkedin.com/in/calebe-dev' },
	{ name: 'GitHub', url: 'https://github.com/Calebe-Dev' },
	{ name: 'YouTube', url: 'https://www.youtube.com/@calebe_tech' },
	{ name: 'Instagram', url: 'https://www.instagram.com/calebe_original/' },
	{ name: 'Facebook', url: 'https://www.facebook.com/calebearaujo101/' }
];

export const contact = {
	// provisório: trocar por hello@rankingfixer.com quando o Email Routing da Cloudflare estiver ativo
	email: 'calebe.development@gmail.com',
	whatsapp: 'https://wa.me/5511988385247',
	whatsappDisplay: '+55 11 98838-5247'
};

// Todo CTA de conversão abre um e-mail. O assunto identifica a página de origem do lead
// (atribuição sem JavaScript) e o corpo pede o que eu preciso para responder.
export type Email = { subject: string; label: string };

export const emailLink = (subject: string) =>
	`mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
		'Website URL:\nWhat is wrong (or what you want to fix):\nPlatform (WordPress, Shopify, custom...):\n'
	)}`;

export const defaultEmail: Email = {
	subject: 'Website fix request',
	label: 'Email me your site'
};

// Páginas de serviço. `path` é a URL canônica, sem barra final.
export const services = {
	audit: { path: '/technical-seo-audit', name: 'Technical SEO audit' },
	coreWebVitals: { path: '/core-web-vitals-fix', name: 'Core Web Vitals fixes' },
	indexing: { path: '/google-indexing-issues', name: 'Google indexing fixes' },
	migration: { path: '/seo-website-migration', name: 'SEO website migration' }
} as const;

// Páginas por público: problemas técnicos que só aparecem naquele tipo de site
export const industries = {
	agencies: { path: '/white-label-technical-seo', name: 'White label technical SEO' },
	lawFirms: { path: '/technical-seo-for-law-firms', name: 'Technical SEO for law firms' },
	ecommerce: { path: '/ecommerce-technical-seo', name: 'Ecommerce technical SEO' }
} as const;

// Páginas por país: só onde a pesquisa mostrou busca com localização e há problemas técnicos próprios
// do mercado (ver estudos/geo-regioes-alta-renda.md). Atendimento remoto, sem endereço local.
// `lang`: a página é escrita no inglês do país (grafia e termos locais) e se declara assim no
// <html lang>, no inLanguage, no og:locale e no hreflang.
export const markets = {
	uk: { path: '/technical-seo-uk', name: 'Technical SEO in the UK', country: 'United Kingdom', lang: 'en-GB' },
	canada: { path: '/technical-seo-canada', name: 'Technical SEO in Canada', country: 'Canada', lang: 'en-CA' },
	newZealand: { path: '/technical-seo-new-zealand', name: 'Technical SEO in New Zealand', country: 'New Zealand', lang: 'en-NZ' }
} as const;

// Idioma de cada página: inglês dos EUA por padrão; páginas por país no inglês local
export const pageLang = (path: string): string => Object.values(markets).find((m) => m.path === path)?.lang ?? 'en-US';

export const guidesPage = { path: '/guides', name: 'Guides' };
export const guides = {
	notShowing: { path: '/guides/website-not-showing-on-google', name: 'Website not showing on Google' },
	disappeared: { path: '/guides/website-disappeared-from-google', name: 'Website disappeared from Google' },
	crawledNotIndexed: { path: '/guides/crawled-currently-not-indexed', name: 'Crawled - currently not indexed' },
	discoveredNotIndexed: { path: '/guides/discovered-currently-not-indexed', name: 'Discovered - currently not indexed' },
	duplicateCanonical: {
		path: '/guides/duplicate-without-user-selected-canonical',
		name: 'Duplicate without user-selected canonical'
	},
	soft404: { path: '/guides/soft-404', name: 'Soft 404 errors' },
	sitemapNotRead: { path: '/guides/sitemap-could-not-be-read', name: 'Sitemap could not be read' },
	cwvFailed: { path: '/guides/core-web-vitals-assessment-failed', name: 'Core Web Vitals assessment failed' }
} as const;

export const aboutPage = { path: '/about', name: 'About' };

// Card de compartilhamento de cada página (gerado por npm run cards a partir do build)
export const shareCard = (path: string) =>
	`/images/share/${path === '/' ? 'home' : path.slice(1).replace(/\//g, '-')}.jpg`;

// Imagens extras dos guias, nas proporções que o Google recomenda para artigos (npm run cards)
export const articleImage = (path: string, ratio: '16x9' | '4x3' | '1x1') => shareCard(path).replace('.jpg', `-${ratio}.jpg`);

export const logo = { path: '/images/logo-512.png', width: 512, height: 512 };

// Menu principal: grupos com subitens (dropdown no desktop, painel no celular)
export const menu = [
	{ label: 'Services', href: '/#services', itens: Object.values(services).map((s) => ({ label: s.name, href: s.path })) },
	{
		label: 'Who it is for',
		href: '/#industries',
		itens: [...Object.values(industries), ...Object.values(markets)].map((s) => ({ label: s.name, href: s.path }))
	},
	{
		label: 'Guides',
		href: guidesPage.path,
		itens: Object.values(guides).map((g) => ({ label: g.name, href: g.path }))
	},
	{ label: 'About', href: aboutPage.path, itens: [] as { label: string; href: string }[] }
];

// Mapa do site resumido (rodapé)
export const siteGroups = [
	{ id: 'services', title: 'Services', entries: Object.values(services).map((s) => ({ href: s.path, text: s.name })) },
	{
		id: 'industries',
		title: 'Who it is for',
		entries: [...Object.values(industries), ...Object.values(markets)].map((s) => ({ href: s.path, text: s.name }))
	},
	{ id: 'guides', title: 'Guides', entries: Object.values(guides).map((g) => ({ href: g.path, text: g.name })) },
	{
		id: 'company',
		title: 'Ranking Fixer',
		entries: [
			{ href: '/', text: 'Home' },
			{ href: aboutPage.path, text: 'About' },
			{ href: guidesPage.path, text: 'All guides' }
		]
	}
];

// Termos de cada página (meta keywords e keywords do schema), definidos na pesquisa de palavras-chave
// (autocompletar do Google, EUA; ver estudos/). Cada termo pertence a uma página só.
export const pageKeywords: Record<string, string[]> = {
	'/': [
		'technical seo fixes',
		'fix my website seo',
		'how to fix my website seo',
		'technical seo consultant',
		'freelance technical seo consultant',
		'hire a technical seo',
		'technical seo help',
		'what is considered technical seo',
		'why is my seo not working'
	],
	'/technical-seo-audit': [
		'technical seo audit service',
		'technical seo audit services',
		'website technical seo audit',
		'full technical seo audit',
		'what does a technical seo audit include',
		'how long does it take to audit a website',
		'technical seo audit cost',
		'seo audit and website optimization services',
		'technical seo audit report'
	],
	'/core-web-vitals-fix': [
		'core web vitals optimization service',
		'fix core web vitals',
		'how to fix core web vitals',
		'core web vitals specialist',
		'page speed optimization service',
		'website speed optimization services',
		'mobile page speed optimization',
		'does page speed affect seo',
		'is page speed a ranking factor'
	],
	'/google-indexing-issues': [
		'google indexing issues',
		'fix google indexing issues',
		'pages not indexed by google',
		'why is google not indexing my site',
		'google search console indexing issues',
		'page with redirect google search console',
		'excluded by noindex tag',
		'how long does google indexing take'
	],
	'/seo-website-migration': [
		'seo website migration services',
		'seo migration services',
		'website migration seo service',
		'traffic drop after website redesign',
		'website traffic recovery',
		'how to redesign website without losing seo',
		'does changing domain name affect seo',
		'replatforming seo',
		'seo migration plan'
	],
	'/white-label-technical-seo': [
		'white label technical seo',
		'white label seo audit',
		'outsource technical seo audit services',
		'white label seo for agencies',
		'white label core web vitals',
		'seo subcontractor',
		'what is white label seo',
		'how to outsource seo'
	],
	'/technical-seo-for-law-firms': [
		'technical seo for law firms',
		'law firm seo audit',
		'law firm website seo',
		'attorney website seo',
		'schema markup for law firms',
		'schema for lawyers',
		'law firm website redesign',
		'does seo work for law firms',
		'law firm seo nyc',
		'law firm seo los angeles',
		'law firm seo houston',
		'law firm seo toronto'
	],
	'/ecommerce-technical-seo': [
		'ecommerce technical seo',
		'ecommerce seo audit services',
		'technical seo for ecommerce website',
		'why is my shopify store not showing up on google',
		'shopify seo audit',
		'ecommerce website migration service',
		'ecommerce platform migration services',
		'faceted navigation seo',
		'ecommerce site speed'
	],
	'/technical-seo-canada': [
		'technical seo canada',
		'seo expert canada',
		'seo specialist canada',
		'freelance seo canada',
		'technical seo toronto',
		'seo audit toronto',
		'seo consultant toronto',
		'seo audit vancouver',
		'seo consultant vancouver',
		'seo consultant ottawa'
	],
	'/technical-seo-new-zealand': [
		'technical seo new zealand',
		'seo consultant nz',
		'seo specialist nz',
		'seo specialist new zealand',
		'seo expert nz',
		'seo consultant auckland',
		'technical seo christchurch'
	],
	'/technical-seo-uk': [
		'technical seo uk',
		'technical seo london',
		'seo audit uk',
		'seo audit london',
		'seo audit services uk',
		'freelance seo uk',
		'seo freelancer london',
		'seo for solicitors',
		'shopify seo uk',
		'white label seo uk',
		'cookie banner requirements uk',
		'hreflang uk'
	],
	'/guides': ['technical seo guides', 'technical seo tutorial', 'google search console errors'],
	'/guides/website-not-showing-on-google': [
		'why is my website not showing up on google',
		'website not showing on google',
		'my website is not showing on google search',
		'new website not showing on google',
		'how long does it take for a website to show up on google',
		'business not showing on google search',
		'website not showing on google search but is on maps',
		'wix website not showing on google',
		'squarespace website not showing on google'
	],
	'/guides/website-disappeared-from-google': [
		'website disappeared from google',
		'why is my website not showing up on google anymore',
		'google deindexed my site',
		'website removed from google search',
		'site dropped out of google',
		'google manual action',
		'japanese keyword hack',
		'hacked site google search'
	],
	'/guides/discovered-currently-not-indexed': [
		'discovered - currently not indexed',
		'discovered currently not indexed',
		'how to fix discovered currently not indexed',
		'page is not indexed: discovered - currently not indexed',
		'discovered not indexed',
		'discovered currently not indexed wix',
		'discovered currently not indexed squarespace',
		'how long does discovered currently not indexed last'
	],
	'/guides/duplicate-without-user-selected-canonical': [
		'duplicate without user-selected canonical',
		'duplicate without user-selected canonical how to fix',
		'duplicate, google chose different canonical than user',
		'google chose different canonical than user',
		'canonical issues',
		'user-declared canonical vs google-selected canonical',
		'canonical tag vs 301 redirect'
	],
	'/guides/soft-404': [
		'soft 404',
		'what is a soft 404',
		'soft 404 fix',
		'soft 404 google search console',
		'soft 404 vs 404',
		'soft 404 single page app',
		'redirect 404 to homepage',
		'out of stock product page seo'
	],
	'/guides/sitemap-could-not-be-read': [
		'sitemap could not be read',
		"couldn't fetch sitemap",
		'sitemap could not be read google search console',
		'sitemap couldnt fetch google search console',
		'sitemap has errors',
		'sitemap index file',
		'sitemap size limit'
	],
	'/guides/crawled-currently-not-indexed': [
		'crawled - currently not indexed',
		'how to fix crawled currently not indexed',
		'crawled but not indexed',
		'crawled currently not indexed vs discovered currently not indexed',
		'crawled currently not indexed validation failed',
		'what does crawled currently not indexed mean'
	],
	'/guides/core-web-vitals-assessment-failed': [
		'core web vitals assessment failed',
		'how to fix core web vitals assessment failed',
		'lcp issue longer than 2.5 s mobile',
		'lcp issue longer than 4s mobile',
		'inp issue longer than 200ms mobile',
		'cls issue more than 0.1',
		'core web vitals assessment failed wordpress',
		'core web vitals no data'
	],
	'/about': ['ranking fixer', 'calebe araujo', 'technical seo developer']
};
