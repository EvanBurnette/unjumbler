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
			const dictionary_raw_res = await fetch('/words_alpha.txt.gz');
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
	<main class="w-min mt-1">
		<JumbledWords {getWords} />
		<JumbledPhrase />
		<EmptyPhrase />
		<Solve {setupData} {getPhrases} />
	</main>
</div>
