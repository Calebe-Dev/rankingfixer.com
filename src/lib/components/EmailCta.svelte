<script lang="ts">
	// CTA de conversão: abre um e-mail com assunto que identifica a página de origem.
	import { defaultEmail, emailLink, type Email } from '$lib/site';

	let { subject = defaultEmail.subject, label = defaultEmail.label }: Partial<Email> = $props();
</script>

<p class="cta"><a class="button" href={emailLink(subject)}>{label}</a></p>
