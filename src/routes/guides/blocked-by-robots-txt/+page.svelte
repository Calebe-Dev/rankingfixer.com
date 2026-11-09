<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import { pageGraph, type Faq as FaqItem, type Step } from '$lib/schema';
	import { guides, guidesPage, industries, services, type Email } from '$lib/site';

	const path = guides.blockedRobots.path;
	const title = 'Blocked by robots.txt in Search Console: How to Fix It | Ranking Fixer';
	const description =
		'What "Blocked by robots.txt" and "Indexed, though blocked by robots.txt" mean, how to find the rule that blocks a page and how to fix it safely.';
	const email: Email = { subject: 'Blocked by robots.txt', label: 'Send me your robots.txt' };

	const crumbs = [
		{ name: guidesPage.name, path: guidesPage.path },
		{ name: guides.blockedRobots.name, path }
	];

	const leftovers = `# Copied from staging: blocks the whole site
User-agent: *
Disallow: /

# Too broad: blocks every URL with a query string,
# including paginated categories and tracked landing pages
Disallow: /*?

# Blocks the files Google needs to render the page
Disallow: /wp-content/
Disallow: /assets/`;

	const fixed = `User-agent: *
Disallow: /cart
Disallow: /checkout
Disallow: /account
Disallow: /search
Disallow: /*?sort=
Disallow: /*?filter=

Sitemap: https://example.com/sitemap.xml`;

	// Lista ordenada visível. Sem marcação HowTo: o Google aposentou o rich result em 2023.
	const steps: Step[] = [
		{ name: 'Export the blocked URLs', text: 'Open the status in the Page indexing report and export the examples. Sort them into pages that should rank and pages that should stay out.' },
		{ name: 'Leave the right ones blocked', text: 'Cart, checkout, account, internal search and endless filter combinations are meant to be blocked. Nothing to fix there.' },
		{ name: 'Find the rule that matches', text: 'Run URL Inspection on a page that should rank. "Crawl allowed? No: blocked by robots.txt" confirms it; then find the Disallow line whose path matches the start of the URL.' },
		{ name: 'Narrow or remove the rule', text: 'Delete rules left from staging, and replace broad patterns like /*? with the exact parameters you want blocked.' },
		{ name: 'Check the live file', text: 'Open the robots.txt report in Search Console settings to see the version Google fetched and when. Google caches the file for up to a day, and you can ask for a recrawl there.' },
		{ name: 'Validate the fix', text: 'Click Validate fix in the Page indexing report and request indexing for the most important pages.' }
	];

	const faqs: FaqItem[] = [
		{
			question: 'What does "Blocked by robots.txt" mean in Search Console?',
			answer:
				'It means a Disallow rule in your robots.txt file stops Googlebot from crawling the URL, so Google cannot read the page. It is correct for pages like cart, checkout and internal search, and a problem only when the blocked URL is one you want in search results.'
		},
		{
			question: 'What does "Indexed, though blocked by robots.txt" mean?',
			answer:
				'Google indexed the URL without crawling it, because other pages link to it. It can appear in results without a description. If the page should rank, remove the block. If it should not, allow crawling and add a noindex tag, because Google can only see noindex on pages it is allowed to crawl.'
		},
		{
			question: 'Does robots.txt remove a page from Google?',
			answer:
				'No. robots.txt controls crawling, not indexing. A blocked page that has links pointing to it can stay indexed. To remove a page, let Google crawl it and add noindex, return 404 or 410, or use the Removals tool for a fast temporary hide.'
		},
		{
			question: 'Where is the robots.txt Tester in Search Console?',
			answer:
				'Google retired the robots.txt Tester in 2023 and replaced it with the robots.txt report under Settings, which shows the file Google fetched, when, and any parsing problems. To test a single URL, use URL Inspection: it says whether crawling is allowed.'
		},
		{
			question: 'Why does Shopify show "Blocked by robots.txt"?',
			answer:
				'Shopify\'s default robots.txt blocks cart, checkout, account, internal search and some filtered collection URLs. Those entries are expected. Edit robots.txt.liquid only if a page you want indexed is blocked, and keep the default rules.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		article: { headline: 'Blocked by robots.txt in Search Console: How to Fix It' }
	});
</script>

<Seo {title} {description} {path} {jsonLd} ogType="article" />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Blocked by robots.txt in Search Console: How to Fix It</h1>
		<p>
			"Blocked by robots.txt" means a Disallow rule in your robots.txt file stops Googlebot from crawling
			the URL. For cart, checkout and internal search pages that is exactly what you want. For a service page,
			a product or an article, it keeps the page out of Google.
		</p>
		<p>
			The fix is to find the rule that matches the URL and narrow it, without opening the pages that
			should stay blocked.
		</p>
	</header>

	<section aria-labelledby="two-title">
		<h2 id="two-title">Blocked vs indexed, though blocked</h2>
		<div class="table-wrap">
			<table>
				<caption>The two robots.txt statuses in the Page indexing report</caption>
				<thead>
					<tr>
						<th scope="col">Status</th>
						<th scope="col">In the index?</th>
						<th scope="col">What happened</th>
						<th scope="col">What to do</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">Blocked by robots.txt</th>
						<td>No</td>
						<td>Google is not allowed to crawl the URL and did not index it</td>
						<td>Unblock it if it should rank; otherwise leave it</td>
					</tr>
					<tr>
						<th scope="row">Indexed, though blocked by robots.txt</th>
						<td>Yes, without content</td>
						<td>Links led Google to index the URL without reading it</td>
						<td>Unblock it if it should rank; if not, allow crawling and add noindex</td>
					</tr>
				</tbody>
			</table>
		</div>
		<p>
			robots.txt controls crawling, not indexing. To keep a page out of the results, Google has to be
			able to crawl it and see a <a href={guides.excludedNoindex.path}>noindex tag</a>. Blocking and
			noindexing the same URL cancels the noindex.
		</p>
	</section>

	<section class="band" aria-labelledby="causes-title">
		<h2 id="causes-title">Rules that block pages by accident</h2>
		<pre><code>{leftovers}</code></pre>
		<ul class="cards">
			<li>
				<h3>Staging rules that went live</h3>
				<p>A <code>Disallow: /</code> from the development server, copied with the rest of the site at launch or in a redesign.</p>
			</li>
			<li>
				<h3>Patterns that match too much</h3>
				<p>Rules match the start of the path, so <code>Disallow: /blog</code> also blocks <code>/blog-post-title</code> and <code>/blogroll</code>.</p>
			</li>
			<li>
				<h3>Query string blocks</h3>
				<p><code>Disallow: /*?</code> blocks every URL with a parameter, including pagination and landing pages that use one.</p>
			</li>
			<li>
				<h3>Blocked CSS and JavaScript</h3>
				<p>Google needs these files to render the page. Blocking them can make a page look empty or broken.</p>
			</li>
			<li>
				<h3>Case and trailing slashes</h3>
				<p>Paths are case-sensitive: <code>Disallow: /Private</code> does not block <code>/private</code>, and the reverse.</p>
			</li>
			<li>
				<h3>Plugins and platform defaults</h3>
				<p>SEO plugins, security plugins and hosts can write rules you never see in the theme files.</p>
			</li>
		</ul>
	</section>

	<section aria-labelledby="fix-title">
		<h2 id="fix-title">How to fix "Blocked by robots.txt"</h2>
		<Steps {steps} />
		<p>A safe starting point for most stores and service sites blocks only what has no search value:</p>
		<pre><code>{fixed}</code></pre>
		<p>
			When two rules match the same URL, Google follows the most specific one, the one with the longest
			path. If an Allow and a Disallow are equally specific, the Allow wins.
		</p>
	</section>

	<section class="band" aria-labelledby="server-title">
		<h2 id="server-title">When robots.txt itself fails</h2>
		<p>
			If robots.txt returns 404, Google crawls everything. If it returns a server error or times out,
			Google stops crawling the whole site for a while and then falls back to the last copy it read. A
			firewall or CDN that blocks the file for Googlebot can keep an entire site out of the index, and in
			URL Inspection it shows up as <a href={guides.urlNotOnGoogle.path}>"Not available due to a site-wide
			issue"</a>.
		</p>
		<p>
			Large stores often block filters on purpose to save crawl budget; how to choose what to block is in
			<a href={industries.ecommerce.path}>ecommerce technical SEO</a> and
			<a href={guides.discoveredNotIndexed.path}>"Discovered - currently not indexed"</a>.
		</p>
	</section>

	<Faq {faqs} title="Questions about robots.txt" />

	<Related
		links={[
			{ href: services.indexing.path, text: 'Google indexing fixes' },
			{ href: guides.excludedNoindex.path, text: "Excluded by 'noindex' tag" },
			{ href: guides.urlNotOnGoogle.path, text: 'Reading URL Inspection results' },
			{ href: guides.disappeared.path, text: 'Website disappeared from Google' },
			{ href: guides.sitemapNotRead.path, text: 'Sitemap could not be read' },
			{ href: services.migration.path, text: 'Launching a redesign without staging rules' }
		]}
	/>

	<Contact {email} title="Not sure which rule is blocking you?" intro="Email the site and one blocked URL that should rank. I reply with the rule that matches it and the safe change." />
</main>
