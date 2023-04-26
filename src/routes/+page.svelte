<script lang="ts">
	import JumbledWords from './JumbledWords.svelte';
	import EmptyPhrase from './EmptyPhrase.svelte';
	import JumbledPhrase from './JumbledPhrase.svelte';
	import Solve from './Solve.svelte';
	import { onMount } from 'svelte';

	onMount(async () => {
		const instance = new ComlinkWorker<typeof import('./worker')>(
			new URL('./worker', import.meta.url)
		);
		console.log(await instance.add(2, 3));
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
