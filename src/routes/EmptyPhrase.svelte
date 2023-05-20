<script lang="ts">
	import { jumbledPhraseStore, readyToSolve, jumber, emptyWordsStore } from './stores';

	let empties: boolean[] = [true];

	const addLetter = () => {
		empties.push(true);
		empties = empties;
	};

	const addSpace = () => {
		empties.push(false);
		empties = empties;
	};

	const deleteLast = () => {
		empties.pop();
		empties = empties;
	};

	let numEmpties = 0;

	$: {
		emptyWordsStore.set(
			empties.reduce(
				(acc, cur) => {
					if (cur) {
						return [...acc.slice(0, -1), acc.slice(-1)[0] + 1];
					} else {
						acc.push(0);
						return acc;
					}
				},
				[0]
			)
		);
		numEmpties = $emptyWordsStore.reduce((acc, cur) => acc + cur, 0);
	}

	$: readyToSolve.set(numEmpties > 1 && numEmpties === $jumber);
	let boxWidth = 10;

	$: boxWidth = Math.min(Math.floor(100 / $jumber), Math.floor(100 / empties.length));
</script>

<p>Phrase template</p>
<ul class="w-full flex my-2">
	{#each empties as empty}
		{#if empty}
			<li
				class="aspect-square border-2 border-primary-900 my-auto"
				style="width: min({boxWidth}%, 2rem); height: min({boxWidth}%, 2rem);"
			>
				<div class="w-full aspect-square rounded-full border border-dotted border-primary-500" />
			</li>
		{:else}
			<li style="width: min({boxWidth}%, 2rem)" />
		{/if}
	{/each}
	<span class="grow" />
	<button class="btn variant-ringed-primary py-0.5 px-2.5" on:click={deleteLast}>X</button>
</ul>
<div class="flex">
	<button class="btn variant-ringed-primary grow" on:click={addSpace}> + Space </button>
	<button class="btn variant-ringed-primary grow" on:click={addLetter}> + Letter </button>
</div>
