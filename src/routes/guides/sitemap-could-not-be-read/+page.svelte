<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import { pageGraph, type Faq as FaqItem, type Step } from '$lib/schema';
	import { guides, guidesPage, services, type Email } from '$lib/site';

	const path = guides.sitemapNotRead.path;
	const title = "Sitemap Could Not Be Read (Couldn't Fetch): How to Fix It | Ranking Fixer";
	const description =
		'Search Console says your sitemap could not be read? Find out if it is a real problem, then fix the usual causes: blocks, wrong URLs, servers, XML errors.';
	const email: Email = { subject: 'Sitemap could not be read', label: 'Have me check your sitemap' };

	const crumbs = [
		{ name: guidesPage.name, path: guidesPage.path },
		{ name: guides.sitemapNotRead.name, path }
	];

	// Status do relatório de sitemaps, com o texto da documentação do Google
	const statuses = [
		['Success', 'The sitemap was loaded and processed with no errors', 'All URLs are queued for crawling'],
		['Has errors', 'The sitemap was fetched but has one or more errors', 'URLs that could be parsed are still queued'],
		["Couldn't fetch", 'The sitemap could not be fetched for some reason', 'Nothing from this file is read until a fetch works']
	];

	const commands = `curl -I https://example.com/sitemap.xml
curl -s https://example.com/sitemap.xml | head -c 300
curl -s https://example.com/sitemap.xml | xmllint --noout -
curl -s https://example.com/robots.txt`;

	// Lista ordenada visível. Sem marcação HowTo: o Google aposentou o rich result em 2023.
	const steps: Step[] = [
		{ name: 'Test the sitemap URL live', text: 'Paste the sitemap address into URL Inspection and run Test live URL. If the fetch fails there, the problem is access, not the file.' },
		{ name: 'Check robots.txt', text: 'Google respects robots.txt when it fetches a sitemap. Remove any rule that blocks the sitemap path, and list the sitemap with a Sitemap: line.' },
		{ name: 'Submit the final address', text: 'Use the exact URL that answers 200, with the right protocol and host. A sitemap that redirects or moved with a plugin update should be submitted again at its new address.' },
		{ name: 'Let Googlebot through', text: 'Make sure firewall, CDN and security plugin rules do not challenge or block Google. A challenge page is HTML, not a sitemap.' },
		{ name: 'Make the file valid', text: 'UTF-8, nothing before the XML declaration, special characters escaped, absolute URLs, and no more than 50,000 URLs or 50 MB per file.' },
		{ name: 'Check for manual actions', text: 'Google does not read sitemaps for sites with an unresolved manual action. The Manual actions report tells you if there is one.' },
		{ name: 'Resubmit and watch', text: 'Submit the sitemap again in Search Console. Google retries failed fetches for a few days before it stops.' }
	];

	const faqs: FaqItem[] = [
		{
			question: 'What does "Sitemap could not be read" mean?',
			answer:
				'It means Google tried to fetch the sitemap and did not get a usable file. Google lists the causes as a robots.txt block, a manual action, a wrong sitemap URL, server errors, or low crawl demand for the sitemap. The status in the report shows as "Couldn\'t fetch".'
		},
		{
			question: 'How long does Google keep trying to fetch a sitemap?',
			answer:
				'According to Google, when a sitemap fetch fails it retries for a few days, then stops if the sitemap stays unavailable or has critical errors. After fixing the cause, submit the sitemap again so Google tries it once more.'
		},
		{
			question: 'Should I rename the sitemap file?',
			answer:
				'Only if the old address is wrong. Renaming a sitemap does not fix a robots.txt block, a firewall, a server error or an invalid file; those follow the new name. Find the cause first, then submit the address that actually works.'
		},
		{
			question: 'Does a sitemap error stop my pages from being indexed?',
			answer:
				'No. Google also finds pages through links. A broken sitemap slows down the discovery of new and deep pages, which matters most on large sites and on new sites that have few links yet.'
		},
		{
			question: 'How large can a sitemap be?',
			answer:
				'Google accepts up to 50,000 URLs or 50 MB uncompressed per sitemap. Larger sites split the URLs into several sitemaps and list them in a sitemap index file. An index file can list sitemaps, but not other index files.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		article: { headline: "Sitemap Could Not Be Read (Couldn't Fetch): How to Fix It" }
	});
</script>

<Seo {title} {description} {path} {jsonLd} ogType="article" />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Sitemap Could Not Be Read (Couldn't Fetch): How to Fix It</h1>
		<p>
			"Sitemap could not be read" means Google tried to fetch your sitemap and did not get a usable file, so
			the status shows "Couldn't fetch". Google's documented causes are a robots.txt block, a manual action,
			a wrong URL, server errors and low crawl demand. Test the sitemap URL live before changing anything.
		</p>
		<p>
			The error alone does not keep pages out of Google, but it slows down how fast new pages are found. When
			it comes with pages that are not indexed, <a href={services.indexing.path}>indexing fixes</a> look at
			both together.
		</p>
	</header>

	<section aria-labelledby="statuses-title">
		<h2 id="statuses-title">What the sitemap statuses in Search Console mean</h2>
		<div class="table-wrap">
			<table>
				<caption>Statuses in the Sitemaps report and what happens to the URLs</caption>
				<thead>
					<tr>
						<th scope="col">Status</th>
						<th scope="col">What Google says</th>
						<th scope="col">What happens to the URLs</th>
					</tr>
				</thead>
				<tbody>
					{#each statuses as [status, meaning, urls] (status)}
						<tr>
							<th scope="row">{status}</th>
							<td>{meaning}</td>
							<td>{urls}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section class="band" aria-labelledby="real-title">
		<h2 id="real-title">Is it a real problem?</h2>
		<ul class="checks">
			<li><strong>Test the sitemap URL in URL Inspection.</strong> If Test live URL fetches it successfully, Google can reach the file, and the cause is more likely the file itself or low crawl demand.</li>
			<li><strong>Check whether pages are indexed anyway.</strong> On a small site that Google crawls through links, a sitemap error costs little while you fix it.</li>
			<li><strong>Look at the site's age.</strong> Google names low crawl demand as one of the causes, and a new site with little content and few links is where that happens. Better content and links raise demand.</li>
		</ul>
	</section>

	<section aria-labelledby="why-title">
		<h2 id="why-title">Why Google cannot read a sitemap</h2>
		<ul class="cards">
			<li>
				<h3>Blocked by robots.txt</h3>
				<p>Google follows robots.txt when it fetches the sitemap. A rule that blocks the folder or the file blocks the fetch.</p>
			</li>
			<li>
				<h3>Wrong address</h3>
				<p>The submitted URL returns 404, redirects, or points to a file a plugin or platform change moved somewhere else.</p>
			</li>
			<li>
				<h3>Server or firewall</h3>
				<p>Server errors, timeouts or bot protection that answers Google with a challenge page instead of the file.</p>
			</li>
			<li>
				<h3>Not XML at all</h3>
				<p>A login page, a maintenance page or a consent wall served in place of the sitemap is HTML that Google cannot parse.</p>
			</li>
			<li>
				<h3>Invalid file</h3>
				<p>A blank line before the XML declaration, a file that is not UTF-8, unescaped ampersands or relative URLs.</p>
			</li>
			<li>
				<h3>Manual action or low demand</h3>
				<p>Google does not read sitemaps on sites with an unresolved manual action, and lists low crawl demand for the sitemap as a cause too.</p>
			</li>
		</ul>
	</section>

	<section class="band" aria-labelledby="test-title">
		<h2 id="test-title">How to test the sitemap yourself</h2>
		<p>Four commands in a terminal show most problems in a minute:</p>
		<pre><code>{commands}</code></pre>
		<ul class="checks">
			<li><strong>Status:</strong> the first command should return 200 directly, without a redirect.</li>
			<li><strong>Type:</strong> the headers should say XML. A <code>text/html</code> response usually means you got a different page.</li>
			<li><strong>Start of the file:</strong> it should begin with the XML declaration or the <code>urlset</code> or <code>sitemapindex</code> element, with nothing before it.</li>
			<li><strong>Validity:</strong> <code>xmllint</code> prints nothing when the file is well formed, and the line number of the error when it is not.</li>
			<li><strong>robots.txt:</strong> no Disallow rule should match the sitemap path.</li>
		</ul>
		<p>
			A request from your computer can succeed while Googlebot is blocked by bot protection, so the live test
			in URL Inspection is the one that counts.
		</p>
	</section>

	<section aria-labelledby="fix-title">
		<h2 id="fix-title">How to fix "Sitemap could not be read"</h2>
		<Steps {steps} />
	</section>

	<section class="band" aria-labelledby="platforms-title">
		<h2 id="platforms-title">Notes by platform</h2>
		<ul class="cards">
			<li>
				<h3>WordPress</h3>
				<p>WordPress has its own sitemap at <code>/wp-sitemap.xml</code>, and SEO plugins replace it with theirs. Submit the one that is actually active.</p>
			</li>
			<li>
				<h3>Shopify</h3>
				<p>The sitemap at <code>/sitemap.xml</code> is generated for you. While the store is behind a password page, Google cannot fetch it.</p>
			</li>
			<li>
				<h3>Wix and Squarespace</h3>
				<p>Both generate <code>/sitemap.xml</code> automatically. A site set to private or not yet published cannot be fetched.</p>
			</li>
			<li>
				<h3>Custom and static sites</h3>
				<p>Generate the sitemap from the same data that builds the pages, as this site does at build time, so it never lists pages that do not exist.</p>
			</li>
		</ul>
	</section>

	<Faq {faqs} title="Questions about sitemap errors" />

	<Related
		links={[
			{ href: services.indexing.path, text: 'Google indexing fixes' },
			{ href: guides.discoveredNotIndexed.path, text: 'Discovered - currently not indexed' },
			{ href: guides.notShowing.path, text: 'New website not showing on Google' },
			{ href: guides.disappeared.path, text: 'Website disappeared from Google' },
			{ href: services.migration.path, text: 'Sitemaps and redirects in a migration' }
		]}
	/>

	<Contact {email} title="Sitemap still not read?" intro="Email the sitemap address and a screenshot of the Sitemaps report. I reply with what is blocking it and how to fix it." />
</main>
