<script lang="ts">
	import { jumbledPhraseStore } from './stores';
	import { onDestroy } from 'svelte';

	export let letter: string;
	let selected = false;

	const toggleLetter = (letter: string) => {
		button.classList.toggle('variant-filled-success');
		jumbledPhraseStore.update((counts) => {
			counts[letter] += selected ? -1 : 1;
			return counts;
		});
		selected = !selected;
	};

	let button: HTMLButtonElement;

	onDestroy(() => {
		jumbledPhraseStore.update((counts) => {
			if (selected) {
				selected = false;
				counts[letter]--;
			}
			return counts;
		});
	});
</script>

<button
	bind:this={button}
	on:click={() => toggleLetter(letter)}
	class="btn border border-success-500 uppercase w-full"
>
	{letter}
</button>
