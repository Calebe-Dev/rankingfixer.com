<script lang="ts">
	import { page } from '$app/state';
	import EmailCta from '$lib/components/EmailCta.svelte';
	import { contact, defaultEmail, emailLink, modifiedDate, pageLang, person, type Email } from '$lib/site';

	let {
		title = 'Send me the site that is not ranking',
		intro = 'Email the URL and a line about what is wrong. I look at the site before replying, so the first answer already says what I would check and fix.',
		email = defaultEmail
	}: { title?: string; intro?: string; email?: Email } = $props();

	// mesma data do dateModified do schema e do lastmod do sitemap, no formato do idioma da página
	const updated = $derived(modifiedDate(page.url.pathname));
	const updatedLabel = $derived(
		new Date(`${updated}T12:00:00`).toLocaleDateString(pageLang(page.url.pathname), {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		})
	);
</script>

<section id="contact" class="contact" aria-labelledby="contact-title">
	<h2 id="contact-title">{title}</h2>
	<p>{intro}</p>
	<EmailCta {...email} />
	<address>
		<ul>
			<li>Email: <a href={emailLink(email.subject)}>{contact.email}</a></li>
			<li>WhatsApp: <a href={contact.whatsapp}>{contact.whatsappDisplay}</a></li>
			<li>Who replies: {person.name}, the developer who does the work</li>
		</ul>
	</address>
</section>

<p class="updated">Page updated on <time datetime={updated}>{updatedLabel}</time>.</p>
