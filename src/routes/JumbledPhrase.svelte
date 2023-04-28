<script lang="ts">
	import { jumbledPhraseStore } from './stores';
	let jumbledPhrase = '';
	$: jumbledPhrase = Object.entries($jumbledPhraseStore)
		.filter(([k, v]) => v !== 0)
		.map(([k, v]) => {
			return new Array(v).fill(k).join('');
		})
		.join('');
	let jumber = 0;
	$: jumber = Object.values($jumbledPhraseStore).reduce((acc, cur) => {
		return acc + cur;
	}, 0);
</script>

<label class="label" for="phrase">
	<span> {jumber} Jumbled Letters </span>
	<input bind:value={jumbledPhrase} id="phrase" type="text" class="input" />
</label>
