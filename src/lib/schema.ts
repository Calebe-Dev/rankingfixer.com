// Construtores de JSON-LD (schema.org). Cada página monta um @graph com estes nós;
// o conteúdo marcado deve ser sempre o mesmo que está visível no HTML.
import { BRAND, SITE_URL, UPDATED, contact, dateModified, datePublished, industries, logo, menu, pageKeywords, person, services, shareCard, socials } from './site';

export type Faq = { question: string; answer: string };
export type Crumb = { name: string; path: string };
export type Step = { name: string; text: string };

const WEBSITE_ID = `${SITE_URL}/#website`;
const ORG_ID = `${SITE_URL}/#organization`;
const LOGO_ID = `${SITE_URL}/#logo`;
const NAV_ID = `${SITE_URL}/#navigation`;
const YEAR = Number(UPDATED.slice(0, 4));

export const absolute = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);
const imageId = (path: string) => `${absolute(path)}#image`;

// Atendimento remoto: EUA como mercado principal, sem endereço físico
const areaServed = [
	{ '@type': 'Country', name: 'United States' },
	{ '@type': 'Country', name: 'Canada' },
	{ '@type': 'Country', name: 'United Kingdom' }
];

export const personNode = () => ({
	'@type': 'Person',
	'@id': person.id,
	name: person.name,
	alternateName: person.fullName,
	url: person.homepage,
	jobTitle: person.jobTitle,
	homeLocation: { '@type': 'City', name: person.city, containedInPlace: { '@type': 'Country', name: person.country } },
	worksFor: [{ '@id': ORG_ID }, { '@type': 'Organization', ...person.employer }],
	knowsLanguage: [
		{ '@type': 'Language', name: 'English', alternateName: 'en' },
		{ '@type': 'Language', name: 'Portuguese', alternateName: 'pt-BR' }
	],
	knowsAbout: [
		'Technical SEO',
		'Core Web Vitals',
		'Google Search Console',
		'Structured data',
		'Website migrations',
		'JavaScript SEO',
		'Web performance',
		'Full-stack development',
		'Cloudflare'
	],
	sameAs: socials.map((s) => s.url)
});

export const websiteNode = () => ({
	'@type': 'WebSite',
	'@id': WEBSITE_ID,
	url: `${SITE_URL}/`,
	name: BRAND,
	alternateName: 'rankingfixer.com',
	description: 'Technical SEO fixes implemented by a developer: audits, Core Web Vitals, indexing issues and website migrations.',
	inLanguage: 'en-US',
	publisher: { '@id': ORG_ID },
	creator: { '@id': person.id },
	copyrightHolder: { '@id': ORG_ID },
	copyrightYear: YEAR
});

export const logoNode = () => ({
	'@type': 'ImageObject',
	'@id': LOGO_ID,
	url: absolute(logo.path),
	contentUrl: absolute(logo.path),
	width: logo.width,
	height: logo.height,
	encodingFormat: 'image/png',
	caption: `${BRAND} logo`
});

export const organizationNode = () => ({
	'@type': 'Organization',
	'@id': ORG_ID,
	name: BRAND,
	url: `${SITE_URL}/`,
	logo: { '@id': LOGO_ID },
	image: absolute(shareCard('/')),
	description:
		'Technical SEO consultancy run by a full-stack developer. Finds and fixes the technical problems that keep websites from ranking on Google.',
	email: contact.email,
	founder: { '@id': person.id },
	areaServed,
	knowsAbout: ['Technical SEO', 'Core Web Vitals', 'Google indexing', 'SEO website migration', 'Structured data'],
	contactPoint: {
		'@type': 'ContactPoint',
		contactType: 'sales',
		email: contact.email,
		availableLanguage: ['English', 'Portuguese'],
		areaServed
	},
	hasOfferCatalog: {
		'@type': 'OfferCatalog',
		name: 'Technical SEO services',
		itemListElement: [...Object.values(services), ...Object.values(industries)].map((s) => ({
			'@type': 'Offer',
			itemOffered: { '@type': 'Service', name: s.name, url: absolute(s.path) }
		}))
	}
});

export const navNode = () => ({
	'@type': 'ItemList',
	'@id': NAV_ID,
	name: 'Main menu',
	itemListElement: menu
		.flatMap((group) => [group, ...group.itens])
		.filter((item, i, all) => all.findIndex((other) => other.href === item.href) === i)
		.map((item, i) => ({
			'@type': 'SiteNavigationElement',
			position: i + 1,
			name: item.label,
			url: absolute(item.href)
		}))
});

// Card de compartilhamento da página (1200×630): imagem principal da página
export const imageNode = (path: string, caption: string) => ({
	'@type': 'ImageObject',
	'@id': imageId(path),
	url: absolute(shareCard(path)),
	contentUrl: absolute(shareCard(path)),
	width: 1200,
	height: 630,
	encodingFormat: 'image/jpeg',
	caption,
	representativeOfPage: true,
	creator: { '@id': ORG_ID },
	copyrightHolder: { '@id': ORG_ID }
});

export const webPageNode = (opts: {
	path: string;
	title: string;
	description: string;
	type?: 'WebPage' | 'AboutPage' | 'CollectionPage';
	mainEntity?: string;
	about?: string;
}) => {
	const url = absolute(opts.path);
	return {
		'@type': opts.type ?? 'WebPage',
		'@id': `${url}#webpage`,
		url,
		name: opts.title,
		description: opts.description,
		inLanguage: 'en-US',
		isPartOf: { '@id': WEBSITE_ID },
		author: { '@id': person.id },
		publisher: { '@id': ORG_ID },
		copyrightHolder: { '@id': ORG_ID },
		copyrightYear: YEAR,
		datePublished: datePublished(opts.path),
		dateModified,
		primaryImageOfPage: { '@id': imageId(opts.path) },
		image: { '@id': imageId(opts.path) },
		thumbnailUrl: absolute(shareCard(opts.path)),
		speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero > p:first-of-type'] },
		...(pageKeywords[opts.path] ? { keywords: pageKeywords[opts.path].join(', ') } : {}),
		...(opts.mainEntity ? { mainEntity: { '@id': opts.mainEntity } } : {}),
		...(opts.about ? { about: { '@id': opts.about } } : {}),
		...(opts.path !== '/' ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {})
	};
};

export const breadcrumbNode = (path: string, crumbs: Crumb[]) => ({
	'@type': 'BreadcrumbList',
	'@id': `${absolute(path)}#breadcrumb`,
	itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((c, i) => ({
		'@type': 'ListItem',
		position: i + 1,
		name: c.name,
		item: absolute(c.path)
	}))
});

export const serviceNode = (opts: { path: string; name: string; description: string; serviceType: string; audience?: string }) => ({
	'@type': 'Service',
	'@id': `${absolute(opts.path)}#service`,
	name: opts.name,
	serviceType: opts.serviceType,
	description: opts.description,
	url: absolute(opts.path),
	provider: { '@id': ORG_ID },
	image: { '@id': imageId(opts.path) },
	areaServed,
	availableChannel: { '@type': 'ServiceChannel', serviceUrl: absolute(opts.path), availableLanguage: 'English' },
	...(opts.audience ? { audience: { '@type': 'BusinessAudience', audienceType: opts.audience } } : {})
});

export const faqNode = (path: string, faqs: Faq[]) => ({
	'@type': 'FAQPage',
	'@id': `${absolute(path)}#faq`,
	mainEntity: faqs.map((f) => ({
		'@type': 'Question',
		name: f.question,
		acceptedAnswer: { '@type': 'Answer', text: f.answer }
	}))
});

export const howToNode = (path: string, name: string, steps: Step[]) => ({
	'@type': 'HowTo',
	'@id': `${absolute(path)}#howto`,
	name,
	inLanguage: 'en-US',
	step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text }))
});

export const articleNode = (path: string, headline: string, description: string) => ({
	'@type': 'TechArticle',
	'@id': `${absolute(path)}#article`,
	headline,
	description,
	inLanguage: 'en-US',
	url: absolute(path),
	mainEntityOfPage: { '@id': `${absolute(path)}#webpage` },
	image: { '@id': imageId(path) },
	articleSection: 'Technical SEO guides',
	isAccessibleForFree: true,
	...(pageKeywords[path] ? { keywords: pageKeywords[path].join(', ') } : {}),
	author: { '@id': person.id },
	publisher: { '@id': ORG_ID },
	copyrightHolder: { '@id': ORG_ID },
	copyrightYear: YEAR,
	datePublished: datePublished(path),
	dateModified
});

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });

// Grafo completo de uma página: site + organização + pessoa + página + trilha + serviço/artigo + FAQ
export const pageGraph = (opts: {
	path: string;
	title: string;
	description: string;
	crumbs: Crumb[];
	type?: 'WebPage' | 'AboutPage' | 'CollectionPage';
	service?: Omit<Parameters<typeof serviceNode>[0], 'path'>;
	article?: { headline: string };
	faqs?: Faq[];
	howTo?: { name: string; steps: Step[] };
	extra?: object[];
}) => {
	const main = opts.service
		? `${absolute(opts.path)}#service`
		: opts.article
			? `${absolute(opts.path)}#article`
			: opts.type === 'AboutPage'
				? ORG_ID
				: undefined;
	return graph(
		websiteNode(),
		navNode(),
		logoNode(),
		organizationNode(),
		personNode(),
		imageNode(opts.path, opts.title),
		webPageNode({ path: opts.path, title: opts.title, description: opts.description, type: opts.type, mainEntity: main }),
		...(opts.path !== '/' ? [breadcrumbNode(opts.path, opts.crumbs)] : []),
		...(opts.service ? [serviceNode({ path: opts.path, ...opts.service })] : []),
		...(opts.article ? [articleNode(opts.path, opts.article.headline, opts.description)] : []),
		...(opts.faqs?.length ? [faqNode(opts.path, opts.faqs)] : []),
		...(opts.howTo ? [howToNode(opts.path, opts.howTo.name, opts.howTo.steps)] : []),
		...(opts.extra ?? [])
	);
};
