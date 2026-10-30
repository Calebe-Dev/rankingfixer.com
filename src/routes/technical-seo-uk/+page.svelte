<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import EmailCta from '$lib/components/EmailCta.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { pageGraph, type Faq as FaqItem } from '$lib/schema';
	import { industries, markets, services, type Email } from '$lib/site';

	// Página escrita em inglês britânico (en-GB): grafia, termos e exemplos do Reino Unido
	const path = markets.uk.path;
	const title = 'Technical SEO Consultant in the UK | Ranking Fixer';
	const description =
		'Remote technical SEO consultant for UK businesses in London, Manchester and beyond: SEO audits, cookie banners, UK and Ireland sites and fixes.';
	const email: Email = { subject: 'Technical SEO for a UK website', label: 'Send your UK site' };

	const crumbs = [{ name: markets.uk.name, path }];

	const faqs: FaqItem[] = [
		{
			question: 'Do you work with UK businesses?',
			answer:
				'Yes, remotely. I work from Brazil, three hours behind the UK in winter and four in summer, so my working day starts around UK lunchtime and covers the whole British afternoon. Audits, fixes and calls happen online; there is no UK office.'
		},
		{
			question: 'Are you a freelancer or an agency?',
			answer:
				'A one-person consultancy, which in practice works like a freelance technical SEO: the person who audits your site is the person who fixes it, with no account managers in between. UK agencies can also hire me under their own brand.'
		},
		{
			question: 'Do cookie consent banners affect SEO and Core Web Vitals?',
			answer:
				'They can. Under UK GDPR and PECR most sites need consent for non-essential cookies, and the banner and its consent platform load on every page. A banner that pushes content down causes layout shift, a heavy consent script delays the largest element, and blocking scripts slow every tap. The fix is loading the platform efficiently and reserving space for the banner, not removing consent.'
		},
		{
			question: 'Should a UK business use .co.uk or .com?',
			answer:
				'A .co.uk or .uk domain tells Google the site targets the United Kingdom, which suits a business selling only in the UK. A .com suits businesses that also sell in Ireland, Europe or the United States, with a folder per country and hreflang. Switching later is a migration, so decide before building links.'
		},
		{
			question: "Do solicitors' websites have specific technical requirements?",
			answer:
				'Firms regulated by the Solicitors Regulation Authority must display the SRA digital badge in a prominent place, and firms offering services such as conveyancing, probate or employment tribunal claims must publish price and service information. Check the current SRA guidance for the details. On the technical side, the badge is a third-party script that should not block the page, and the price pages should be indexed and easy to reach.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		service: {
			name: markets.uk.name,
			serviceType: 'Technical SEO consulting',
			description,
			audience: 'UK businesses and agencies',
			country: markets.uk.country
		}
	});
</script>

<Seo {title} {description} {path} {jsonLd} />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Technical SEO Consultant in the UK</h1>
		<p>
			I audit and fix the technical problems that hold UK websites back on Google: pages that are not
			indexed, cookie banners that slow every page, UK and Irish versions competing with each other, and
			migrations that lose traffic. The fixes go into the code, not into a report that waits in a queue.
		</p>
		<p>
			Ranking Fixer is remote, with no office in the UK. My working day starts around UK lunchtime, so the
			whole British afternoon is shared.
		</p>
		<EmailCta {...email} />
	</header>

	<section aria-labelledby="problems-title">
		<h2 id="problems-title">Technical SEO problems common on UK websites</h2>
		<ul class="cards">
			<li>
				<span class="tag">Consent</span>
				<h3>Cookie banners that slow the site</h3>
				<p>Consent platforms required under UK GDPR and PECR, loaded so they shift the layout and delay the first screen.</p>
			</li>
			<li>
				<span class="tag">UK, Ireland, US</span>
				<h3>The wrong version ranking</h3>
				<p>Separate UK and EU stores after Brexit, or a US site serving the UK, without hreflang for en-GB, en-IE and en-US.</p>
			</li>
			<li>
				<span class="tag">Prices</span>
				<h3>VAT and pounds in product data</h3>
				<p>Structured data prices that do not match the price shown with VAT, or in the wrong currency, which blocks rich results.</p>
			</li>
			<li>
				<span class="tag">Domains</span>
				<h3>.co.uk, .uk and .com</h3>
				<p>Rebrands and domain moves that split signals between versions of the same site.</p>
			</li>
			<li>
				<span class="tag">Solicitors</span>
				<h3>SRA badge and price pages</h3>
				<p>A required third-party badge loaded so it blocks rendering, and price information pages buried or not indexed.</p>
			</li>
		</ul>
	</section>

	<section class="band" aria-labelledby="setups-title">
		<h2 id="setups-title">Selling in the UK, Ireland and beyond: site set-ups compared</h2>
		<div class="table-wrap">
			<table>
				<caption>Ways to serve UK visitors alongside other countries, and how Google treats each one</caption>
				<thead>
					<tr>
						<th scope="col">Set-up</th>
						<th scope="col">Example</th>
						<th scope="col">SEO effect</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">UK only</th>
						<td><code>example.co.uk</code></td>
						<td>Clearest UK signal; nothing to configure between countries</td>
					</tr>
					<tr>
						<th scope="row">Folder per country</th>
						<td><code>example.com/uk/</code> and <code>example.com/ie/</code></td>
						<td>One domain and shared authority; needs hreflang and real local differences in price and delivery</td>
					</tr>
					<tr>
						<th scope="row">Country domains</th>
						<td><code>example.co.uk</code> and <code>example.ie</code></td>
						<td>Strong country signals; two sites to maintain and link</td>
					</tr>
					<tr>
						<th scope="row">Redirect by location</th>
						<td>Visitors sent to a version based on their IP address</td>
						<td>Googlebot crawls mostly from the United States, so the UK version can stay invisible</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section aria-labelledby="audit-title">
		<h2 id="audit-title">SEO audits for London, Manchester and the rest of the UK</h2>
		<p>
			The technical SEO audit is the same wherever the business is, because it happens in the code and in
			Google Search Console. For UK sites it also checks consent banner performance, UK and Ireland
			targeting, VAT-inclusive product data and, for solicitors, the SRA requirements on the site.
		</p>
		<ul class="checks">
			<li><strong>London and the South East:</strong> the most competitive searches in the country, where speed and indexing decide close contests.</li>
			<li><strong>Manchester, Leeds, Birmingham and Bristol:</strong> the same audit and the same fixes, without travel costs in the quote.</li>
			<li><strong>Anywhere in the UK:</strong> a remote process, by email and video call in the British afternoon.</li>
		</ul>
		<p>
			Looking for a freelance technical SEO rather than an agency? That is how Ranking Fixer works: one
			developer, from the <a href={services.audit.path}>technical SEO audit</a> to the fix.
		</p>
		<EmailCta {...email} />
	</section>

	<section class="band" aria-labelledby="sectors-title">
		<h2 id="sectors-title">Solicitors, online shops and UK agencies</h2>
		<ul class="cards">
			<li>
				<h3><a href={industries.lawFirms.path}>SEO for solicitors and law firms</a></h3>
				<p>Practice area and office pages, SRA price information pages, and markup that follows the rules on the page.</p>
			</li>
			<li>
				<h3><a href={industries.ecommerce.path}>Ecommerce and Shopify SEO in the UK</a></h3>
				<p>Filters, variants, VAT-inclusive prices in product data, and UK and EU stores that compete.</p>
			</li>
			<li>
				<h3><a href={industries.agencies.path}>White label technical SEO for UK agencies</a></h3>
				<p>Audits and code-level fixes delivered under your agency's brand, in the British afternoon.</p>
			</li>
		</ul>
	</section>

	<Faq {faqs} title="Questions from UK businesses" />

	<Related
		links={[
			{ href: services.coreWebVitals.path, text: 'Core Web Vitals optimisation' },
			{ href: services.migration.path, text: 'Domain moves and migrations' },
			{ href: services.indexing.path, text: 'Pages not indexed by Google' },
			{ href: markets.canada.path, text: 'Technical SEO in Canada' }
		]}
	/>

	<Contact {email} title="Send your UK website" intro="Email the site and what is wrong. I reply during my working day, which is the British afternoon." />
</main>
