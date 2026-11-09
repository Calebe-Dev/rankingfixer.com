<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import { pageGraph, type Faq as FaqItem, type Step } from '$lib/schema';
	import { guides, guidesPage, industries, services, type Email } from '$lib/site';

	const path = guides.cannibalization.path;
	const title = 'Keyword Cannibalization: How to Find and Fix It | Ranking Fixer';
	const description =
		'How to tell if the wrong page ranks for your keyword, find cannibalization in Search Console, and decide whether to merge, redirect or differentiate.';
	const email: Email = { subject: 'Keyword cannibalization', label: 'Have me map your pages' };

	const crumbs = [
		{ name: guidesPage.name, path: guidesPage.path },
		{ name: guides.cannibalization.name, path }
	];

	// Lista ordenada visível. Sem marcação HowTo: o Google aposentou o rich result em 2023.
	const steps: Step[] = [
		{ name: 'Pick the queries that matter', text: 'Start with the searches that bring customers, not every query. Cannibalization on a term nobody buys from is not worth a redirect.' },
		{ name: 'Filter Search Console by the query', text: 'In Performance, add a Query filter with the exact term, then open the Pages tab. More than one URL with real impressions is a candidate.' },
		{ name: 'Check the dates', text: 'Switch to a daily view and compare the pages over time. If they take turns, with one rising when the other drops, Google cannot decide between them.' },
		{ name: 'Choose the page that should win', text: 'Usually the one that matches the intent best, converts, and has the most links. That page becomes the only target for the term.' },
		{ name: 'Merge, redirect or differentiate', text: 'Use the table below. Merge pages that answer the same question; give pages with different intents titles and content that make the difference obvious.' },
		{ name: 'Point internal links to the winner', text: 'Links with the keyword in the anchor should go to the chosen page. Old menu, footer and article links are often what keeps the wrong page ranking.' },
		{ name: 'Keep a keyword map', text: 'Record which page owns each term and check it before publishing anything new. This prevents the problem instead of fixing it again later.' }
	];

	const faqs: FaqItem[] = [
		{
			question: 'What is keyword cannibalization?',
			answer:
				'It is when two or more pages of the same site compete for the same search with the same intent, so Google alternates between them or ranks the weaker one. The site splits its links and relevance between pages instead of concentrating them on one that can rank higher.'
		},
		{
			question: 'Is it bad to have two pages ranking for the same keyword?',
			answer:
				'Not always. Two results from the same site can be a good outcome, and pages with different intents, like a buying guide and a product page, can both rank for a broad term. It is a problem when the pages take turns, when the wrong one ranks, or when neither reaches the first page.'
		},
		{
			question: 'How do I find keyword cannibalization in Google Search Console?',
			answer:
				'Open the Performance report, filter by the query, and look at the Pages tab. Several URLs with impressions for the same query, especially if they alternate over time in the daily view, point to cannibalization. Exporting queries and pages together shows it for many terms at once.'
		},
		{
			question: 'Should I use a canonical tag to fix keyword cannibalization?',
			answer:
				'Only when the pages are near-duplicates and both need to stay live, like product variants. For two different articles on the same topic, a canonical is a hint Google often ignores; merging the content and redirecting the weaker page is clearer.'
		},
		{
			question: 'Why is Google ranking the wrong page for my keyword?',
			answer:
				'Usually because that page has more internal links with the keyword, an older history, a title closer to the query, or content that answers the search better than the page you want. Fix the signals: title, content and internal links should all point to the page you chose.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		article: { headline: 'Keyword Cannibalization: How to Find and Fix It' }
	});
</script>

<Seo {title} {description} {path} {jsonLd} ogType="article" />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Keyword Cannibalization: How to Find and Fix It</h1>
		<p>
			Keyword cannibalization is when two or more pages of your site compete for the same search with the
			same intent. Google keeps switching between them, or settles on the weaker one, and neither ranks as
			well as one clear page would.
		</p>
		<p>
			The symptom most people notice is the wrong page ranking for a keyword, like a blog post showing up
			where the service page should be.
		</p>
	</header>

	<section aria-labelledby="signs-title">
		<h2 id="signs-title">Signs that pages are competing</h2>
		<ul class="checks">
			<li><strong>The ranking URL changes</strong> from week to week for the same query.</li>
			<li><strong>Positions swing</strong> by several places without any change on the site.</li>
			<li><strong>An article or category outranks the page that sells</strong> for a buying search.</li>
			<li><strong>Two pages have similar titles and H1s</strong>, often written years apart by different people.</li>
			<li><strong>Location or service variants</strong> that swap one word, like the same service page for nearby cities.</li>
		</ul>
	</section>

	<section class="band" aria-labelledby="find-title">
		<h2 id="find-title">How to find and fix it, step by step</h2>
		<Steps {steps} />
		<p>
			For a whole site, export queries and pages together (the Search Console API or a connected Looker
			Studio report does it) and list the queries with more than one URL above a few impressions. That is
			the shortlist to review by hand.
		</p>
	</section>

	<section aria-labelledby="fix-title">
		<h2 id="fix-title">Merge, redirect or differentiate</h2>
		<div class="table-wrap">
			<table>
				<caption>Which fix fits each type of keyword cannibalization</caption>
				<thead>
					<tr>
						<th scope="col">Situation</th>
						<th scope="col">Fix</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">Two articles answer the same question</th>
						<td>Merge the best of both into one page and 301 redirect the other to it</td>
					</tr>
					<tr>
						<th scope="row">A blog post ranks instead of the service or product page</th>
						<td>Make the post informational, link from it to the service page with a descriptive anchor, and keep the buying term in the service page title</td>
					</tr>
					<tr>
						<th scope="row">Near-identical variants that must stay live</th>
						<td>Canonical tag to the main version, as with product variants and print versions</td>
					</tr>
					<tr>
						<th scope="row">Thin pages created for each keyword variation</th>
						<td>Consolidate into one strong page; noindex or remove the rest</td>
					</tr>
					<tr>
						<th scope="row">Different intents that share words</th>
						<td>Keep both, and make titles, H1s and content clearly about their own intent</td>
					</tr>
				</tbody>
			</table>
		</div>
		<p>
			Merged pages often show up first in Search Console as <a href={guides.duplicateCanonical.path}>duplicates
			without a user-selected canonical</a> or as <a href={guides.crawledNotIndexed.path}>crawled but not
			indexed</a>: Google already saw them as the same page.
		</p>
	</section>

	<section class="band" aria-labelledby="map-title">
		<h2 id="map-title">Prevent it with a keyword map</h2>
		<p>
			On this site, every target search belongs to exactly one page, recorded in a single file the pages and
			their structured data read from. Before a new page is written, its terms are checked against that list.
			A spreadsheet works just as well: one row per term, one owner URL, and a rule that nobody publishes a
			page whose main term already has an owner.
		</p>
		<p>
			Cannibalization is common on <a href={industries.lawFirms.path}>law firm sites</a> with one page per
			practice area and city, and on <a href={industries.ecommerce.path}>online stores</a> where categories,
			filters and blog posts target the same products.
		</p>
	</section>

	<Faq {faqs} title="Questions about keyword cannibalization" />

	<Related
		links={[
			{ href: services.audit.path, text: 'Technical SEO audit with a keyword map' },
			{ href: guides.duplicateCanonical.path, text: 'Duplicate pages and canonicals' },
			{ href: guides.crawledNotIndexed.path, text: 'Pages crawled but not indexed' },
			{ href: services.migration.path, text: 'Merging pages during a migration' },
			{ href: industries.lawFirms.path, text: 'Practice area pages competing' }
		]}
	/>

	<Contact {email} title="The wrong page ranks for your main keyword?" intro="Email the keyword and the page that should rank. I reply with why Google prefers the other one and what to change." />
</main>
