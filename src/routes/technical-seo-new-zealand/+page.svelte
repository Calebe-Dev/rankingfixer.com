<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import EmailCta from '$lib/components/EmailCta.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { pageGraph, type Faq as FaqItem } from '$lib/schema';
	import { industries, markets, services, type Email } from '$lib/site';

	const path = markets.newZealand.path;
	const title = 'Technical SEO Consultant in New Zealand | Ranking Fixer';
	const description =
		'Remote technical SEO consultant for New Zealand businesses in Auckland and Christchurch: audits, NZ and Australia sites, site speed and migrations.';
	const email: Email = { subject: 'Technical SEO for a New Zealand website', label: 'Send your NZ site' };

	const crumbs = [{ name: markets.newZealand.name, path }];

	const faqs: FaqItem[] = [
		{
			question: 'Do you work with New Zealand businesses?',
			answer:
				'Yes, remotely. I work from Brazil, 15 to 16 hours behind New Zealand, so work is done by email and shared documents: you send the brief in your afternoon and find progress in your morning. Calls are possible in your early morning, which is my late afternoon.'
		},
		{
			question: 'How do I stop my Australian pages ranking in New Zealand?',
			answer:
				'Give each country its own URLs, link them with hreflang tags for en-NZ and en-AU, and make the pages genuinely different: prices in each currency with GST, local shipping and contact details. When the two versions are nearly identical, Google may ignore hreflang and show one country the other version.'
		},
		{
			question: 'Should my site use .co.nz or .com?',
			answer:
				'A .co.nz domain tells Google the site targets New Zealand and is the clearest choice for a business that only sells locally. A .com suits businesses that also sell in Australia or elsewhere, with a folder per country and hreflang. Moving between them later is a migration, so choose before building links.'
		},
		{
			question: 'Does my website need New Zealand English spelling?',
			answer:
				'For visitors, yes: New Zealand readers expect spellings like optimisation and colour, and titles that match how they search. For Google it matters less than country targeting, but consistent local spelling helps the page read as written for New Zealand.'
		},
		{
			question: 'Can fixes go live outside New Zealand business hours?',
			answer:
				'Yes, and the time difference helps. My working morning is the middle of the night in New Zealand, so deployments, redirects and migrations can go live when your site has the fewest visitors.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		service: {
			name: markets.newZealand.name,
			serviceType: 'Technical SEO consulting',
			description,
			audience: 'New Zealand businesses and agencies',
			country: markets.newZealand.country
		}
	});
</script>

<Seo {title} {description} {path} {jsonLd} />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Technical SEO Consultant in New Zealand</h1>
		<p>
			I audit and fix the technical problems that hold New Zealand websites back on Google: pages that are
			not indexed, slow mobile pages, broken migrations and sites that serve New Zealand and Australia
			with the same pages.
		</p>
		<p>
			Ranking Fixer is remote, with no office in New Zealand. The time difference works in your favour:
			changes can go live while New Zealand sleeps.
		</p>
		<EmailCta {...email} />
	</header>

	<section aria-labelledby="problems-title">
		<h2 id="problems-title">Technical SEO problems common on New Zealand websites</h2>
		<ul class="cards">
			<li>
				<span class="tag">NZ and Australia</span>
				<h3>One site, two countries</h3>
				<p>Australian pages ranking for New Zealand searches when en-NZ and en-AU versions are missing or nearly identical.</p>
			</li>
			<li>
				<span class="tag">Speed</span>
				<h3>Servers far from visitors</h3>
				<p>Sites hosted in the United States or Europe without a CDN load slowly in New Zealand, and Core Web Vitals suffer.</p>
			</li>
			<li>
				<span class="tag">Domains</span>
				<h3>.co.nz, .nz and .com</h3>
				<p>Mixed domains and redirects after a rebrand split signals between versions of the same site.</p>
			</li>
			<li>
				<span class="tag">Small sites</span>
				<h3>Pages discovered but not indexed</h3>
				<p>New sites on website builders wait weeks for Google, often with pages "discovered - currently not indexed".</p>
			</li>
		</ul>
	</section>

	<section class="band" aria-labelledby="au-title">
		<h2 id="au-title">Selling in New Zealand and Australia: site setups compared</h2>
		<div class="table-wrap">
			<table>
				<caption>Ways to serve both countries and how Google treats each one</caption>
				<thead>
					<tr>
						<th scope="col">Setup</th>
						<th scope="col">Example</th>
						<th scope="col">SEO effect</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">Folder per country</th>
						<td><code>example.com/nz/</code> and <code>example.com/au/</code></td>
						<td>One domain and shared authority; needs hreflang and real local differences</td>
					</tr>
					<tr>
						<th scope="row">Country domains</th>
						<td><code>example.co.nz</code> and <code>example.com.au</code></td>
						<td>Strongest country signal; two sites to build links and maintain</td>
					</tr>
					<tr>
						<th scope="row">One site for both</th>
						<td>Same pages, prices switched by location</td>
						<td>Google sees one version; one country usually gets the wrong prices and pages</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section aria-labelledby="cities-title">
		<h2 id="cities-title">Technical SEO for Auckland, Wellington and Christchurch businesses</h2>
		<p>
			The work happens in the code and in Google Search Console, so the city does not change the process.
			What changes is how we work across the time difference:
		</p>
		<ol class="steps">
			<li><strong>Brief in your afternoon.</strong> Email the site and the problem; it arrives at the start of my working day.</li>
			<li><strong>Progress by your morning.</strong> Findings, fixes or questions are waiting when your day starts.</li>
			<li><strong>Calls in your early morning.</strong> Your 8 or 9 am is my late afternoon, good for a review call.</li>
			<li><strong>Launches at night.</strong> Redirects and deployments go live during New Zealand's quietest hours.</li>
		</ol>
		<p>
			For online stores, law firms or agencies, see the
			<a href={industries.ecommerce.path}>ecommerce</a>, <a href={industries.lawFirms.path}>law firm</a> and
			<a href={industries.agencies.path}>white label</a> pages.
		</p>
		<EmailCta {...email} />
	</section>

	<Faq {faqs} title="Questions from New Zealand businesses" />

	<Related
		links={[
			{ href: services.audit.path, text: 'Technical SEO audit' },
			{ href: services.coreWebVitals.path, text: 'Speed up a slow NZ website' },
			{ href: services.indexing.path, text: 'Pages not indexed by Google' },
			{ href: markets.canada.path, text: 'Technical SEO in Canada' }
		]}
	/>

	<Contact {email} title="Send your New Zealand website" intro="Email the site and what is wrong. I reply during my working day, which is night in New Zealand." />
</main>
