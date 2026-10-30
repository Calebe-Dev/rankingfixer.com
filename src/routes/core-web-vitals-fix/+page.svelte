<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import EmailCta from '$lib/components/EmailCta.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { pageGraph, type Faq as FaqItem } from '$lib/schema';
	import { guides, industries, person, services, type Email } from '$lib/site';

	const path = services.coreWebVitals.path;
	const title = 'Core Web Vitals Optimization Service | Ranking Fixer';
	const description =
		'Core Web Vitals optimization service: LCP, INP and CLS fixed in the code for sites that fail the assessment or load slowly on mobile.';
	const email: Email = { subject: 'Core Web Vitals fix request', label: 'Get your Core Web Vitals fixed' };

	const crumbs = [{ name: services.coreWebVitals.name, path }];

	const faqs: FaqItem[] = [
		{
			question: 'Does page speed affect SEO?',
			answer:
				'Yes, but as one signal among many. Core Web Vitals are part of the page experience signals Google uses, and they rarely beat relevance on their own. The bigger effect is on people: slow pages lose visitors before they load, which costs leads and sales whatever the ranking.'
		},
		{
			question: 'Is a PageSpeed Insights score the same as passing Core Web Vitals?',
			answer:
				'No. The score at the bottom of PageSpeed Insights is a lab test on one simulated device. The Core Web Vitals assessment at the top uses field data from real Chrome users over 28 days. A site can score 90 in the lab and still fail the assessment, and the assessment is what Search Console reports.'
		},
		{
			question: 'How long does it take for Core Web Vitals to update after a fix?',
			answer:
				'Field data is a rolling 28-day window, so the assessment improves gradually and fully reflects a fix about four weeks after it goes live. Search Console validation can take a similar time. Lab tests show the improvement the same day.'
		},
		{
			question: 'Why does my site pass on desktop but fail on mobile?',
			answer:
				'Phones have slower processors and networks, so heavy JavaScript, large images and web fonts hurt much more on mobile. Since Google indexes the mobile version of a site, mobile Core Web Vitals are the ones to fix first.'
		},
		{
			question: 'What does "Core Web Vitals: not applicable" or "no data" mean?',
			answer:
				'It means the page or the site does not have enough visits from Chrome users for Google to report field data. In that case Google has no Core Web Vitals to judge, and speed work should be guided by lab tests and by conversion rates instead.'
		},
		{
			question: 'Do you need access to my hosting?',
			answer:
				'For most fixes I need access to the CMS, the theme or the code repository. Hosting or CDN access helps when the slow part is the server response time, caching or image delivery.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		service: {
			name: services.coreWebVitals.name,
			serviceType: 'Core Web Vitals and page speed optimization',
			description
		}
	});
</script>

<Seo {title} {description} {path} {jsonLd} />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Core Web Vitals Optimization Service</h1>
		<p>
			I fix Core Web Vitals at the source: the image, font, script or server response that makes a page
			slow, unresponsive or jumpy. The goal is the assessment in Search Console turning green with real
			visitors, not a better score in a single lab test.
		</p>
		<p>
			For sites that fail the Core Web Vitals assessment, load slowly on phones or lose visitors before
			the first screen appears.
		</p>
		<EmailCta {...email} />
	</header>

	<section aria-labelledby="metrics-title">
		<h2 id="metrics-title">The three Core Web Vitals and what usually breaks them</h2>
		<div class="table-wrap">
			<table>
				<caption>Google thresholds for a good experience, measured at the 75th percentile of visits</caption>
				<thead>
					<tr>
						<th scope="col">Metric</th>
						<th scope="col">What it measures</th>
						<th scope="col">Good</th>
						<th scope="col">Usual causes</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">LCP</th>
						<td>Time until the largest element of the first screen appears</td>
						<td>2.5 s or less</td>
						<td>Heavy hero image, slow server, render-blocking CSS and fonts</td>
					</tr>
					<tr>
						<th scope="row">INP</th>
						<td>Delay between a tap or click and the page responding</td>
						<td>200 ms or less</td>
						<td>Long JavaScript tasks, tag managers, chat widgets, hydration</td>
					</tr>
					<tr>
						<th scope="row">CLS</th>
						<td>How much the layout moves while the page loads</td>
						<td>0.1 or less</td>
						<td>Images without dimensions, late banners, font swaps, ads</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="band" aria-labelledby="fix-title">
		<h2 id="fix-title">What I fix</h2>
		<ul class="cards">
			<li>
				<span class="tag">LCP</span>
				<h3>Slow first screen</h3>
				<p>Image formats and sizes, preload and priority hints, server response time, caching and CDN, critical CSS and font loading.</p>
			</li>
			<li>
				<span class="tag">INP</span>
				<h3>Slow response to taps</h3>
				<p>Long tasks split or removed, third-party scripts delayed or dropped, heavy hydration and event handlers rewritten.</p>
			</li>
			<li>
				<span class="tag">CLS</span>
				<h3>Content that jumps</h3>
				<p>Reserved space for images, embeds and banners, font fallbacks that match, no content injected above the fold.</p>
			</li>
		</ul>
	</section>

	<section aria-labelledby="platforms-title">
		<h2 id="platforms-title">Where the slowness usually comes from</h2>
		<p>
			<strong>WordPress:</strong> page builders, stacked plugins doing the same job, unoptimized themes
			and cheap shared hosting. A caching plugin hides part of it; the fix is removing the weight.
		</p>
		<p>
			<strong>Shopify and other hosted stores:</strong> apps that each add their own scripts, theme code
			left from removed apps, oversized product images and tracking tags firing on every page.
		</p>
		<p>
			<strong>JavaScript frameworks:</strong> client-side rendering that delays the first screen, large
			bundles and hydration that blocks the main thread. Server-side rendering or prerendering, code
			splitting and fewer client-side scripts solve most of it.
		</p>
	</section>

	<section class="band" aria-labelledby="proof-title">
		<h2 id="proof-title">The performance work behind the service</h2>
		<ul class="checks">
			<li><strong>Legacy systems rebuilt</strong> on Angular and Svelte, with much faster loading as the goal from the start.</li>
			<li><strong>Images, caching and CDNs</strong> configured on Cloudflare and AWS for sites in production.</li>
			<li>
				<strong>This site as a test case:</strong> no JavaScript of its own, every page prerendered as HTML and CSS.
				Run it through PageSpeed Insights, or check <a href={person.homepage}>calebearaujo.com.br</a>, built the same way.
			</li>
		</ul>
	</section>

	<section aria-labelledby="process-title">
		<h2 id="process-title">How a Core Web Vitals fix works</h2>
		<ol class="steps">
			<li><strong>Field data first.</strong> Search Console and Chrome UX Report show which pages and which metric fail, on which device.</li>
			<li><strong>Trace the cause.</strong> Lab tests and performance traces find the exact element, script or request behind each metric.</li>
			<li><strong>Fix the templates.</strong> Changes go into the templates that generate many pages, so one fix covers the whole group.</li>
			<li><strong>Validate.</strong> Lab results the same day, then field data over the next 28 days and validation in Search Console.</li>
		</ol>
		<p>
			If the assessment shows a specific error, the guide to
			<a href={guides.cwvFailed.path}>fixing "Core Web Vitals assessment failed"</a> explains each message.
		</p>
	</section>

	<Faq {faqs} title="Core Web Vitals and page speed questions" />

	<Related
		links={[
			{ href: guides.cwvFailed.path, text: 'Core Web Vitals assessment failed: how to fix' },
			{ href: services.audit.path, text: 'Full technical SEO audit' },
			{ href: industries.ecommerce.path, text: 'Speed for online stores' },
			{ href: industries.agencies.path, text: 'White label Core Web Vitals for agencies' }
		]}
	/>

	<Contact {email} title="Send me the slow page" intro="Email the URL that fails Core Web Vitals, or the whole site. I reply with what is slowing it down and how I would fix it." />
</main>
