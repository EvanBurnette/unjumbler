<script lang="ts">
	import { emptyWordsStore, jumbledPhraseStore, readyToSolve } from './stores';
	import * as Comlink from 'comlink';
	let solutionArrays: string[][] = [];
	export let setupData: Function;
	export let getPhrases: Function;
	export let getNumSubworkers: Function;

	const addSolution = (newSolution: string, subArrId: number) => {
		solutionArrays[subArrId].push(newSolution);
		solutionArrays = solutionArrays;
	};

	const addSolutionProxy = Comlink.proxy(addSolution);

	const solve = async () => {
		if (!$readyToSolve) {
			solutionArrays = [['mismatched or missing letters and blanks']];
			return;
		}
		const numArrays = await getNumSubworkers().catch((err: Error) => {
			return 1;
		});
		solutionArrays = new Array(numArrays).fill([]).map((item) => new Array());
		await setupData($jumbledPhraseStore, $emptyWordsStore);
		// solutions = await getPhrases();
		// create callback and proxy of callback to mutate solutions
		getPhrases(addSolutionProxy);
	};
</script>

<button
	on:click={solve}
	class="btn {$readyToSolve ? 'variant-filled-success' : 'variant-ghost-success'} my-2 py-2 w-full"
	>Solve now!
</button>
<ul class="flex flex-col">
	{#each solutionArrays.flat() as solution}
		<li class="flex justify-center">{solution.toUpperCase()}</li>
	{/each}
</ul>
