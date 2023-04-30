<script lang="ts">
	import { jumbledPhraseStore, jumber } from './stores';
	let jumbledPhrase = '';
	let upperPhrase: string;
	$: jumbledPhrase = Object.entries($jumbledPhraseStore)
		.filter(([k, v]) => v !== 0)
		.map(([k, v]) => {
			return new Array(v).fill(k).join('');
		})
		.join('');
	$: upperPhrase = jumbledPhrase.toUpperCase();
</script>

<label class="label" for="phrase">
	<span> {$jumber} Jumbled Letters </span>
	<input bind:value={upperPhrase} id="phrase" type="text" class="input" />
</label>
