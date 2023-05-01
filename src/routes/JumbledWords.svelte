<script lang="ts">
	import JumbledWord from './JumbledWord.svelte';

	let jumbledWords = new Array();

	function addWord() {
		jumbledWords.push(true);
		jumbledWords = jumbledWords;
	}
	addWord();
	export let getWords: Function;

	// list is empty so cleanup
	// part of hack that fixes memory leak
	$: if (jumbledWords.every((bool) => !bool)) {
		jumbledWords.length = 0;
	}
</script>

<ul class="">
	{#each jumbledWords as jWord, idx}
		{#if jWord}
			<li class="w-full my-2">
				<JumbledWord {idx} {getWords}>
					<button
						aria-controls="delete word"
						class="btn variant-ringed-primary py-0.5 px-2.5"
						on:click={() => {
							// this hack prevents the svelte runtime from only deleting the last element
							jumbledWords[idx] = false;
							jumbledWords = jumbledWords;
						}}>X</button
					>
				</JumbledWord>
			</li>
		{/if}
	{/each}
</ul>
<div class="px-0 w-full">
	<button class="btn variant-filled-primary my-2 py-2 w-full" on:click={addWord}
		>+ Add jumbled word
	</button>
</div>
