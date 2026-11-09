<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import { pageGraph, type Faq as FaqItem, type Step } from '$lib/schema';
	import { guides, guidesPage, services, type Email } from '$lib/site';

	const path = guides.excludedNoindex.path;
	const title = "Excluded by 'noindex' Tag: How to Fix It | Ranking Fixer";
	const description =
		"What \"Excluded by 'noindex' tag\" means in Search Console, where the hidden noindex usually comes from in WordPress, Wix, Shopify and hosts, and how to fix it.";
	const email: Email = { subject: "Excluded by 'noindex' tag", label: 'Have me find the noindex' };

	const crumbs = [
		{ name: guidesPage.name, path: guidesPage.path },
		{ name: guides.excludedNoindex.name, path }
	];

	const forms = `<!-- In the HTML head -->
<meta name="robots" content="noindex, follow">
<meta name="googlebot" content="noindex">

# In the HTTP response headers
X-Robots-Tag: noindex`;

	const commands = `curl -sI https://example.com/page | grep -i x-robots-tag
curl -s https://example.com/page | grep -io '<meta[^>]*noindex[^>]*>'`;

	// Lista ordenada visível. Sem marcação HowTo: o Google aposentou o rich result em 2023.
	const steps: Step[] = [
		{ name: 'Decide which pages should be indexed', text: 'Export the URLs from the report. Thank-you pages, tag archives, login and internal search are usually meant to be noindex; leave them.' },
		{ name: 'Confirm where the noindex is', text: 'URL Inspection with Test live URL says "\'noindex\' detected in \'robots\' meta tag" or "in \'X-Robots-Tag\' http header". That tells you whether to look in the page or in the server.' },
		{ name: 'Remove it at the source', text: 'Change the CMS or plugin setting, the template or the server rule that adds it, so new pages are not born with it.' },
		{ name: 'Clean the sitemap', text: 'The sitemap should list only pages you want indexed. A noindex page in the sitemap sends Google two opposite signals.' },
		{ name: 'Request indexing and validate', text: 'Request indexing for the most important pages, then click Validate fix in the Page indexing report.' }
	];

	const faqs: FaqItem[] = [
		{
			question: "What does \"Excluded by 'noindex' tag\" mean?",
			answer:
				'Google crawled the page and found an instruction not to index it, either a robots meta tag in the HTML or an X-Robots-Tag HTTP header. Google followed it, so the page is not in search results. It is only a problem if the page is one you want people to find.'
		},
		{
			question: 'How do I find where a noindex comes from?',
			answer:
				'Run URL Inspection with Test live URL: it says whether the noindex is in the robots meta tag or in the X-Robots-Tag header. Then check the CMS visibility setting, the SEO plugin settings for that page and its content type, the theme template, and the server or CDN rules that add headers.'
		},
		{
			question: 'Can I remove a noindex tag with JavaScript?',
			answer:
				'Not reliably. When Google finds noindex in the HTML it receives, it may skip rendering the page, so JavaScript that removes the tag never runs for Googlebot. Remove the noindex from the HTML the server sends.'
		},
		{
			question: 'Should I use noindex or robots.txt to hide a page from Google?',
			answer:
				'Use noindex and leave the page crawlable. robots.txt stops Google from reading the page, so it never sees the noindex, and the URL can stay indexed through links.'
		},
		{
			question: 'How long after removing noindex will the page be indexed?',
			answer:
				'Google has to crawl the page again to see the change. Requesting indexing usually brings it back within days for important pages; on a large site the rest follow as Google recrawls them, which can take weeks.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		article: { headline: "Excluded by 'noindex' Tag: How to Fix It" }
	});
</script>

<Seo {title} {description} {path} {jsonLd} ogType="article" />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Excluded by 'noindex' Tag: How to Fix It</h1>
		<p>
			"Excluded by 'noindex' tag" means Google crawled the page and found an instruction not to index it,
			so it obeyed. The instruction is either a robots meta tag in the HTML or an X-Robots-Tag header sent
			by the server.
		</p>
		<p>
			If the page should rank, the noindex was left by a setting, a plugin or a server rule, and removing it
			at the source is the fix.
		</p>
	</header>

	<section aria-labelledby="forms-title">
		<h2 id="forms-title">The two places a noindex can hide</h2>
		<pre><code>{forms}</code></pre>
		<p>
			The header version does not appear in the page source, which is why it survives for months: the page
			looks fine, and only the server response says noindex. Two commands show both:
		</p>
		<pre><code>{commands}</code></pre>
		<p>If either command prints a line, that page tells Google not to index it.</p>
	</section>

	<section class="band" aria-labelledby="sources-title">
		<h2 id="sources-title">Where the unwanted noindex usually comes from</h2>
		<ul class="cards">
			<li>
				<h3>WordPress</h3>
				<p>"Discourage search engines from indexing this site" in Settings, Reading, left on after launch. Yoast and Rank Math can also set noindex for a whole content type or a single post.</p>
			</li>
			<li>
				<h3>Wix, Squarespace and Webflow</h3>
				<p>Page settings that hide a page from search engines, and site-wide indexing toggles that start off on new or unpublished sites.</p>
			</li>
			<li>
				<h3>Shopify</h3>
				<p>Theme code and apps that add noindex to collections, filtered pages or the whole store during setup.</p>
			</li>
			<li>
				<h3>Hosts and CDNs</h3>
				<p>Preview and staging deployments often send <code>X-Robots-Tag: noindex</code>; a rule copied to production keeps doing it.</p>
			</li>
			<li>
				<h3>Templates and frameworks</h3>
				<p>A layout that adds noindex to every page when an environment variable is missing, or to error views that are shown on real pages.</p>
			</li>
			<li>
				<h3>Redesigns and migrations</h3>
				<p>The new site is built behind noindex and launched without removing it, the most common cause of <a href={services.migration.path}>traffic loss after a redesign</a>.</p>
			</li>
		</ul>
	</section>

	<section aria-labelledby="fix-title">
		<h2 id="fix-title">How to fix "Excluded by 'noindex' tag"</h2>
		<Steps {steps} />
		<p>
			If the report shows thousands of noindex pages and all of them should stay out, nothing is wrong. It
			is still worth asking why Google finds them: links to filtered or parameter URLs waste crawl time that
			your important pages need, explained in <a href={guides.discoveredNotIndexed.path}>"Discovered -
			currently not indexed"</a>.
		</p>
	</section>

	<section class="band" aria-labelledby="robots-title">
		<h2 id="robots-title">Do not combine noindex with a robots.txt block</h2>
		<p>
			Google can only see noindex on a page it is allowed to crawl. If the same URL is also blocked in
			robots.txt, the noindex is never read and the URL can stay indexed through links, which is the
			"Indexed, though blocked by robots.txt" status covered in <a href={guides.blockedRobots.path}>Blocked by
			robots.txt</a>.
		</p>
	</section>

	<Faq {faqs} title="Questions about noindex" />

	<Related
		links={[
			{ href: services.indexing.path, text: 'Google indexing fixes' },
			{ href: guides.blockedRobots.path, text: 'Blocked by robots.txt' },
			{ href: guides.urlNotOnGoogle.path, text: 'URL is not on Google' },
			{ href: guides.disappeared.path, text: 'Whole site gone from Google' },
			{ href: guides.notShowing.path, text: 'New website not showing on Google' },
			{ href: services.migration.path, text: 'SEO website migration' }
		]}
	/>

	<Contact {email} title="Pages you need are marked noindex?" intro="Email the site and one URL from the report. I reply with where the noindex comes from and how to remove it for good." />
</main>
