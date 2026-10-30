<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import { pageGraph, type Faq as FaqItem, type Step } from '$lib/schema';
	import { guides, guidesPage, industries, services, type Email } from '$lib/site';

	const path = guides.discoveredNotIndexed.path;
	const title = 'Discovered - Currently Not Indexed: How to Fix It | Ranking Fixer';
	const description =
		'Discovered - currently not indexed means Google knows the URL but has not crawled it yet. See why it happens and how to get those pages crawled.';
	const email: Email = { subject: 'Discovered - currently not indexed', label: 'Have me look at your report' };

	const crumbs = [
		{ name: guidesPage.name, path: guidesPage.path },
		{ name: guides.discoveredNotIndexed.name, path }
	];

	// Lista ordenada visível. Sem marcação HowTo: o Google aposentou o rich result em 2023.
	const steps: Step[] = [
		{ name: 'Separate the URLs that should never be crawled', text: 'Export the examples and set aside filter combinations, sort orders, tracking parameters, internal search results and session URLs. They do not need to be indexed, and most do not need to be crawled either.' },
		{ name: 'Stop generating them', text: 'Link to clean URLs only, remove crawlable links to filter combinations nobody searches for, and block crawl traps such as endless calendars in robots.txt.' },
		{ name: 'Fix the server', text: 'Bring server errors close to zero and keep responses fast. Caching full pages at a CDN usually does more than any other single change.' },
		{ name: 'Link to the pages that matter', text: 'Add links from the home page, menus, categories and related articles. Pages that only the sitemap mentions are the ones that wait the longest.' },
		{ name: 'Clean the sitemap', text: 'List only canonical, indexable URLs, with lastmod dates that change only when the page really changes, so the sitemap points Google at what is new.' },
		{ name: 'Improve or merge weak pages', text: 'If many pages that Google did crawl ended up not indexed, fix those first. A site whose crawled pages get indexed gives Google a reason to crawl more of it.' },
		{ name: 'Request indexing for a few key URLs', text: 'Use URL Inspection for the handful of pages that matter most. It works one URL at a time and does not change how the rest of the site is crawled.' },
		{ name: 'Track the count per template', text: 'Watch the number of discovered URLs for each type of page over the following weeks. It falls gradually as Google catches up, not overnight.' }
	];

	const faqs: FaqItem[] = [
		{
			question: 'What does "Discovered - currently not indexed" mean?',
			answer:
				'It means Google found the URL, usually through a link or a sitemap, but has not crawled it yet. Search Console explains that Google wanted to crawl the page but expected the visit to overload the site, so it rescheduled the crawl. The page has not been judged yet; it is waiting in the queue.'
		},
		{
			question: 'Is "Discovered - currently not indexed" an error?',
			answer:
				'Not by itself. Every site has URLs in this state, and many of them, like filtered or parameter URLs, should never be indexed anyway. It matters when it holds back pages meant to rank, such as services, products or articles, or when the count keeps growing.'
		},
		{
			question: 'Should I request indexing for discovered pages?',
			answer:
				'For a few important pages, yes. URL Inspection lets you ask Google to crawl a specific URL. For hundreds of pages it does not scale, and the cause, whether crawl waste, weak internal links or a slow server, stays in place.'
		},
		{
			question: 'Does submitting a sitemap fix "Discovered - currently not indexed"?',
			answer:
				'No. A sitemap is often how Google discovered these URLs in the first place. It helps when it lists only canonical, indexable pages, but internal links and how fast the server answers decide how soon Google crawls them.'
		},
		{
			question: 'How is it different from "Crawled - currently not indexed"?',
			answer:
				'With "Discovered", Google has not visited the page. With "Crawled", it visited and chose not to index it. The first points to crawl capacity and links; the second points to the page itself, usually content that looks duplicated or adds little.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		article: { headline: 'Discovered - Currently Not Indexed: How to Fix It' }
	});
</script>

<Seo {title} {description} {path} {jsonLd} ogType="article" />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Discovered - Currently Not Indexed: How to Fix It</h1>
		<p>
			"Discovered - currently not indexed" means Google knows the URL exists, usually from a link or the
			sitemap, but has not crawled it yet. Google rescheduled the visit because it expected crawling to
			overload the site. The fix is in what Google spends its visits on: duplicate URLs, internal links
			and how fast the server answers.
		</p>
		<p>
			Requesting indexing works for a handful of URLs. When hundreds of pages wait, the cause is in the
			site, and that is the kind of problem I solve in <a href={services.indexing.path}>Google indexing fixes</a>.
		</p>
	</header>

	<section aria-labelledby="meaning-title">
		<h2 id="meaning-title">What Google means by "Discovered"</h2>
		<p>
			The Page indexing report in Search Console describes the status this way: "The page was found by
			Google, but not crawled yet. Typically, Google wanted to crawl the URL but this was expected to
			overload the site; therefore Google rescheduled the crawl."
		</p>
		<p>
			Two things decide how much of a site Google crawls: how much the server can take without slowing
			down, and how much Google wants the URLs it knows about. A slow or failing server lowers the first.
			Thousands of near-identical URLs, pages nobody links to and a large share of weak pages lower the
			second.
		</p>
	</section>

	<section class="band" aria-labelledby="vs-title">
		<h2 id="vs-title">Discovered vs crawled - currently not indexed</h2>
		<div class="table-wrap">
			<table>
				<caption>How to tell the two "not indexed" statuses apart</caption>
				<thead>
					<tr>
						<th scope="col">Status</th>
						<th scope="col">Has Google visited the page?</th>
						<th scope="col">What it tells you</th>
						<th scope="col">Check first</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">Discovered - currently not indexed</th>
						<td>No</td>
						<td>The URL is waiting in the crawl queue</td>
						<td>Crawl stats, server errors, duplicate URLs and internal links</td>
					</tr>
					<tr>
						<th scope="row">Crawled - currently not indexed</th>
						<td>Yes</td>
						<td>Google read the page and did not keep it</td>
						<td>The page itself: duplicate, thin or barely linked content</td>
					</tr>
				</tbody>
			</table>
		</div>
		<p>
			When pages move from "Discovered" to "Crawled - currently not indexed", Google has visited them and
			the problem changes. That case has its own guide:
			<a href={guides.crawledNotIndexed.path}>how to fix "Crawled - currently not indexed"</a>.
		</p>
	</section>

	<section aria-labelledby="why-title">
		<h2 id="why-title">Why Google finds a URL and does not crawl it</h2>
		<ul class="cards">
			<li>
				<h3>The server is slow or failing</h3>
				<p>When responses slow down or return server errors, Googlebot throttles its requests to avoid overloading the site, and pages wait.</p>
			</li>
			<li>
				<h3>Too many URLs compete for the same visits</h3>
				<p>Filters, sort orders, tracking parameters, calendars and internal search can turn a few hundred pages into thousands of addresses.</p>
			</li>
			<li>
				<h3>The page is only in the sitemap</h3>
				<p>A sitemap tells Google a page exists, not that it matters. A URL no indexed page links to looks unimportant.</p>
			</li>
			<li>
				<h3>The site is new or has few links</h3>
				<p>Google crawls a new domain cautiously. Links from your own indexed pages and from other sites raise its interest.</p>
			</li>
			<li>
				<h3>Most crawled pages were not indexed</h3>
				<p>If Google keeps visiting pages it then leaves out, it has less reason to fetch the rest. Fixing those often unblocks the queue.</p>
			</li>
			<li>
				<h3>A large batch went live at once</h3>
				<p>An import, a new section or a programmatic launch puts thousands of URLs in the queue on the same day.</p>
			</li>
		</ul>
	</section>

	<section class="band" aria-labelledby="check-title">
		<h2 id="check-title">How to find the cause in Search Console</h2>
		<ul class="checks">
			<li><strong>Open Crawl stats.</strong> It is under Settings. Host status shows problems with robots.txt fetching, DNS resolution and server connectivity.</li>
			<li><strong>Read the responses.</strong> Most crawl requests should return 200. A visible share of server errors explains a slow queue on its own.</li>
			<li><strong>Watch the average response time.</strong> If it climbs when Google crawls more, the server is the limit, not Google.</li>
			<li><strong>Look at the example URLs, not only the count.</strong> Parameters and filters point to crawl waste; real pages with no internal links point to the site structure.</li>
			<li><strong>Test a few URLs live.</strong> In URL Inspection, Test live URL confirms the page loads for Google and is not blocked.</li>
		</ul>
	</section>

	<section aria-labelledby="fix-title">
		<h2 id="fix-title">How to fix "Discovered - currently not indexed"</h2>
		<Steps {steps} />
		<p>
			On online stores, most discovered URLs come from filters and variants, covered in
			<a href={industries.ecommerce.path}>ecommerce technical SEO</a>. If the sitemap itself shows an error
			in Search Console, start with <a href={guides.sitemapNotRead.path}>"Sitemap could not be read"</a>.
		</p>
	</section>

	<section class="band" aria-labelledby="time-title">
		<h2 id="time-title">How long can a page stay "Discovered"?</h2>
		<p>
			There is no deadline. Google does not promise to crawl or index every URL it knows, so a page can
			stay in this state indefinitely if nothing changes. On small sites the wait usually ends when the page
			gets internal links and the site earns some trust; on large sites, when crawl waste is cut and the
			server keeps up.
		</p>
		<p>
			When I launched this site in October 2026, every page was linked from the menu and listed in a
			sitemap generated from the code, and Google crawled and indexed them within a few days. When a small
			site stays in "Discovered" for weeks, I check the server and the internal links before anything else.
		</p>
	</section>

	<section aria-labelledby="platforms-title">
		<h2 id="platforms-title">Notes by platform</h2>
		<ul class="cards">
			<li>
				<h3>Shopify</h3>
				<p>Many themes link to products through collection paths and tag filters. Linking to the main product URL gives Google fewer addresses for the same page.</p>
			</li>
			<li>
				<h3>WordPress</h3>
				<p>Tag, author, date and attachment archives add URLs that rarely deserve a visit. Most SEO plugins can drop them from the sitemap.</p>
			</li>
			<li>
				<h3>Wix and Squarespace</h3>
				<p>Crawl waste is rarely the cause on small sites. A new site with few links is; internal links and a few links from other sites help most.</p>
			</li>
			<li>
				<h3>Large and custom sites</h3>
				<p>Check server capacity when Google crawls most, and whether faceted navigation creates crawlable combinations without limit.</p>
			</li>
		</ul>
	</section>

	<Faq {faqs} title="Questions about discovered pages" />

	<Related
		links={[
			{ href: services.indexing.path, text: 'Have your indexing issues fixed' },
			{ href: guides.crawledNotIndexed.path, text: 'Crawled - currently not indexed' },
			{ href: guides.duplicateCanonical.path, text: 'Duplicate URLs that waste crawling' },
			{ href: guides.sitemapNotRead.path, text: 'Sitemap could not be read' },
			{ href: industries.ecommerce.path, text: 'Filters and variants on online stores' }
		]}
	/>

	<Contact {email} title={'Pages stuck in "Discovered"?'} intro="Email the site and the number of URLs in the report. I reply with where Google's crawling is going and what would get the important pages crawled." />
</main>
