<script lang="ts">
	import JumbledWord from './JumbledWord.svelte';

	let jumbledWords = new Array();

	export let testWords: string[];

	$: if (testWords !== undefined && testWords.length !== 0) {
		jumbledWords = [];
		for (const word of testWords) {
			addWord();
		}
	}

	function addWord() {
		jumbledWords.push(true);
		jumbledWords = jumbledWords;
	}
	addWord();
	export let getWords: Function;

	// list is empty so cleanup
	// part of hack that preserves words
	$: if (jumbledWords.every((bool) => !bool)) {
		jumbledWords.length = 0;
	}
</script>

<ul>
	{#each jumbledWords as jWord, idx}
		{#if jWord}
			<li class="flex">
				{#if testWords.length !== 0}
					<JumbledWord {idx} {getWords} testWord={testWords[idx]} />
				{:else}
					<JumbledWord {idx} {getWords} />
				{/if}
				<button
					aria-controls="delete word"
					class="btn variant-ringed-primary py-0.5 px-2.5 self-start"
					on:click={() => {
						// this hack prevents the svelte runtime from only deleting the last element
						jumbledWords[idx] = false;
						jumbledWords = jumbledWords;
					}}>X</button
				>
			</li>
		{/if}
	{/each}
</ul>
<div class="px-0 w-full">
	<button class="btn variant-filled-primary my-2 py-2 w-full" on:click={addWord}
		>+ Add jumbled word
	</button>
</div>
