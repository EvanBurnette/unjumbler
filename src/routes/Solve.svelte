<script lang="ts">
	import { emptyWordsStore, jumbledPhraseStore, readyToSolve } from './stores';
	let solutions: string[] = [];
	export let setupData: Function;
	export let getPhrases: Function;
	const solve = async () => {
		if (!$readyToSolve) {
			solutions = ['mismatched or missing letters and blanks'];
			return;
		}
		solutions = [];
		await setupData($jumbledPhraseStore, $emptyWordsStore);
		solutions = await getPhrases();
	};
</script>

<button
	on:click={solve}
	class="btn {$readyToSolve ? 'variant-filled-success' : 'variant-ghost-success'} my-2 py-2 w-full"
	>Solve now!
</button>
<ul class="flex flex-col">
	{#each solutions as solution}
		<li class="borde flex justify-center">{solution.toUpperCase()}</li>
	{/each}
</ul>
