<script lang="ts">
	import EmailCta from '$lib/components/EmailCta.svelte';
	import { UPDATED, contact, defaultEmail, emailLink, person, type Email } from '$lib/site';

	let {
		title = 'Send me the site that is not ranking',
		intro = 'Email the URL and a line about what is wrong. I look at the site before replying, so the first answer already says what I would check and fix.',
		email = defaultEmail
	}: { title?: string; intro?: string; email?: Email } = $props();

	const updatedLabel = new Date(`${UPDATED}T12:00:00`).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
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

<p class="updated">Page updated on <time datetime={UPDATED}>{updatedLabel}</time>.</p>
