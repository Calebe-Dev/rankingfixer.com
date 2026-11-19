<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import { pageGraph, type Faq as FaqItem, type Step } from '$lib/schema';
	import { guides, guidesPage, services, type Email } from '$lib/site';

	const path = guides.removePage.path;
	const title = 'How to Remove a Page from Google (Noindex, Not robots.txt) | Ranking Fixer';
	const description =
		'How to remove a page from Google search for good: noindex, 404 or 410, redirects and the Removals tool, and why a noindex rule in robots.txt does nothing.';
	const email: Email = { subject: 'Removing pages from Google', label: 'Have me plan the removal' };

	const crumbs = [
		{ name: guidesPage.name, path: guidesPage.path },
		{ name: guides.removePage.name, path }
	];

	const robotsWrong = `# Does nothing: Google stopped reading noindex in robots.txt in 2019
User-agent: *
Noindex: /old-landing-page/

# Makes it worse: Google can no longer see the noindex on the page,
# and the URL can stay indexed through links
Disallow: /old-landing-page/`;

	const noindexRight = `<!-- In the page's HTML head -->
<meta name="robots" content="noindex">

# Or as an HTTP header, which also works for PDFs and other files
X-Robots-Tag: noindex`;

	// Lista ordenada visível. Sem marcação HowTo: o Google aposentou o rich result em 2023.
	const steps: Step[] = [
		{ name: 'Decide whether the page should exist', text: 'Gone for good: return 404 or 410. Moved: 301 redirect to the new address. Must stay live for visitors but not in search: noindex.' },
		{ name: 'Apply the method on the page or server', text: 'Add the noindex tag or header, change the status code, or set the redirect. Leave the URL crawlable so Google can see the change.' },
		{ name: 'Hide it now with the Removals tool if urgent', text: 'In Search Console, Removals, New request. This hides the URL from results for about six months while the permanent method takes effect.' },
		{ name: 'Remove it from the sitemap and internal links', text: 'A URL you do not want indexed should not be listed in the sitemap or linked from menus and articles.' },
		{ name: 'Confirm with URL Inspection', text: 'Run Test live URL. It should show the noindex, the 404 or 410, or the redirect. Then wait for Google to recrawl; the page drops out on the next visit.' }
	];

	const faqs: FaqItem[] = [
		{
			question: 'Can I use noindex in robots.txt?',
			answer:
				'No. Google stopped supporting noindex rules in robots.txt in September 2019. Put noindex in a robots meta tag on the page or in an X-Robots-Tag HTTP header, and leave the page crawlable so Google can read it.'
		},
		{
			question: 'How long does it take to remove a page from Google?',
			answer:
				'The Removals tool in Search Console hides a URL within about a day, for about six months. A noindex tag, a 404 or a 410 removes it permanently the next time Google crawls the page, which can be days for popular pages and weeks for rarely visited ones.'
		},
		{
			question: 'Should I use 404 or 410 to remove a page?',
			answer:
				'Both work. Google treats 410 Gone as a slightly stronger and faster signal that the page will not come back, but over time the result is the same. Use 404 when you are not sure; never return 200 with a "page not found" message, which Google reports as a soft 404.'
		},
		{
			question: 'How do I remove a page from Google that I do not own?',
			answer:
				'Ask the site owner to remove or update it. If the page is already gone or changed but Google still shows the old version, use Google\'s Refresh Outdated Content tool. For personal information like a phone number or home address, Google has a separate removal request for results about you.'
		},
		{
			question: 'Does blocking a page in robots.txt remove it from Google?',
			answer:
				'No. robots.txt stops crawling, not indexing. A blocked page that has links pointing to it can stay in results without a description, reported as "Indexed, though blocked by robots.txt". Allow crawling and use noindex instead.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		article: { headline: 'How to Remove a Page from Google, and Why Noindex in robots.txt Fails' }
	});
</script>

<Seo {title} {description} {path} {jsonLd} ogType="article" />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>How to Remove a Page from Google, and Why Noindex in robots.txt Fails</h1>
		<p>
			To remove a page from Google for good, add a noindex tag, return 404 or 410, or redirect it, and leave
			the URL crawlable so Google sees the change. To hide it right away, add a request in the Search Console
			Removals tool, which lasts about six months while the permanent fix takes effect.
		</p>
		<p>
			What does not work is a noindex rule in robots.txt. Google stopped reading it in 2019, and blocking the
			page in robots.txt can even keep it indexed.
		</p>
	</header>

	<section aria-labelledby="methods-title">
		<h2 id="methods-title">Which method to use</h2>
		<div class="table-wrap">
			<table>
				<caption>Ways to remove a URL from Google search and when each fits</caption>
				<thead>
					<tr>
						<th scope="col">Method</th>
						<th scope="col">Use it when</th>
						<th scope="col">Permanent?</th>
						<th scope="col">Speed</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">noindex tag or X-Robots-Tag</th>
						<td>The page stays live for visitors: thank-you pages, internal search, landing pages for ads</td>
						<td>Yes, while the tag is there</td>
						<td>Next crawl</td>
					</tr>
					<tr>
						<th scope="row">404 or 410</th>
						<td>The page is gone with no replacement</td>
						<td>Yes</td>
						<td>Next crawl; 410 slightly faster</td>
					</tr>
					<tr>
						<th scope="row">301 redirect</th>
						<td>The content moved or was merged into another page</td>
						<td>Yes; signals pass to the new URL</td>
						<td>Next crawl</td>
					</tr>
					<tr>
						<th scope="row">Canonical tag</th>
						<td>The page is a copy or variant of another that should rank</td>
						<td>A hint, not a command</td>
						<td>Weeks</td>
					</tr>
					<tr>
						<th scope="row">Password or login</th>
						<td>Private content that nobody outside should see</td>
						<td>Yes</td>
						<td>Next crawl</td>
					</tr>
					<tr>
						<th scope="row">Removals tool</th>
						<td>Urgent: leaked page, wrong price, private data</td>
						<td>No, about six months</td>
						<td>About a day</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="band" aria-labelledby="robots-title">
		<h2 id="robots-title">Noindex in robots.txt: why it does not work</h2>
		<pre><code>{robotsWrong}</code></pre>
		<p>
			Google ignored <code>Noindex:</code> lines in robots.txt for years and officially dropped them on
			September 1, 2019. And a <code>Disallow</code> rule, the usual next attempt, stops Google from crawling
			the page, so it never sees a noindex there either. If other pages link to the URL, it can stay in
			results as <a href={guides.blockedRobots.path}>"Indexed, though blocked by robots.txt"</a>.
		</p>
		<p>The instruction belongs on the page or in the server response:</p>
		<pre><code>{noindexRight}</code></pre>
	</section>

	<section aria-labelledby="steps-title">
		<h2 id="steps-title">How to remove a page from Google, step by step</h2>
		<Steps {steps} />
		<p>
			Removing many pages at once, like old tag archives or thin location pages, follows the same steps by
			template. Check first that none of them still earns traffic or links; those are better merged and
			redirected than deleted.
		</p>
	</section>

	<section class="band" aria-labelledby="mistakes-title">
		<h2 id="mistakes-title">Mistakes that keep pages in Google</h2>
		<ul class="checks">
			<li><strong>noindex plus a robots.txt block:</strong> the block hides the noindex. Remove the Disallow until the page is out of the index.</li>
			<li><strong>"Not found" pages that answer 200:</strong> Google keeps them and reports a <a href={guides.soft404.path}>soft 404</a>.</li>
			<li><strong>Redirecting everything to the home page:</strong> Google treats mass redirects to an unrelated page as soft 404s.</li>
			<li><strong>noindex added with JavaScript only:</strong> Google may not run the script before deciding; put it in the HTML the server sends.</li>
			<li><strong>The page is still in the sitemap:</strong> it tells Google the opposite of the noindex.</li>
		</ul>
		<p>
			If pages you want indexed are the ones disappearing, the problem is the reverse: see
			<a href={guides.excludedNoindex.path}>"Excluded by 'noindex' tag"</a> and
			<a href={guides.disappeared.path}>website disappeared from Google</a>.
		</p>
	</section>

	<Faq {faqs} title="Questions about removing pages from Google" />

	<Related
		links={[
			{ href: guides.excludedNoindex.path, text: "Pages excluded by 'noindex' by mistake" },
			{ href: guides.blockedRobots.path, text: 'Blocked by robots.txt' },
			{ href: guides.soft404.path, text: 'Soft 404 errors' },
			{ href: guides.urlNotOnGoogle.path, text: 'Checking a URL with URL Inspection' },
			{ href: services.indexing.path, text: 'Google indexing fixes' }
		]}
	/>

	<Contact {email} title="Pages that should be gone still show on Google?" intro="Email the site and a few of the URLs. I reply with why they stay indexed and the fastest way to remove them." />
</main>
