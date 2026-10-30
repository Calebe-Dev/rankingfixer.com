<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import { pageGraph, type Faq as FaqItem, type Step } from '$lib/schema';
	import { guides, guidesPage, services, type Email } from '$lib/site';

	const path = guides.disappeared.path;
	const title = 'Website Disappeared from Google? Causes and Fixes | Ranking Fixer';
	const description =
		'Your site was on Google and now it is gone? Check the causes in order: noindex, robots.txt, removals, manual actions, hacks and server problems.';
	const email: Email = { subject: 'My website disappeared from Google', label: 'Have me find the cause' };

	const crumbs = [
		{ name: guidesPage.name, path: guidesPage.path },
		{ name: guides.disappeared.name, path }
	];

	// Triagem na ordem que mais economiza tempo
	const causes = [
		['A noindex published by mistake', 'Page source and response headers of key pages; URL Inspection', 'Pages return as Google recrawls them'],
		['robots.txt blocking the site', 'yourdomain.com/robots.txt and the robots.txt report in Search Console', 'Pages return as Google recrawls them'],
		['A URL removal request', 'Removals in Search Console', 'Cancel the request; otherwise a temporary removal lasts about six months'],
		['A manual action', 'Manual actions in Search Console', 'After you fix the issue and Google approves a review'],
		['A hacked site', 'Security issues in Search Console; spam pages under your domain', 'After cleanup and a review of the security issue'],
		['Server, DNS or domain failure', 'Crawl stats host status, the domain registrar and the SSL certificate', 'Once the site answers normally again and Google recrawls it'],
		['A migration without redirects', 'Old URLs returning 404; the Page indexing report', 'As redirects go live and Google recrawls the old URLs']
	];

	// Lista ordenada visível. Sem marcação HowTo: o Google aposentou o rich result em 2023.
	const steps: Step[] = [
		{ name: 'Find the day', text: 'In the Performance report, find the day clicks dropped, then list what changed on the site around that day: deploys, theme or plugin updates, DNS, hosting, domain renewal.' },
		{ name: 'Fix the cause', text: 'Remove the noindex or robots.txt rule, cancel the removal, restore the server or domain, or clean the hacked pages and close the hole that let them in.' },
		{ name: 'Check the fix as Google sees it', text: 'Run Test live URL in URL Inspection on the home page and on the pages that brought the most traffic.' },
		{ name: 'Request indexing for the key pages', text: 'Request indexing for the home page and the most important URLs. The rest comes back as Google recrawls the site.' },
		{ name: 'Resubmit the sitemap', text: 'Submit the sitemap again in Search Console so Google has the full list of pages to recrawl.' },
		{ name: 'Request a review when Google asks for one', text: 'For manual actions and security issues, request a review after the fix. Explain the issue, the steps you took and the result.' },
		{ name: 'Track the recovery', text: 'Follow clicks and indexed pages over the next weeks, and keep the change that caused the drop out of future deploys.' }
	];

	const faqs: FaqItem[] = [
		{
			question: 'Why did my website disappear from Google overnight?',
			answer:
				'Overnight drops usually follow a change on the site or its infrastructure: a noindex or robots.txt rule published by mistake, a removal request, or a server, DNS or domain failure. Manual actions and hacked pages can also remove pages quickly. Algorithm updates more often move rankings than remove a whole site.'
		},
		{
			question: 'How do I know if Google penalized my site?',
			answer:
				'Open the Manual actions report in Search Console. If it shows no issues, there is no manual penalty. A drop after a core update is not a penalty and does not appear in that report.'
		},
		{
			question: 'How long does it take for the site to come back after the fix?',
			answer:
				'It depends on the cause and on how often Google crawls the site. Technical blocks clear as Google recrawls the pages, usually starting with the home page and the most linked pages. Google says reviews of manual actions take several days or weeks.'
		},
		{
			question: 'Does the Removals tool delete a site from the index?',
			answer:
				'No. A temporary removal hides URLs from Google Search for about six months, but Google can keep crawling and indexing them. Cancel the request in the Removals report and the pages can show again.'
		},
		{
			question: 'What should I do if my site was hacked?',
			answer:
				'Clean the injected pages and files, close the hole the attacker used, such as an outdated plugin or a leaked password, and check the Security issues report in Search Console. Once the site is clean, request a review there.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		article: { headline: 'Website Disappeared from Google? Causes and Fixes' }
	});
</script>

<Seo {title} {description} {path} {jsonLd} ogType="article" />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Website Disappeared from Google? Causes and Fixes</h1>
		<p>
			When a website that used to rank disappears from Google, the cause is usually a change on your side: a
			noindex or robots.txt rule published by mistake, a URL removal request, a manual action, a hacked site,
			or a server, DNS or domain problem. Check them in that order; most take minutes in Search Console.
		</p>
		<p>
			If the drop started the day a new site went live, read about recovery after an
			<a href={services.migration.path}>SEO website migration</a>. If the site never showed up at all, the
			guide to <a href={guides.notShowing.path}>a website not showing on Google</a> fits better.
		</p>
	</header>

	<section aria-labelledby="confirm-title">
		<h2 id="confirm-title">First, confirm the site really disappeared</h2>
		<ul class="checks">
			<li><strong>Search for your brand name,</strong> not only <code>site:yourdomain.com</code>. Google says the site: operator does not necessarily return every indexed URL, so a short list is not proof.</li>
			<li><strong>Open Performance in Search Console</strong> and look at clicks by date. A cliff on one day points to a technical change; a slow slide over weeks points to rankings.</li>
			<li><strong>Inspect the home page and a top page</strong> in URL Inspection. "URL is on Google" means the page is indexed, and the problem is ranking, not removal.</li>
		</ul>
	</section>

	<section class="band" aria-labelledby="order-title">
		<h2 id="order-title">Check these causes in this order</h2>
		<div class="table-wrap">
			<table>
				<caption>Why an indexed website disappears from Google, where to look and when it comes back</caption>
				<thead>
					<tr>
						<th scope="col">Cause</th>
						<th scope="col">Where to look</th>
						<th scope="col">When it comes back</th>
					</tr>
				</thead>
				<tbody>
					{#each causes as [cause, where, back] (cause)}
						<tr>
							<th scope="row">{cause}</th>
							<td>{where}</td>
							<td>{back}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section aria-labelledby="causes-title">
		<h2 id="causes-title">How to check each cause</h2>
		<ul class="cards">
			<li>
				<h3>A noindex went live</h3>
				<p>A staging copy pushed to production, a theme or plugin update, the WordPress option "Discourage search engines from indexing this site", or an <code>X-Robots-Tag</code> header added at the server or CDN. Check the page source and the response headers.</p>
			</li>
			<li>
				<h3>robots.txt blocks the site</h3>
				<p>Open <code>/robots.txt</code> on the live domain and look for <code>Disallow: /</code> under <code>User-agent: *</code> or Googlebot. Staging rules often survive a launch.</p>
			</li>
			<li>
				<h3>Someone used the Removals tool</h3>
				<p>A temporary removal hides URLs from Google Search for about six months without deleting them from the index. Check the Removals report and cancel requests made by mistake.</p>
			</li>
			<li>
				<h3>A manual action</h3>
				<p>When a Google reviewer finds a spam policy violation, some or all of the site can be ranked lower or left out. The Manual actions report names the issue and the affected pages.</p>
			</li>
			<li>
				<h3>The site was hacked</h3>
				<p>Attackers inject spam pages, like the Japanese keyword hack, which creates pages of Japanese text in randomly named folders. The Security issues report lists what Google found.</p>
			</li>
			<li>
				<h3>The server, DNS or domain failed</h3>
				<p>An expired domain, a DNS change, a broken SSL certificate, server errors or a firewall that started blocking Googlebot. Crawl stats shows DNS and server connectivity problems.</p>
			</li>
		</ul>
	</section>

	<section class="band" aria-labelledby="migration-title">
		<h2 id="migration-title">A redesign or migration can also wipe out traffic</h2>
		<p>
			When traffic drops the day a new site launches, the usual causes are old URLs that return 404 instead
			of redirecting, noindex tags left from staging, a new domain without redirects, or a sitemap that still
			lists the old addresses. The pages are not penalized; Google is following what the new site tells it.
			Mapping and fixing the redirects is the core of an <a href={services.migration.path}>SEO website
			migration</a>, and the sitemap side is covered in <a href={guides.sitemapNotRead.path}>"Sitemap could
			not be read"</a>.
		</p>
	</section>

	<section aria-labelledby="fix-title">
		<h2 id="fix-title">How to get the website back on Google</h2>
		<Steps {steps} />
	</section>

	<section class="band" aria-labelledby="ranking-title">
		<h2 id="ranking-title">If none of these applies, it may not be technical</h2>
		<p>
			When the pages are still indexed and nothing above applies, Google may be ranking them lower, for
			example after a core update that reassesses content across the web. That calls for a closer look at
			the content and at what ranks now, not a technical fix. A <a href={services.audit.path}>technical SEO
			audit</a> separates the two, so you do not spend weeks fixing the wrong problem.
		</p>
	</section>

	<Faq {faqs} title="Questions about a website missing from Google" />

	<Related
		links={[
			{ href: services.migration.path, text: 'Traffic lost after a redesign or migration' },
			{ href: guides.notShowing.path, text: 'New website not showing on Google' },
			{ href: services.indexing.path, text: 'Pages dropped from the index' },
			{ href: guides.sitemapNotRead.path, text: 'Sitemap could not be read' },
			{ href: services.audit.path, text: 'Technical SEO audit' }
		]}
	/>

	<Contact {email} title="Site gone from Google?" intro="Email the site and the day traffic dropped. I check what Google sees and reply with the cause and the fastest way back." />
</main>
