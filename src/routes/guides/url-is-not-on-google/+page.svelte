<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import { pageGraph, type Faq as FaqItem, type Step } from '$lib/schema';
	import { guides, guidesPage, services, type Email } from '$lib/site';

	const path = guides.urlNotOnGoogle.path;
	const title = 'URL Is Not on Google: How to Fix It (and "Indexing Request Rejected") | Ranking Fixer';
	const description =
		'What "URL is not on Google", "Indexing request rejected" and "Not available due to a site-wide issue" mean in URL Inspection, and how to fix each.';
	const email: Email = { subject: 'URL is not on Google', label: 'Send me the URL' };

	const crumbs = [
		{ name: guidesPage.name, path: guidesPage.path },
		{ name: guides.urlNotOnGoogle.name, path }
	];

	// Motivo mostrado em "Page indexing" → guia que resolve (o mesmo status do relatório de páginas)
	const reasons = [
		['URL is unknown to Google', 'Google has never seen the URL', 'Link to it from an indexed page and add it to the sitemap', guides.notShowing.path],
		['Discovered - currently not indexed', 'Google knows the URL and has not crawled it', 'Cut crawl waste and strengthen internal links', guides.discoveredNotIndexed.path],
		['Crawled - currently not indexed', 'Google crawled it and chose not to index it', 'Make the page worth indexing, or merge it', guides.crawledNotIndexed.path],
		["Excluded by 'noindex' tag", 'The page asks not to be indexed', 'Remove the noindex if the page should rank', guides.excludedNoindex.path],
		['Blocked by robots.txt', 'Google is not allowed to crawl it', 'Remove the Disallow rule that matches it', guides.blockedRobots.path],
		['Duplicate without user-selected canonical', 'Google picked another URL as the main version', 'Declare the canonical and remove the copies', guides.duplicateCanonical.path],
		['Alternate page with proper canonical tag', 'The page points to another URL as canonical', 'Fine for variants; fix the tag if this is the main page', guides.alternateCanonical.path],
		['Soft 404', 'The page looks empty or missing', 'Return a real 404 or give the page content', guides.soft404.path]
	];

	// Lista ordenada visível. Sem marcação HowTo: o Google aposentou o rich result em 2023.
	const steps: Step[] = [
		{ name: 'Open the Page indexing section', text: 'In the URL Inspection result, expand Page indexing. The line under "Page is not indexed" is the real reason; "URL is not on Google" is only the verdict.' },
		{ name: 'Run Test live URL', text: 'The first result shows the version Google has stored, which can be weeks old. The live test shows what Google gets now, so you know if the problem is already fixed.' },
		{ name: 'Check the three yes/no lines', text: 'Under Crawl and Indexing, look at "Crawl allowed?", "Page fetch" and "Indexing allowed?". Any "No" or "Failed" is the cause to fix first.' },
		{ name: 'Compare the canonicals', text: 'If "Google-selected canonical" differs from "User-declared canonical", Google is indexing another URL in place of this one.' },
		{ name: 'Look at the rendered page', text: 'Click View tested page and check the screenshot and the HTML. A blank screenshot means the content depends on JavaScript that Google did not run.' },
		{ name: 'Fix the cause, then request indexing', text: 'Request indexing only after the live test passes. Requesting it while the cause is still there ends in "Indexing request rejected" or in the same status weeks later.' }
	];

	const faqs: FaqItem[] = [
		{
			question: 'What does "URL is not on Google" mean?',
			answer:
				'It is the URL Inspection verdict for a page that is not in Google\'s index, so it cannot appear in search results. The reason is shown below the verdict, under Page indexing, and it can be anything from a page Google never found to a noindex tag or a page Google crawled and chose to leave out.'
		},
		{
			question: 'Why is my indexing request rejected?',
			answer:
				'"Indexing request rejected" means the live test Google runs before accepting the request found an indexing problem on the URL, such as a noindex tag, a robots.txt block, an error status, a redirect or a page that cannot be fetched. Run Test live URL, fix the line marked No or Failed, and request indexing again.'
		},
		{
			question: 'What does "Page cannot be indexed: Not available due to a site-wide issue" mean?',
			answer:
				'It means the problem is not on that URL but on the whole site. The usual causes are a robots.txt file that returns a server error or times out, which makes Google pause crawling, a manual action, a security issue or a removal request covering the site. Check the robots.txt report, Manual actions and Security issues in Search Console.'
		},
		{
			question: 'How many times can I request indexing?',
			answer:
				'Search Console allows a small number of indexing requests per property per day and shows "Quota exceeded" when you reach it. Requesting the same URL again does not make it faster, so use the requests for new or fixed pages and let the sitemap cover the rest.'
		},
		{
			question: 'The live test passes, so why is the URL still not on Google?',
			answer:
				'A passing live test only means Google can index the page, not that it will. If the page was crawled and left out, Google is judging its value, not its access. Improve the page or merge it with a similar one, link to it from indexed pages, and wait for the next crawl.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		article: { headline: 'URL Is Not on Google: How to Fix It, Including "Indexing Request Rejected"' }
	});
</script>

<Seo {title} {description} {path} {jsonLd} ogType="article" />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>URL Is Not on Google: How to Fix It, Including "Indexing Request Rejected"</h1>
		<p>
			"URL is not on Google" is the verdict the URL Inspection tool gives when a page is not in Google's
			index. It is not the cause. The cause is written just below it, under Page indexing, and the fix
			depends entirely on that line.
		</p>
		<p>
			This guide shows how to read the result, what the reasons and error messages mean, and when
			requesting indexing helps.
		</p>
	</header>

	<section aria-labelledby="verdicts-title">
		<h2 id="verdicts-title">The main URL Inspection verdicts</h2>
		<div class="table-wrap">
			<table>
				<caption>What each verdict in the URL Inspection tool means</caption>
				<thead>
					<tr>
						<th scope="col">Verdict</th>
						<th scope="col">What it means</th>
						<th scope="col">What to do</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">URL is on Google</th>
						<td>Indexed and eligible to appear in results</td>
						<td>Nothing for indexing; if it does not appear, the problem is ranking</td>
					</tr>
					<tr>
						<th scope="row">URL is on Google, but has issues</th>
						<td>Indexed, with problems in enhancements like structured data</td>
						<td>Fix the listed enhancement; indexing is fine</td>
					</tr>
					<tr>
						<th scope="row">URL is not on Google</th>
						<td>Not indexed; the reason is under Page indexing</td>
						<td>Fix the reason shown, then request indexing</td>
					</tr>
					<tr>
						<th scope="row">URL is not on Google: indexing errors</th>
						<td>Google tried to index it and hit an error</td>
						<td>Fix the error status, block or redirect shown in the details</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="band" aria-labelledby="reasons-title">
		<h2 id="reasons-title">The reason under "Page indexing" and where to fix it</h2>
		<div class="table-wrap">
			<table>
				<caption>Common reasons a URL is not on Google</caption>
				<thead>
					<tr>
						<th scope="col">Reason shown</th>
						<th scope="col">What it means</th>
						<th scope="col">Usual fix</th>
					</tr>
				</thead>
				<tbody>
					{#each reasons as [reason, meaning, fix, guide] (reason)}
						<tr>
							<th scope="row"><a href={guide}>{reason}</a></th>
							<td>{meaning}</td>
							<td>{fix}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section aria-labelledby="fix-title">
		<h2 id="fix-title">How to fix "URL is not on Google"</h2>
		<Steps {steps} />
	</section>

	<section class="band" aria-labelledby="rejected-title">
		<h2 id="rejected-title">"Indexing request rejected"</h2>
		<p>
			When you click Request indexing, Google first runs a live test. If that test finds a problem, the
			request is refused with "Indexing request rejected: During live testing, indexing issues were detected
			with the URL". The page was not judged on quality; Google simply cannot index it as it is.
		</p>
		<ul class="checks">
			<li><strong>Indexing allowed? No:</strong> a <a href={guides.excludedNoindex.path}>noindex tag or X-Robots-Tag header</a> is still on the page or on the server.</li>
			<li><strong>Crawl allowed? No:</strong> a <a href={guides.blockedRobots.path}>robots.txt rule</a> blocks the URL.</li>
			<li><strong>Page fetch: Failed:</strong> the server returned 4xx or 5xx, timed out, or a firewall or bot protection blocked Googlebot.</li>
			<li><strong>The URL redirects:</strong> request indexing for the destination, not for the old address.</li>
			<li><strong>The canonical points elsewhere:</strong> Google will index the canonical URL, not this one.</li>
		</ul>
		<p>Fix the line that fails, run the live test again until it passes, and only then request indexing.</p>
	</section>

	<section aria-labelledby="sitewide-title">
		<h2 id="sitewide-title">"Page cannot be indexed: Not available due to a site-wide issue"</h2>
		<p>
			This message means no page of the property can be indexed right now, so testing more URLs will not
			help. Check these in Search Console, in this order:
		</p>
		<ul class="checks">
			<li><strong>robots.txt report</strong> (Settings): if the file returns a server error or times out, Google pauses crawling of the whole site until it can read it again.</li>
			<li><strong>Manual actions</strong> (Security &amp; Manual Actions): a site-wide action removes the site from results.</li>
			<li><strong>Security issues:</strong> hacked content or malware can keep the site out.</li>
			<li><strong>Removals:</strong> a removal request for the domain or for a prefix that covers the URL.</li>
		</ul>
		<p>
			When pages that used to rank are all gone, the full checklist is in
			<a href={guides.disappeared.path}>website disappeared from Google</a>.
		</p>
	</section>

	<Faq {faqs} title="Questions about URL Inspection" />

	<Related
		links={[
			{ href: services.indexing.path, text: 'Have your indexing issues fixed' },
			{ href: guides.notShowing.path, text: 'Why a website is not showing on Google' },
			{ href: guides.crawledNotIndexed.path, text: 'Crawled - currently not indexed' },
			{ href: guides.excludedNoindex.path, text: "Excluded by 'noindex' tag" },
			{ href: guides.blockedRobots.path, text: 'Blocked by robots.txt' },
			{ href: guides.vibeCoded.path, text: 'Blank screenshot on a JavaScript site' }
		]}
	/>

	<Contact {email} title="Still not on Google after the fix?" intro="Email the URL and a screenshot of the URL Inspection result. I reply with what is keeping it out and what to change." />
</main>
