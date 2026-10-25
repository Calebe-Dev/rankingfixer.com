<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Related from '$lib/components/Related.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import { pageGraph, type Faq as FaqItem, type Step } from '$lib/schema';
	import { guides, guidesPage, services, type Email } from '$lib/site';

	const path = guides.cwvFailed.path;
	const title = 'Core Web Vitals Assessment Failed: How to Fix It | Ranking Fixer';
	const description =
		'What "Core Web Vitals assessment failed" means in PageSpeed Insights, and how to fix the LCP, INP and CLS issues Search Console reports.';
	const email: Email = { subject: 'Core Web Vitals assessment failed', label: 'Have me fix the failing metric' };

	const crumbs = [
		{ name: guidesPage.name, path: guidesPage.path },
		{ name: guides.cwvFailed.name, path }
	];

	const steps: Step[] = [
		{ name: 'Find the failing metric', text: 'In Search Console, open Core Web Vitals, choose mobile or desktop and note which metric fails: LCP, INP or CLS.' },
		{ name: 'Open the URL group', text: 'Search Console groups similar pages. The example URL represents a template, so the fix usually belongs in the template.' },
		{ name: 'Reproduce it', text: 'Run the example in PageSpeed Insights and in Chrome DevTools Performance to see the element, script or shift behind the metric.' },
		{ name: 'Fix the cause', text: 'Apply the fix for that metric, described below, on the template that generates the group.' },
		{ name: 'Check in the lab', text: 'Confirm the improvement in a lab test right after deploying.' },
		{ name: 'Validate in Search Console', text: 'Click Validate fix. Field data covers the last 28 days, so the assessment passes about four weeks after the fix.' }
	];

	const messages = [
		['LCP issue: longer than 2.5 s', 'Needs improvement', 'Hero image size and priority, server response time'],
		['LCP issue: longer than 4 s', 'Poor', 'Slow server or hosting, render-blocking CSS and fonts, client-side rendering'],
		['INP issue: longer than 200 ms', 'Needs improvement', 'Third-party scripts and long tasks on tap or click'],
		['INP issue: longer than 500 ms', 'Poor', 'Heavy JavaScript, page builders, hydration, chat and tag managers'],
		['CLS issue: more than 0.1', 'Needs improvement', 'Images or embeds without dimensions, web font swaps'],
		['CLS issue: more than 0.25', 'Poor', 'Banners, cookie bars or ads injected above the content']
	];

	const faqs: FaqItem[] = [
		{
			question: 'What does "Core Web Vitals assessment failed" mean?',
			answer:
				'It means that, for the real Chrome users who visited the page or the site over the last 28 days, at least one of the three metrics, LCP, INP or CLS, was not in the good range at the 75th percentile. It is based on field data, not on the lab test that produces the performance score.'
		},
		{
			question: 'Why does PageSpeed Insights show a high score but the assessment failed?',
			answer:
				'The score is a single lab test on a simulated phone, while the assessment uses real visits on real devices and networks. Real users bring slower phones, ads, logged-in states and interactions the lab test does not make, so a page can score well and still fail.'
		},
		{
			question: 'Does failing Core Web Vitals hurt rankings?',
			answer:
				'It can, but the effect is modest compared with relevance and content. Core Web Vitals are part of page experience, which matters most when competing pages are otherwise similar. The effect on visitors is larger: slow and jumpy pages lose leads and sales.'
		},
		{
			question: 'What replaced FID in Core Web Vitals?',
			answer:
				'Interaction to Next Paint, INP, replaced First Input Delay in March 2024. INP measures the delay of every interaction during the visit, not only the first one, so sites with heavy JavaScript that passed FID often fail INP.'
		},
		{
			question: 'Can a WordPress plugin fix Core Web Vitals?',
			answer:
				'Caching and optimization plugins help with LCP, but they cannot remove the weight of a page builder, a heavy theme or a dozen third-party scripts, which are the usual causes of poor INP. On WordPress, lasting fixes come from removing what loads, not only from compressing it.'
		}
	];

	const jsonLd = pageGraph({
		path,
		title,
		description,
		crumbs,
		faqs,
		article: { headline: 'Core Web Vitals Assessment Failed: How to Fix It' },
		howTo: { name: 'How to fix a failed Core Web Vitals assessment', steps }
	});
</script>

<Seo {title} {description} {path} {jsonLd} ogType="article" />

<main id="content">
	<header class="hero">
		<Breadcrumbs {crumbs} />
		<h1>Core Web Vitals Assessment Failed: How to Fix It</h1>
		<p>
			"Core Web Vitals assessment failed" means that real visitors to the page had a slow or unstable
			experience in at least one of three metrics: Largest Contentful Paint (LCP), Interaction to Next
			Paint (INP) or Cumulative Layout Shift (CLS). To fix it, find which metric fails, trace it to the
			element or script that causes it and fix the template.
		</p>
		<p>The message is based on 28 days of field data, so the fix shows up in the assessment weeks later.</p>
	</header>

	<section aria-labelledby="messages-title">
		<h2 id="messages-title">Search Console Core Web Vitals messages and what to check first</h2>
		<div class="table-wrap">
			<table>
				<caption>Issue messages in the Core Web Vitals report, mobile and desktop</caption>
				<thead>
					<tr>
						<th scope="col">Message</th>
						<th scope="col">Status</th>
						<th scope="col">Check first</th>
					</tr>
				</thead>
				<tbody>
					{#each messages as [message, status, check] (message)}
						<tr>
							<th scope="row">{message}</th>
							<td>{status}</td>
							<td>{check}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section class="band" aria-labelledby="steps-title">
		<h2 id="steps-title">How to fix a failed Core Web Vitals assessment</h2>
		<Steps {steps} />
	</section>

	<section aria-labelledby="lcp-title">
		<h2 id="lcp-title">How to fix an LCP issue longer than 2.5 s or 4 s</h2>
		<ul class="checks">
			<li><strong>Find the LCP element.</strong> PageSpeed Insights names it; usually the hero image, a banner or the main heading.</li>
			<li><strong>Make the image light.</strong> Serve AVIF or WebP at the displayed size, with responsive sizes for mobile.</li>
			<li><strong>Load it first.</strong> Do not lazy load the LCP image; give it <code>fetchpriority="high"</code> or preload it.</li>
			<li><strong>Answer faster.</strong> Cache pages at the CDN and fix slow server responses above 800 ms.</li>
			<li><strong>Unblock rendering.</strong> Inline critical CSS, limit web fonts and avoid rendering the page only in the browser.</li>
		</ul>
	</section>

	<section class="band" aria-labelledby="inp-title">
		<h2 id="inp-title">How to fix an INP issue longer than 200 ms</h2>
		<ul class="checks">
			<li><strong>Find the slow interaction.</strong> Record a tap on menus, filters and forms in DevTools Performance.</li>
			<li><strong>Cut third-party scripts.</strong> Chat widgets, tag managers, heatmaps and pop-ups are the usual offenders.</li>
			<li><strong>Break up long tasks.</strong> Split JavaScript that runs for more than 50 ms and defer what is not needed now.</li>
			<li><strong>Reduce page builder weight.</strong> Heavy builders and sliders add work to every interaction.</li>
		</ul>
	</section>

	<section aria-labelledby="cls-title">
		<h2 id="cls-title">How to fix a CLS issue more than 0.1</h2>
		<ul class="checks">
			<li><strong>Set dimensions.</strong> Give every image, video and iframe a width and height or an aspect ratio.</li>
			<li><strong>Reserve space</strong> for ads, embeds and cookie banners before they load.</li>
			<li><strong>Match fallback fonts</strong> to the web font, so text does not jump when it swaps.</li>
			<li><strong>Never insert content above</strong> what the visitor is reading, except in response to a tap.</li>
		</ul>
	</section>

	<section class="band" aria-labelledby="nodata-title">
		<h2 id="nodata-title">"No data" or "not applicable" in Core Web Vitals</h2>
		<p>
			When the report has no data, the page or site does not get enough Chrome visits for Google to
			measure. There is no assessment to fail. Use lab tests to keep the site fast, and focus on
			indexing and content first. If the site has traffic and still shows no data, check that the
			pages are not behind a login or redirect.
		</p>
		<p>
			When the fix needs code changes, <a href={services.coreWebVitals.path}>Core Web Vitals optimization</a>
			is a service I do.
		</p>
	</section>

	<Faq {faqs} title="Core Web Vitals assessment questions" />

	<Related
		links={[
			{ href: services.coreWebVitals.path, text: 'Core Web Vitals optimization service' },
			{ href: services.audit.path, text: 'Technical SEO audit' },
			{ href: guides.notShowing.path, text: 'Website not showing up on Google' }
		]}
	/>

	<Contact {email} title="Assessment still failing?" intro="Email the page that fails and the metric Search Console reports. I reply with what is causing it and how I would fix it." />
</main>
