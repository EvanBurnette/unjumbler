<script lang="ts">
	export let idx: number;
	export let getWords: Function;

	let jumbledWord = '';
	let suggestions: string[] = [];
</script>

<section>
	<label for="jumbledIn" class="label flex" aria-label="{idx} scrambled word">
		<input
			bind:value={jumbledWord}
			on:change={() => {
				suggestions = getWords(jumbledWord);
			}}
			id="jumbledIn"
			type="text"
			class="input text-center text-xl uppercase"
		/>
	</label>

	<ol>
		{#each suggestions as suggestion, i}
			<li class="flex">
				<button class="btn variant-ghost-tertiary uppercase w-full">
					{suggestion}
				</button>
			</li>
		{/each}
	</ol>
</section>

<style>
	ol > li > button {
		margin-right: -0.5rem;
	}
	section {
		width: clamp(10ch, 100%, 100ch);
	}
</style>
