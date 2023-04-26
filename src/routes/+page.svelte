<script lang="ts">
	import JumbledWords from './JumbledWords.svelte';
	import EmptyPhrase from './EmptyPhrase.svelte';
	import JumbledPhrase from './JumbledPhrase.svelte';
	import Solve from './Solve.svelte';
	import { onMount } from 'svelte';

	onMount(async () => {
		const instance = new ComlinkWorker<typeof import('./worker')>(
			new URL('/worker', import.meta.url)
		);
		console.log(await instance.add(2, 3));
		try {
			const dictionary_raw_res = await fetch('/words_alpha.txt.gz');
			const dictionary_raw = await (await dictionary_raw_res.blob()).text();
			console.log(dictionary_raw);
		} catch (error) {
			console.error(error);
		}
	});
</script>

<div class="grid justify-center">
	<main class="w-min mt-1">
		<JumbledWords />
		<JumbledPhrase />
		<EmptyPhrase />
		<Solve />
	</main>
</div>

<style>
	/* :global(*) {
		border: dotted white 1px;
	} */
</style>
