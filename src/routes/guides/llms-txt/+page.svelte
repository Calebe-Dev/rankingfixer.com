<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import { pageGraph, type Faq as FaqItem, type Step } from '$lib/schema';
	import { SITE_URL, guides, guidesPage, services, type Email } from '$lib/site';

	const path = guides.llmsTxt.path;
	const title = 'llms.txt: What It Is, Who Reads It, and Whether You Need One | Ranking Fixer';
	const description =
		'llms.txt is a Markdown file that summarizes a site for AI tools. See the format, who actually reads it, how it differs from robots.txt and when it is worth adding.';
	const email: Email = { subject: 'llms.txt question', label: 'Ask about your site' };

	const crumbs = [
		{ name: guidesPage.name, path: guidesPage.path },
		{ name: guides.llmsTxt.name, path }
	];

	// Os três arquivos da raiz que costumam ser confundidos
	const files = [
		['robots.txt', 'Tells crawlers which URLs they may fetch', 'Search engines and most AI crawlers', 'Yes, for decades'],
		['sitemap.xml', 'Lists the URLs you want discovered', 'Google, Bing and other search engines', 'Yes'],
		['llms.txt', 'Summarizes the site and points AI tools to its most useful links', 'Some tools, usually when someone hands them the link', 'No: a proposal without confirmed support from the major search engines']
	];

	// Lista ordenada visível. Sem marcação HowTo: o Google aposentou o rich result em 2023.
	const steps: Step[] = [
		{ name: 'Start with a title and a summary', text: 'The first line is "# Site name", followed by a blockquote (a line starting with ">") that says what the site is and who it is for, in one or two sentences.' },
		{ name: 'Group the key pages in sections', text: 'Use "##" headings such as Services, Guides and About. Under each, list the pages as Markdown links with a short description after a colon.' },
		{ name: 'List only live, indexable pages', text: 'Every link should return 200 and be allowed in search. A broken link or a noindexed page in llms.txt is a sign the file was written once and forgotten.' },
		{ name: 'Publish it at the root as plain text', text: 'Serve it at /llms.txt on the main host, next to robots.txt. A static file is enough; it does not need to be in the sitemap.' },
		{ name: 'Keep it in sync with the site', text: 'Update it when you publish or remove an important page. The summary has to match what the pages actually say.' }
	];

	const faqs: FaqItem[] = [
		{
			question: 'Does llms.txt help SEO?',
			answer:
				'No. Google has said Search does not use llms.txt, so it does not change rankings or your chances of appearing in AI Overviews. The file is cheap and harmless, but what gets a site found and cited is still indexing, pages that answer the question and a source search engines trust.'
		},
		{
			question: 'Is llms.txt the same as robots.txt?',
			answer:
				'No. robots.txt controls which crawlers may fetch which URLs, and search engines and most AI crawlers respect it. llms.txt only describes the site; it neither allows nor blocks anything.'
		},
		{
			question: 'Does ChatGPT read llms.txt?',
			answer:
				'OpenAI has not confirmed using llms.txt in ChatGPT search. For ChatGPT to cite your pages, robots.txt has to allow OAI-SearchBot, its search crawler, and the pages have to be well indexed, including in Bing.'
		},
		{
			question: 'What is llms-full.txt?',
			answer:
				'An optional companion file from the same proposal that holds the full text of the important pages in one Markdown file. It is mostly used by software documentation, so a developer can give an AI coding assistant the whole documentation at once.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		article: { headline: 'llms.txt: What It Is, Who Reads It, and Whether You Need One' }
	});
</script>

<Seo {title} {description} {path} {jsonLd} ogType="article" />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>llms.txt: What It Is, Who Reads It, and Whether You Need One</h1>
		<p>
			llms.txt is a plain Markdown file at the root of a site, at the address /llms.txt, that summarizes the site
			and lists its most useful links for large language models. Jeremy Howard of Answer.AI proposed it in
			September 2024. It is cheap and harmless, but it is not a standard the major search engines use: Google
			has said Search does not read it.
		</p>
		<p>
			Short answer: add one if your site is technical documentation, or if the basics are already done. Do not
			expect rankings or AI citations from it. This site publishes one, and the example below is taken from it.
		</p>
	</header>

	<section aria-labelledby="format-title">
		<h2 id="format-title">What an llms.txt file looks like</h2>
		<p>
			The proposal keeps the structure simple: a title with the site name, a blockquote with a short summary,
			then sections that list links, each with a one-line description. This is the start of the file on
			rankingfixer.com, shortened:
		</p>
		<pre><code># Ranking Fixer

&gt; Ranking Fixer (rankingfixer.com) is a technical SEO consultancy run by
&gt; Calebe Araujo (…) It finds the technical problems that keep websites
&gt; from ranking on Google and implements the fixes in the code.

## Services

- [Technical SEO audit](https://rankingfixer.com/technical-seo-audit): crawling,
  indexing, rendering, speed and structured data, ranked by impact.
- [Google indexing fixes](https://rankingfixer.com/google-indexing-issues):
  Search Console page indexing errors.

## Guides

- [Soft 404 errors in Search Console](https://rankingfixer.com/guides/soft-404):
  pages that return 200 but look missing.</code></pre>
		<p>
			The full file is at <a href={`${SITE_URL}/llms.txt`}>rankingfixer.com/llms.txt</a>. The proposal also
			describes an optional <code>llms-full.txt</code> with the full text of the pages in one file.
		</p>
	</section>

	<section class="band" aria-labelledby="compare-title">
		<h2 id="compare-title">llms.txt vs robots.txt vs sitemap.xml</h2>
		<p>All three live at the root of the site and get mixed up, but they do different jobs. Only llms.txt is not an established standard.</p>
		<div class="table-wrap">
			<table>
				<caption>The three files at the root of a site</caption>
				<thead>
					<tr>
						<th scope="col">File</th>
						<th scope="col">What it does</th>
						<th scope="col">Who reads it</th>
						<th scope="col">A standard?</th>
					</tr>
				</thead>
				<tbody>
					{#each files as [file, does, who, standard] (file)}
						<tr>
							<th scope="row"><code>{file}</code></th>
							<td>{does}</td>
							<td>{who}</td>
							<td>{standard}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section aria-labelledby="who-title">
		<h2 id="who-title">Who actually reads llms.txt</h2>
		<p>
			The real use today is software documentation. Documentation platforms generate the file automatically,
			and developers paste the link into AI coding assistants so the tool reads the whole documentation at once.
			There the file works because someone hands it to the model on purpose.
		</p>
		<p>
			Search is a different story. Google has said it does not use llms.txt, and no major answer engine has
			confirmed relying on it to choose sources. AI Overviews and AI Mode work from Google's regular search
			index. ChatGPT search uses OpenAI's own crawlers and search partners such as Bing.
		</p>
	</section>

	<section class="band" aria-labelledby="should-title">
		<h2 id="should-title">Should you add one?</h2>
		<ul class="checks">
			<li><strong>Yes, if</strong> you publish documentation for software, an API or a technical product that developers feed to AI assistants.</li>
			<li><strong>Yes, if</strong> the site is already well indexed and you want a tidy summary of it for almost no effort.</li>
			<li><strong>Not yet, if</strong> important pages are missing from Google, the site is slow, or the text only appears after JavaScript runs. Time spent there pays off more.</li>
			<li><strong>No, if</strong> the goal is "getting into AI answers". Anyone promising results from the file is selling hope.</li>
		</ul>
	</section>

	<section aria-labelledby="first-title">
		<h2 id="first-title">What to fix before llms.txt</h2>
		<ul class="checks">
			<li><strong>Pages in the index.</strong> Check the Page indexing report. If key pages are out, start with <a href={guides.notShowing.path}>why a website is not showing on Google</a> or <a href={guides.crawledNotIndexed.path}>"Crawled - currently not indexed"</a>.</li>
			<li><strong>Crawlers allowed.</strong> robots.txt and the CDN or firewall must not block Googlebot, Bingbot or OAI-SearchBot. Some CDNs now block AI crawlers by default on new domains.</li>
			<li><strong>Text in the HTML.</strong> Most AI crawlers do not run JavaScript. If the content only appears after scripts run, the page looks empty to them.</li>
			<li><strong>Pages that answer.</strong> Start each section with the direct answer, and include information only you have: prices, timelines, real cases.</li>
		</ul>
	</section>

	<section class="band" aria-labelledby="write-title">
		<h2 id="write-title">How to write an llms.txt file</h2>
		<Steps {steps} />
	</section>

	<Faq {faqs} title="Questions about llms.txt" />

	<Related
		links={[
			{ href: guides.notShowing.path, text: 'Website not showing on Google' },
			{ href: guides.crawledNotIndexed.path, text: 'Crawled - currently not indexed' },
			{ href: services.audit.path, text: 'Technical SEO audit' },
			{ href: services.indexing.path, text: 'Google indexing fixes' }
		]}
	/>

	<Contact {email} title="Not sure your site needs an llms.txt?" intro="Email the site address. I check what matters more first, like indexing and crawler access, and tell you whether the file is worth adding in your case." />
</main>
