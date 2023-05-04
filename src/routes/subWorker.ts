let id = 0;
export function setWorkerId(wid: number): void {
	id = wid;
	console.debug(`hello from subworker ${id}`);
}

export const _getPhrases = (
	jumbledPhrase: Counts,
	foundPhrases: string[],
	addSolutionProxy: Function,
	subDictionaries: WordAndCounts[][],
	idx = 0,
	phrase = ''
): number => {
	//base case: if we've used up all the words then the phrase is good
	if (idx >= subDictionaries.length) {
		// foundPhrases.push(phrase);
		addSolutionProxy(phrase, id);
		return id;
	}
	outerLoop: for (const { word: word, counts: counts } of subDictionaries[idx]) {
		const jumbledPhrase_clone = structuredClone(jumbledPhrase);
		// console.debug(jumbledPhrase_clone);
		// if each jumbledPhrase_clone[key] - counts[key] of current doesn't go negative
		for (const key in counts) {
			jumbledPhrase_clone[key] -= counts[key];
			//early exit because we ran out of a particular letter
			if (jumbledPhrase_clone[key] < 0) continue outerLoop;
		}
		//add word to phrase and recursively call
		_getPhrases(
			jumbledPhrase_clone,
			foundPhrases,
			addSolutionProxy,
			subDictionaries,
			idx + 1,
			`${phrase} ${word}`
		);
	}
	return id;
};
