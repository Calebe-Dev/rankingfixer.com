// Fonte única dos dados do site: usada no HTML, no JSON-LD, no sitemap e nos cards.

export const SITE_URL = 'https://rankingfixer.com';
export const BRAND = 'Ranking Fixer';

// Data da última revisão do conteúdo (lastmod do sitemap e "updated" das páginas)
export const UPDATED = '2026-10-25';

// Datas completas (ISO 8601 com fuso de Brasília), formato que o Google pede nos dados estruturados
const TIME = 'T09:00:00-03:00';
const LAUNCH = '2026-10-25';
const publishedOn: Record<string, string> = {};
export const datePublished = (path: string) => `${publishedOn[path] ?? LAUNCH}${TIME}`;
export const dateModified = `${UPDATED}${TIME}`;

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
	city: 'Sorocaba',
	country: 'Brazil'
};

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

export const guidesPage = { path: '/guides', name: 'Guides' };
export const guides = {
	notShowing: { path: '/guides/website-not-showing-on-google', name: 'Website not showing on Google' },
	crawledNotIndexed: { path: '/guides/crawled-currently-not-indexed', name: 'Crawled - currently not indexed' },
	cwvFailed: { path: '/guides/core-web-vitals-assessment-failed', name: 'Core Web Vitals assessment failed' }
} as const;

export const aboutPage = { path: '/about', name: 'About' };

// Card de compartilhamento de cada página (gerado por npm run cards a partir do build)
export const shareCard = (path: string) =>
	`/images/share/${path === '/' ? 'home' : path.slice(1).replace(/\//g, '-')}.jpg`;

export const logo = { path: '/images/logo-512.png', width: 512, height: 512 };

// Menu principal: grupos com subitens (dropdown no desktop, painel no celular)
export const menu = [
	{ label: 'Services', href: '/#services', itens: Object.values(services).map((s) => ({ label: s.name, href: s.path })) },
	{ label: 'Who it is for', href: '/#industries', itens: Object.values(industries).map((s) => ({ label: s.name, href: s.path })) },
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
	{ id: 'industries', title: 'Who it is for', entries: Object.values(industries).map((s) => ({ href: s.path, text: s.name })) },
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
		'duplicate without user-selected canonical',
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
		'does seo work for law firms'
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
	'/guides/crawled-currently-not-indexed': [
		'crawled - currently not indexed',
		'how to fix crawled currently not indexed',
		'crawled but not indexed',
		'discovered - currently not indexed',
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
