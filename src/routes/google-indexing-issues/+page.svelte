<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import EmailCta from '$lib/components/EmailCta.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { pageGraph, type Faq as FaqItem } from '$lib/schema';
	import { guides, industries, services, type Email } from '$lib/site';

	const path = services.indexing.path;
	const title = 'Fix Google Indexing Issues and Unindexed Pages | Ranking Fixer';
	const description =
		'Pages not indexed by Google? I fix crawled or discovered not indexed, redirect, canonical, noindex, soft 404 and 5xx errors in Search Console.';
	const email: Email = { subject: 'Google indexing issue', label: 'Get your pages indexed' };

	const crumbs = [{ name: services.indexing.name, path }];

	const statuses = [
		['Crawled - currently not indexed', 'Google read the page and chose not to keep it', 'Make the page unique and useful, link to it, or merge it into a stronger page'],
		['Discovered - currently not indexed', 'Google knows the URL but has not crawled it yet', 'Fix crawl waste and internal links so Google spends its visits on the right pages'],
		['Page with redirect', 'The URL redirects somewhere else', 'Usually fine; fix only when the sitemap or internal links still point to it'],
		['Duplicate without user-selected canonical', 'Google sees copies and none is marked as the main one', 'Add canonical tags and remove the duplicate URLs at the source'],
		['Duplicate, Google chose different canonical than user', 'Google ignored your canonical tag', 'Align canonicals, redirects, sitemap and internal links on one URL'],
		['Alternate page with proper canonical tag', 'The page points to another URL as the main version', 'Expected for variants; a problem only if the main page is the one excluded'],
		["Excluded by 'noindex' tag", 'The page asks not to be indexed', 'Remove noindex left from development or a plugin setting'],
		['Blocked by robots.txt', 'Google is not allowed to crawl the URL', 'Unblock pages that should rank; use noindex, not robots.txt, to hide pages'],
		['Soft 404', 'The page looks empty or like an error to Google', 'Return a real 404 or 410, or give the page real content'],
		['Server error (5xx)', 'The server failed when Google visited', 'Fix timeouts, crashes and firewall rules that block Googlebot'],
		['Blocked due to access forbidden (403)', 'The server refused Googlebot', 'Allow Googlebot in the firewall, CDN or security plugin']
	];

	// Status com guia próprio: a linha da tabela leva ao guia (hub → spoke)
	const guideFor: Record<string, string> = {
		'Crawled - currently not indexed': guides.crawledNotIndexed.path,
		'Discovered - currently not indexed': guides.discoveredNotIndexed.path,
		'Duplicate without user-selected canonical': guides.duplicateCanonical.path,
		'Duplicate, Google chose different canonical than user': guides.duplicateCanonical.path,
		'Soft 404': guides.soft404.path
	};

	const faqs: FaqItem[] = [
		{
			question: 'How long does Google take to index a new website?',
			answer:
				'A new site with a sitemap in Search Console is often crawled within days, but indexing every page can take weeks. Google indexes faster when pages are linked from places it already crawls and when each page offers something the index does not have yet.'
		},
		{
			question: 'How do I check which pages are indexed by Google?',
			answer:
				'Use the Pages report in Google Search Console, under Indexing, which lists indexed and non-indexed pages with the reason for each. For a single URL, the URL Inspection tool shows whether it is on Google. A site: search only gives a rough sample.'
		},
		{
			question: 'Does "Request indexing" fix pages that are not indexed?',
			answer:
				'Only when the page was simply not visited yet. If Google crawled the page and decided not to index it, requesting indexing again changes nothing, because the cause is still there. The fix is in the page, the links to it or the technical setup.'
		},
		{
			question: 'What does "Validation failed" mean in Search Console?',
			answer:
				'It means Google checked the URLs after you clicked Validate fix and found the same problem on at least one of them. The validation stops on the first failure, so the remaining URLs may be fine or not. Fix the failing examples and start validation again.'
		},
		{
			question: 'Should every page of my site be indexed?',
			answer:
				'No. Redirects, filtered URLs, internal search results, cart and login pages should stay out of the index. A healthy report has many excluded URLs. What matters is that the pages meant to rank, like services, products and articles, are indexed.'
		},
		{
			question: 'How do I tell Google not to index a page?',
			answer:
				'Add a noindex robots meta tag or an X-Robots-Tag header and leave the page crawlable. Blocking it in robots.txt does not remove it from the index, because Google can no longer see the noindex instruction.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		service: {
			name: services.indexing.name,
			serviceType: 'Google indexing and crawl error fixes',
			description
		}
	});
</script>

<Seo {title} {description} {path} {jsonLd} />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Fix Google Indexing Issues and Unindexed Pages</h1>
		<p>
			When Search Console reports pages as not indexed, those pages cannot appear on Google, however good
			they are. I find why Google is leaving them out and fix the cause in the site: content that looks
			duplicated, missing internal links, wrong canonicals, redirects, noindex tags or server errors.
		</p>
		<p>
			Not every excluded URL is a problem. The job is making sure the pages that should bring traffic are
			the ones Google keeps.
		</p>
		<EmailCta {...email} />
	</header>

	<section aria-labelledby="statuses-title">
		<h2 id="statuses-title">Search Console indexing errors I fix</h2>
		<div class="table-wrap">
			<table>
				<caption>Statuses in the Page indexing report, what they mean and the usual fix</caption>
				<thead>
					<tr>
						<th scope="col">Status</th>
						<th scope="col">What it means</th>
						<th scope="col">Usual fix</th>
					</tr>
				</thead>
				<tbody>
					{#each statuses as [status, meaning, fix] (status)}
						<tr>
							<th scope="row">
								{#if guideFor[status]}<a href={guideFor[status]}>{status}</a>{:else}{status}{/if}
							</th>
							<td>{meaning}</td>
							<td>{fix}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section class="band" aria-labelledby="why-title">
		<h2 id="why-title">Why Google is not indexing your pages</h2>
		<ul class="cards">
			<li>
				<h3>The pages look the same</h3>
				<p>Location or product pages that only swap a name are treated as duplicates and left out.</p>
			</li>
			<li>
				<h3>Nothing links to them</h3>
				<p>Orphan pages, or pages reachable only through search boxes and filters, are crawled rarely.</p>
			</li>
			<li>
				<h3>Crawl is wasted elsewhere</h3>
				<p>Parameters, filters and endless calendars eat the visits Google would spend on real pages.</p>
			</li>
			<li>
				<h3>Google sees an empty page</h3>
				<p>Content loaded by JavaScript after the first render may never reach the index.</p>
			</li>
			<li>
				<h3>A technical block</h3>
				<p>noindex tags, robots.txt rules, canonicals to other URLs, firewalls or server errors.</p>
			</li>
			<li>
				<h3>The site is new</h3>
				<p>A new domain without links gets crawled slowly; structure and internal links speed it up.</p>
			</li>
		</ul>
	</section>

	<section aria-labelledby="process-title">
		<h2 id="process-title">How I fix indexing issues</h2>
		<ol class="steps">
			<li><strong>Sort the report.</strong> Separate the exclusions that are expected from the ones that cost traffic.</li>
			<li><strong>Find the pattern.</strong> Group the URLs by template and status, so one fix solves hundreds of pages.</li>
			<li><strong>Fix the cause.</strong> Canonicals, redirects, internal links, rendering, sitemaps or content merged where pages compete.</li>
			<li><strong>Validate.</strong> Start validation in Search Console and track indexed pages over the following weeks.</li>
		</ol>
		<p>
			The statuses linked in the table have their own guides, starting with the most common one:
			<a href={guides.crawledNotIndexed.path}>how to fix "Crawled - currently not indexed"</a>. When the
			sitemap itself fails, see <a href={guides.sitemapNotRead.path}>"Sitemap could not be read"</a>.
		</p>
	</section>

	<Faq {faqs} title="Google indexing questions" />

	<Related
		links={[
			{ href: guides.crawledNotIndexed.path, text: 'Crawled - currently not indexed: the fix' },
			{ href: guides.discoveredNotIndexed.path, text: 'Discovered - currently not indexed: the fix' },
			{ href: guides.notShowing.path, text: 'Why a website is not showing on Google' },
			{ href: guides.disappeared.path, text: 'A website that disappeared from Google' },
			{ href: services.audit.path, text: 'Technical SEO audit' },
			{ href: industries.ecommerce.path, text: 'Unindexed product and collection pages' }
		]}
	/>

	<Contact {email} title="Send me the indexing report" intro="Email your site and, if you can, a screenshot of the Page indexing report. I reply with which statuses matter and how I would fix them." />
</main>
