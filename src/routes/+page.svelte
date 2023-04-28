<script lang="ts">
	import JumbledWords from './JumbledWords.svelte';
	import EmptyPhrase from './EmptyPhrase.svelte';
	import JumbledPhrase from './JumbledPhrase.svelte';
	import Solve from './Solve.svelte';
	import { onMount } from 'svelte';
	import { jumbledPhraseStore } from './stores';

	let getWords: Function;

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
	});
</script>

<div class="grid justify-center">
	<main class="w-min mt-1">
		<JumbledWords {getWords} />
		<JumbledPhrase />
		<EmptyPhrase />
		<Solve />
	</main>
</div>

<style lang="postcss">
	/* :global(*) {
		border: dotted white 1px;
	} */
	:global(.xButton) {
		@apply btn variant-ringed-primary py-0.5 px-2.5;
	}
	:global(*) {
		/* border: solid black 1px; */
	}
</style>
