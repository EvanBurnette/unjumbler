<script>
	import JumbledWord from './JumbledWord.svelte';

	let jumbledWords = new Array(1).fill('');

	function addWord() {
		jumbledWords.push('');
		jumbledWords = jumbledWords;
	}
</script>

<ul>
	{#each jumbledWords as _, idx}
		<li class="flex">
			<JumbledWord {idx} />
			<button
				aria-controls="delete word"
				class="btn variant-filled-tertiary py-0.5 px-2.5 aspect-square self-start"
				on:click={() => {
					jumbledWords.splice(idx, 1);
					jumbledWords = jumbledWords;
				}}>X</button
			>
		</li>
	{/each}
</ul>
<div class="px-0 w-full">
	<button class="btn variant-filled-primary my-2 py-2 w-full" on:click={addWord}
		>+ Add jumbled word
	</button>
</div>
