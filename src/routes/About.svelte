<script lang="ts">
	// @ts-ignore
	export let closeModal: MouseEventHandler<HTMLButtonElement>;
</script>

<span class="flex justify-between">
	<h3>About Unjumbler</h3>
	<span />
	<button on:click={closeModal} class="btn py-0.5 px-2.5 mb-4">X</button>
</span>
<p>
	This is a webapp to ruin the fun of the popular newspaper word game <a
		href="https://www.google.com/search?q=jumble&tbm=isch"
		target="_blank">Jumble&trade;</a
	>
</p>
<figure class="flex flex-col">
	<img
		class="my-4 border-2 border-primary-900 max-w-xl mb-0"
		src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Jumble_puzzle.png"
		alt="Jumble puzzle with jumbled words: YNAROC [1,4,5] DISNM [1,2,5] NYNIT [1,3] ARHCEB [2,3,6] and empty phrase of 2 letters and then 9 letters. Cartoon has a scientist whereing a labcoat where the clue is 'The biologist broke up with the physicist because they had ...'"
	/>
	<figcaption>
		<p style="font-size:x-small; line-height:normal;">
			<a href="https://upload.wikimedia.org/wikipedia/commons/6/6b/Jumble_puzzle.png"
				>Example Jumble style puzzle</a
			>
			from Lord Belbury, scientist cartoon by BAUSCHRON on wikimedia
			<a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>
		</p>
	</figcaption>
</figure>

<h3 class="mt-6">How to use</h3>
<ol class="list-decimal mx-4">
	<li>Add jumbled words</li>
	<li>Select the correct suggestion</li>
	<li>Select the letters from each word to fill in the phrase</li>
	<li>Create the phrase template</li>
	<li>Click "Solve now!" for phrase suggestions</li>
</ol>
