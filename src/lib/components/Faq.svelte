<script lang="ts">
	// FAQ visível: o mesmo array alimenta o FAQPage do JSON-LD (schema = conteúdo da página).
	import type { Faq } from '$lib/schema';

	let { faqs, title = 'Frequently asked questions' }: { faqs: Faq[]; title?: string } = $props();
</script>

<section id="faq" class="faq" aria-labelledby="faq-title">
	<h2 id="faq-title">{title}</h2>
	{#each faqs as faq (faq.question)}
		<h3>{faq.question}</h3>
		<p>{faq.answer}</p>
	{/each}
</section>
