// Grava no build o commit publicado (/version.txt), para conferir qual versão está no ar antes de
// avisar os buscadores (IndexNow). No Workers Builds a Cloudflare define WORKERS_CI_COMMIT_SHA;
// localmente fica "local".
import fs from 'node:fs';

const version = process.env.WORKERS_CI_COMMIT_SHA || 'local';
fs.writeFileSync(new URL('../.svelte-kit/cloudflare/version.txt', import.meta.url), `${version}\n`);
console.log(`version.txt: ${version}`);
