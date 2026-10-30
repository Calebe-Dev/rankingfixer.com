import type { Handle } from '@sveltejs/kit';
import { pageLang } from '$lib/site';

// <html lang> por página (en-US por padrão; en-GB, en-CA e en-NZ nas páginas por país).
// Roda também no prerender, então o HTML estático já sai com o idioma certo.
export const handle: Handle = ({ event, resolve }) =>
	resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', pageLang(event.url.pathname)) });
