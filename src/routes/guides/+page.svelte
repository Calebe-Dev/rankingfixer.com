<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { absolute, pageGraph } from '$lib/schema';
	import { guides, guidesPage, services, type Email } from '$lib/site';

	const path = guidesPage.path;
	const title = 'Technical SEO Guides | Ranking Fixer';
	const description =
		'Technical SEO guides to Search Console problems: pages not indexed, noindex, robots.txt, canonicals, soft 404s, sitemaps, Core Web Vitals and AI-built sites.';
	const email: Email = { subject: 'Question from the guides', label: 'Ask about your site' };

	const crumbs = [{ name: guidesPage.name, path }];

	const list = [
		{
			...guides.notShowing,
			title: 'Why is my website not showing up on Google?',
			text: 'Eight checks in order, platform settings for WordPress, Wix, Squarespace and Shopify, and what to do when the site is indexed but not ranking.'
		},
		{
			...guides.disappeared,
			title: 'Website disappeared from Google? Causes and fixes',
			text: 'For sites that used to rank: noindex, robots.txt, removals, manual actions, hacks and server problems, checked in the order that saves time.'
		},
		{
			...guides.crawledNotIndexed,
			title: 'Crawled - currently not indexed: how to fix it',
			text: 'What the status means, how it differs from "Discovered - currently not indexed", and the steps that get pages indexed.'
		},
		{
			...guides.discoveredNotIndexed,
			title: 'Discovered - currently not indexed: how to fix it',
			text: 'Why Google knows a URL but has not crawled it, how to read Crawl stats, and how to cut the crawl waste that keeps pages waiting.'
		},
		{
			...guides.duplicateCanonical,
			title: 'Duplicate without user-selected canonical: how to fix it',
			text: 'The three canonical statuses compared, where duplicate URLs come from and how to make Google keep the right one.'
		},
		{
			...guides.soft404,
			title: 'Soft 404 errors in Search Console: how to fix them',
			text: 'Pages that answer 200 but look missing, with fixes for templates, out-of-stock products and SvelteKit, Next.js and Angular apps.'
		},
		{
			...guides.sitemapNotRead,
			title: "Sitemap could not be read (couldn't fetch): how to fix it",
			text: 'What the sitemap statuses mean, four commands to test the file, and the causes Google lists, from robots.txt to low crawl demand.'
		},
		{
			...guides.cwvFailed,
			title: 'Core Web Vitals assessment failed: how to fix it',
			text: 'Every LCP, INP and CLS message in Search Console, what causes it and how to fix it on the template.'
		},
		{
			...guides.alternateCanonical,
			title: "Alternate page with proper canonical tag: when it's fine and when it isn't",
			text: 'Which URLs are normal in the report, when the status hides a template bug, and how to fix a wrong canonical.'
		},
		{
			...guides.urlNotOnGoogle,
			title: 'URL is not on Google: how to fix it',
			text: 'How to read URL Inspection, what "Indexing request rejected" and "Not available due to a site-wide issue" mean, and when requesting indexing helps.'
		},
		{
			...guides.excludedNoindex,
			title: "Excluded by 'noindex' tag: how to fix it",
			text: 'The two places a noindex hides, where it comes from in WordPress, Wix, Shopify and hosts, and how to remove it for good.'
		},
		{
			...guides.blockedRobots,
			title: 'Blocked by robots.txt: how to fix it',
			text: 'Blocked vs indexed though blocked, the rules that block pages by accident and a safe robots.txt for stores and service sites.'
		},
		{
			...guides.vibeCoded,
			title: 'Vibe-coded website not indexed? Fix Lovable, Bolt and v0 SEO',
			text: 'Why sites built with AI app builders look empty to Google and AI crawlers, a one-minute test and the fix.'
		},
		{
			...guides.cannibalization,
			title: 'Keyword cannibalization: how to find and fix it',
			text: 'When the wrong page ranks for your keyword: how to spot it in Search Console and whether to merge, redirect or differentiate.'
		},
		{
			...guides.llmsTxt,
			title: 'llms.txt: what it is, who reads it, and whether you need one',
			text: 'The format, how it differs from robots.txt and sitemaps, who actually reads it and what to fix before adding one.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		type: 'CollectionPage',
		mainEntity: `${absolute(path)}#list`,
		extra: [
			{
				'@type': 'ItemList',
				'@id': `${absolute(path)}#list`,
				name: 'Technical SEO guides',
				itemListElement: list.map((g, i) => ({ '@type': 'ListItem', position: i + 1, name: g.title, url: absolute(g.path) }))
			}
		]
	});
</script>

<Seo {title} {description} {path} {jsonLd} />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Technical SEO Guides</h1>
		<p>
			Practical guides to the technical problems that keep websites out of Google, written from the fixes
			I make. Each one starts with the answer, then shows how to check and fix the problem yourself.
		</p>
	</header>

	<section aria-labelledby="list-title">
		<h2 id="list-title">All guides</h2>
		<ul class="cards">
			{#each list as guide (guide.path)}
				<li>
					<span class="tag">Guide</span>
					<h3><a href={guide.path}>{guide.title}</a></h3>
					<p>{guide.text}</p>
				</li>
			{/each}
		</ul>
	</section>

	<section class="band" aria-labelledby="help-title">
		<h2 id="help-title">Prefer to have it fixed?</h2>
		<p>
			The guides cover the checks anyone can run. When the cause is in the code, the theme or the server,
			start with a <a href={services.audit.path}>technical SEO audit</a> or go straight to
			<a href={services.indexing.path}>indexing fixes</a> or
			<a href={services.coreWebVitals.path}>Core Web Vitals optimization</a>.
		</p>
	</section>

	<Contact {email} />
</main>
