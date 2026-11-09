<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import { pageGraph, type Faq as FaqItem, type Step } from '$lib/schema';
	import { guides, guidesPage, services, type Email } from '$lib/site';

	const path = guides.vibeCoded.path;
	const title = 'Vibe-Coded Website Not Indexed? Fix Lovable, Bolt and v0 SEO | Ranking Fixer';
	const description =
		'Why sites built with Lovable, Bolt, v0 and other AI builders show up empty to Google and AI crawlers, how to test yours in a minute and how to fix it.';
	const email: Email = { subject: 'Vibe-coded site not indexed', label: 'Have me check your site' };

	const crumbs = [
		{ name: guidesPage.name, path: guidesPage.path },
		{ name: guides.vibeCoded.name, path }
	];

	// O que o crawler recebe de uma SPA típica gerada por IA, antes de qualquer JavaScript
	const shell = `<!doctype html>
<html lang="en">
  <head>
    <title>My App</title>
    <meta name="description" content="Lovable Generated Project" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/index-4f2a.js"><\/script>
  </body>
</html>`;

	const commands = `curl -s https://example.com/pricing | grep -i "<title>"
curl -s https://example.com/pricing | grep -c "a sentence from the page"
curl -s -o /dev/null -w "%{http_code}\\n" https://example.com/this-page-does-not-exist`;

	// Lista ordenada visível. Sem marcação HowTo: o Google aposentou o rich result em 2023.
	const steps: Step[] = [
		{ name: 'Prerender every public page', text: 'Generate real HTML for each route at build time, so the title, the text and the links are in the file before any JavaScript runs. This is the change that fixes most of the list below at once.' },
		{ name: 'Give each route its own title and description', text: 'One title per page, written for the search it should answer, plus a meta description and a canonical tag pointing to the clean URL.' },
		{ name: 'Use real links', text: 'Navigation must be <a href> elements to real paths. Buttons with click handlers and #/ hash routes are not followed as links.' },
		{ name: 'Return a real 404', text: 'Unknown paths must answer 404, not the app shell with status 200. Remove the catch-all rewrite or limit it to the routes that exist.' },
		{ name: 'Publish robots.txt and sitemap.xml', text: 'Both as static files at the root, with the sitemap listing only the canonical URL of each public page.' },
		{ name: 'Verify in Search Console', text: 'Add the domain property, submit the sitemap and run a live URL Inspection on the home page and one inner page to confirm Google gets the content.' }
	];

	const faqs: FaqItem[] = [
		{
			question: 'Can Google index a Lovable or Bolt website?',
			answer:
				'Yes, Google runs JavaScript, so it can index a client-side React app. The problems are that rendering happens later than crawling, every route starts with the same title and description, unknown URLs often return 200, and links that are not real anchors are not followed. Most other search engines and AI crawlers do not run JavaScript at all and see an empty page.'
		},
		{
			question: 'Why does my vibe-coded site show the same title on every page in Google?',
			answer:
				'Because there is only one HTML file, index.html, and its title is the one the builder generated. A library like react-helmet-async changes the title after JavaScript runs, which Google usually picks up but other crawlers and link previews do not. Prerendering each route puts the right title in the HTML itself.'
		},
		{
			question: 'Do I need to rebuild my vibe-coded site in Next.js?',
			answer:
				'Not always. A marketing site or landing pages can usually be prerendered without changing the stack. A rebuild in a framework with server rendering, like Next.js, Astro or SvelteKit, makes sense when the site has many dynamic pages, like listings or a blog, that must stay current without a rebuild.'
		},
		{
			question: 'Can ChatGPT and other AI assistants read my vibe-coded site?',
			answer:
				'Most AI crawlers fetch the HTML and do not run JavaScript, so a client-side app shows them only the empty shell. If being cited by AI assistants matters, the text has to be in the HTML, which again means prerendering or server rendering.'
		},
		{
			question: 'How long does it take for a fixed vibe-coded site to get indexed?',
			answer:
				'After the HTML is fixed and the sitemap is submitted, Google usually crawls the main pages within days. A new domain with few links can take several weeks to get most pages indexed, so link to the site from places Google already visits.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		article: { headline: 'Vibe-Coded Website Not Indexed? How to Fix Lovable, Bolt and v0 SEO' }
	});
</script>

<Seo {title} {description} {path} {jsonLd} ogType="article" />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Vibe-Coded Website Not Indexed? How to Fix Lovable, Bolt and v0 SEO</h1>
		<p>
			Most sites built with AI app builders are single-page React apps: the server sends one almost empty
			HTML file and JavaScript draws the page in the browser. People see a finished site. Google sees the same
			title on every URL and has to run the JavaScript before it finds any text, and most AI crawlers never
			run it at all.
		</p>
		<p>
			The fix is to send real HTML for every public page. Everything else on this page is how to check
			whether your site has the problem, and what to change.
		</p>
	</header>

	<section aria-labelledby="see-title">
		<h2 id="see-title">What a crawler receives from a typical vibe-coded site</h2>
		<p>
			Open your site, press Ctrl+U (or Cmd+Option+U on a Mac) and look at the source. If it looks like this,
			the content only exists after JavaScript runs:
		</p>
		<pre><code>{shell}</code></pre>
		<p>
			Every route, from the home page to <code>/pricing</code>, returns this same file. The title and the
			description are the ones the builder created with the project, and there is no text and no link for a
			crawler to follow.
		</p>
	</section>

	<section class="band" aria-labelledby="why-title">
		<h2 id="why-title">Why vibe-coded sites do not rank</h2>
		<ul class="cards">
			<li>
				<h3>Content only after JavaScript</h3>
				<p>Google renders the page in a second pass that can come much later than the crawl. Bing renders less, and most AI crawlers not at all.</p>
			</li>
			<li>
				<h3>One title for every page</h3>
				<p>All routes share the title and description in <code>index.html</code>, so Google sees many pages that look like copies.</p>
			</li>
			<li>
				<h3>Every URL answers 200</h3>
				<p>The host rewrites any path to the app, so mistyped and deleted URLs look like real pages and end up as <a href={guides.soft404.path}>soft 404s</a>.</p>
			</li>
			<li>
				<h3>Links that are not links</h3>
				<p>Cards and buttons that navigate with a click handler, or routes after <code>#/</code>, give Googlebot nothing to follow.</p>
			</li>
			<li>
				<h3>No sitemap or robots.txt</h3>
				<p>Builders rarely create them, so Google only finds the pages it can reach by links, which may be none.</p>
			</li>
			<li>
				<h3>Empty link previews</h3>
				<p>LinkedIn, Slack and WhatsApp read Open Graph tags from the HTML without running JavaScript, so every shared page shows the same card.</p>
			</li>
		</ul>
	</section>

	<section aria-labelledby="test-title">
		<h2 id="test-title">Test your site in a minute</h2>
		<p>Three commands in a terminal tell you what a crawler gets. Replace the domain and the path with yours:</p>
		<pre><code>{commands}</code></pre>
		<ul class="checks">
			<li><strong>Title:</strong> each page should print its own title. If every path prints the same one, the titles are not in the HTML.</li>
			<li><strong>Text:</strong> a sentence you can read on the page should be found at least once. A 0 means the text only exists after JavaScript.</li>
			<li><strong>404:</strong> a path that does not exist should return 404. A 200 means every typo becomes a page Google can crawl.</li>
		</ul>
		<p>
			In Search Console, <a href={guides.urlNotOnGoogle.path}>URL Inspection</a> with Test live URL shows the
			HTML Google rendered and a screenshot. If the screenshot is blank or a loading spinner, Google is
			not getting your content either.
		</p>
	</section>

	<section class="band" aria-labelledby="builders-title">
		<h2 id="builders-title">What each builder usually produces</h2>
		<div class="table-wrap">
			<table>
				<caption>Typical output of AI site builders and what to check first</caption>
				<thead>
					<tr>
						<th scope="col">Builder</th>
						<th scope="col">Usual output</th>
						<th scope="col">Check first</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">Lovable</th>
						<td>React and Vite single-page app</td>
						<td>Same title on every route, empty HTML, 200 for unknown paths</td>
					</tr>
					<tr>
						<th scope="row">Bolt.new</th>
						<td>Often a Vite single-page app; depends on the prompt</td>
						<td>Whether the project uses a framework with server rendering or a plain SPA</td>
					</tr>
					<tr>
						<th scope="row">v0</th>
						<td>Next.js components</td>
						<td>Pages marked as client components and data fetched only in the browser</td>
					</tr>
					<tr>
						<th scope="row">Replit, Base44 and others</th>
						<td>Varies: SPA, server app or both</td>
						<td>Run the three commands above; the result matters more than the tool</td>
					</tr>
				</tbody>
			</table>
		</div>
		<p>
			Builders change quickly and some now offer prerendering or server rendering options. The test above
			tells you what your site actually sends today, whatever the builder promises.
		</p>
	</section>

	<section aria-labelledby="fix-title">
		<h2 id="fix-title">How to fix a vibe-coded site for Google</h2>
		<Steps {steps} />
		<p>
			For a React and Vite project, prerendering can be added with a plugin such as
			<code>vite-react-ssg</code> or by moving the routes to a framework that prerenders, like React Router in
			framework mode, Next.js or Astro. Which one fits depends on how the project fetches data and on the
			host, and that is usually where AI-generated code needs a developer.
		</p>
		<p>
			This site is built that way: SvelteKit with every page prerendered and no JavaScript sent to the
			browser, so Google and AI crawlers read the same HTML as visitors.
		</p>
	</section>

	<Faq {faqs} title="Questions about vibe-coded sites and SEO" />

	<Related
		links={[
			{ href: services.audit.path, text: 'Technical SEO audit for JavaScript sites' },
			{ href: guides.soft404.path, text: 'Soft 404s in single-page apps' },
			{ href: guides.notShowing.path, text: 'Website not showing up on Google' },
			{ href: guides.crawledNotIndexed.path, text: 'Crawled - currently not indexed' },
			{ href: guides.llmsTxt.path, text: 'llms.txt and AI crawlers' },
			{ href: services.indexing.path, text: 'Google indexing fixes' }
		]}
	/>

	<Contact {email} title="Built your site with AI and Google ignores it?" intro="Email the URL and the builder you used. I reply with what Google and AI crawlers see today and the smallest change that gets your pages indexed." />
</main>
