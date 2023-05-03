<script lang="ts">
	import JumbledWords from './JumbledWords.svelte';
	import EmptyPhrase from './EmptyPhrase.svelte';
	import JumbledPhrase from './JumbledPhrase.svelte';
	import Solve from './Solve.svelte';
	import { onMount } from 'svelte';

	let getWords: Function;
	let setupData: Function;
	let getPhrases: Function;

	onMount(async () => {
		const worker = new ComlinkWorker<typeof import('./worker')>(
			new URL('/worker', import.meta.url)
		);
		try {
			const dictionary_raw_res = await fetch('dictionary_medium_mod.csv');
			const dictionary_raw = await (await dictionary_raw_res.blob()).text();
			worker.setDictionary(dictionary_raw);
		} catch (error) {
			console.error(error);
		}
		getWords = worker.getWords;
		setupData = worker.setupData;
		getPhrases = worker.getPhrases;
	});
</script>

<div class="grid justify-center">
	<main class="my-2" style="width: min(95vw, 40ch)">
		<p>Jumbled words</p>
		<JumbledWords {getWords} />
		<JumbledPhrase />
		<EmptyPhrase />
		<Solve {setupData} {getPhrases} />
	</main>
</div>
