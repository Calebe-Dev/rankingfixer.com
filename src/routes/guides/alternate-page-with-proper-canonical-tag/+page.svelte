<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import { pageGraph, type Faq as FaqItem, type Step } from '$lib/schema';
	import { guides, guidesPage, industries, services, type Email } from '$lib/site';

	const path = guides.alternateCanonical.path;
	const title = "Alternate Page With Proper Canonical Tag: When It's Fine and When It Isn't | Ranking Fixer";
	const description =
		'Alternate page with proper canonical tag usually needs no fix. See which URLs are expected in the report, when it hides a canonical bug and how to fix one.';
	const email: Email = { subject: 'Alternate page with proper canonical tag', label: 'Have me check the canonicals' };

	const crumbs = [
		{ name: guidesPage.name, path: guidesPage.path },
		{ name: guides.alternateCanonical.name, path }
	];

	// URLs que é normal ver no relatório, e as que pedem atenção
	const expected = [
		['Tracking and campaign URLs', '/page?utm_source=newsletter', 'Expected'],
		['Sort and filter parameters', '/shoes?sort=price', 'Expected'],
		['AMP or separate mobile URLs', '/page/amp, m.example.com/page', 'Expected'],
		['Print or share versions', '/page?print=1', 'Expected'],
		['Pages 2, 3, 4 of a list pointing to page 1', '/blog?page=3', 'Problem: the products or posts on those pages lose a path in'],
		['Language or country versions pointing to one version', '/en-gb/page → /page', 'Problem: the local version cannot rank in its country'],
		['Every page pointing to the home page', '/services → /', 'Problem: a template bug hiding the whole site'],
		['Product variants people search for by name', '/shirt-blue → /shirt', 'Depends: a problem if the variant has its own demand']
	];

	// Lista ordenada visível. Sem marcação HowTo: o Google aposentou o rich result em 2023.
	const steps: Step[] = [
		{ name: 'Decide which URLs should rank', text: 'List the page types that deserve their own place in search: services, products, articles, local and language versions. Everything else can point elsewhere.' },
		{ name: 'Make every indexable page point to itself', text: 'Each page that should rank declares its own URL in <link rel="canonical">, with the same protocol, host and trailing slash as your internal links.' },
		{ name: 'Fix the template, not page by page', text: 'When hundreds of URLs appear at once, one template is writing the wrong canonical. Fix it in the theme, layout or CMS setting that generates the tag.' },
		{ name: 'Give each language version its own canonical', text: 'Every language or country page points to itself and links to the others with hreflang. A canonical pointing to another language tells Google to drop the local page.' },
		{ name: 'Let paginated pages point to themselves', text: 'Page 2 is not a copy of page 1. A self-referencing canonical keeps the products or posts listed there reachable.' },
		{ name: 'Line up the other signals', text: 'Internal links, redirects and the sitemap should all use the URL you want indexed. List only canonical URLs in the sitemap.' },
		{ name: 'Ask Google to look again', text: 'Use Request indexing in URL Inspection for a few key pages, then watch the count in the Page indexing report as Google recrawls the rest.' }
	];

	const faqs: FaqItem[] = [
		{
			question: 'What does "Alternate page with proper canonical tag" mean?',
			answer:
				'It means the URL in the report points to another page as its canonical, Google agreed, and Google indexed that other page instead. Google says there is nothing to do: the status only lists the copies it found and grouped under the main URL.'
		},
		{
			question: 'Is "Alternate page with proper canonical tag" bad for SEO?',
			answer:
				'Usually not. Links and signals from the copies are consolidated on the canonical page. It only costs you when the URL in the report is a page you want ranked, such as a local version, a paginated list or a product variant with its own searches.'
		},
		{
			question: 'How do I get Google to index an alternate page?',
			answer:
				'Make it its own canonical: change the tag to point to itself, give it content that is meaningfully different from the other page, link to it internally and list it in the sitemap. Then request indexing in URL Inspection.'
		},
		{
			question: 'Should alternate pages be in the sitemap?',
			answer:
				'No. The sitemap should list only the URLs you want indexed. Listing a URL whose canonical points elsewhere sends Google two different answers about the same page.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		article: { headline: "Alternate Page With Proper Canonical Tag: When It's Fine and When It Isn't" }
	});
</script>

<Seo {title} {description} {path} {jsonLd} ogType="article" />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Alternate Page With Proper Canonical Tag: When It's Fine and When It Isn't</h1>
		<p>
			"Alternate page with proper canonical tag" means the URL in the report points to another page as its
			canonical, Google agreed, and it indexed that other page instead. Most of the time it needs no fix: the
			report is just listing the copies Google grouped under the main URL.
		</p>
		<p>
			It becomes a problem when the URLs listed are pages you want in search, or when the count jumps after a
			release. That usually means a template is writing the wrong canonical, which is where
			<a href={services.indexing.path}>indexing fixes in the code</a> come in.
		</p>
	</header>

	<section aria-labelledby="meaning-title">
		<h2 id="meaning-title">What the status means</h2>
		<p>
			Google's Page indexing report puts it this way: the page "is a duplicate of a page that Google recognizes
			as canonical. This page correctly points to the canonical page, so there's nothing for you to do." The
			URL stays out of search, and the canonical page is shown instead.
		</p>
		<p>
			It is one of three canonical statuses in the report. If you see "Duplicate without user-selected
			canonical" or "Duplicate, Google chose different canonical than user" next to it, the
			<a href={guides.duplicateCanonical.path}>guide to duplicate URLs and canonicals</a> compares all three.
		</p>
	</section>

	<section class="band" aria-labelledby="normal-title">
		<h2 id="normal-title">Which URLs are normal to see here</h2>
		<p>Open the report and look at the example URLs. Their pattern tells you whether there is anything to do.</p>
		<div class="table-wrap">
			<table>
				<caption>URL patterns in "Alternate page with proper canonical tag"</caption>
				<thead>
					<tr>
						<th scope="col">URL type</th>
						<th scope="col">Example</th>
						<th scope="col">Verdict</th>
					</tr>
				</thead>
				<tbody>
					{#each expected as [kind, example, verdict] (kind)}
						<tr>
							<th scope="row">{kind}</th>
							<td><code>{example}</code></td>
							<td>{verdict}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section aria-labelledby="problem-title">
		<h2 id="problem-title">When it hides a real problem</h2>
		<ul class="checks">
			<li><strong>The count jumped after a release.</strong> A theme update, a new CMS plugin or a framework change started writing a canonical to the home page or to a category on every page.</li>
			<li><strong>Local or language versions are listed.</strong> The UK or Canadian page points to the US one, so Google never shows the local version in that country.</li>
			<li><strong>Paginated pages are listed.</strong> Pages 2 and beyond point to page 1, and the products or posts only linked from them become harder to reach.</li>
			<li><strong>The canonical points to the old site.</strong> After a migration, staging or the previous domain is still declared as canonical.</li>
			<li><strong>JavaScript changes the tag.</strong> The HTML from the server says one URL and the rendered page says another. Google uses what it sees after rendering, so the two can disagree.</li>
		</ul>
	</section>

	<section class="band" aria-labelledby="check-title">
		<h2 id="check-title">How to check a URL in two minutes</h2>
		<ul class="checks">
			<li><strong>Open URL Inspection</strong> for an example URL and compare "User-declared canonical" with "Google-selected canonical". For this status they match.</li>
			<li><strong>Ask whether that URL should rank.</strong> If not, you are done. If yes, the canonical on the page is wrong.</li>
			<li><strong>Compare the source and the rendered HTML.</strong> View the page source, then the rendered HTML in URL Inspection, and look for a different or second <code>rel="canonical"</code>.</li>
			<li><strong>Crawl the site</strong> with any SEO crawler and list the pages whose canonical is not themselves. A whole page type pointing elsewhere is a template issue.</li>
		</ul>
	</section>

	<section aria-labelledby="fix-title">
		<h2 id="fix-title">How to fix a wrong canonical</h2>
		<Steps {steps} />
		<p>
			Migrations are where wrong canonicals pile up, which is why checking them is part of every
			<a href={services.migration.path}>SEO website migration</a>. On online stores, variants and filters are
			the usual source, covered in <a href={industries.ecommerce.path}>ecommerce technical SEO</a>.
		</p>
	</section>

	<Faq {faqs} title="Questions about alternate pages and canonicals" />

	<Related
		links={[
			{ href: guides.duplicateCanonical.path, text: 'Duplicate without user-selected canonical' },
			{ href: guides.crawledNotIndexed.path, text: 'Crawled - currently not indexed' },
			{ href: services.migration.path, text: 'Canonicals and redirects in a migration' },
			{ href: industries.ecommerce.path, text: 'Variants and filters on online stores' }
		]}
	/>

	<Contact {email} title="Pages you need are listed as alternates?" intro="Email the site and one example URL from the report. I reply with where the canonical comes from and how I would fix it." />
</main>
