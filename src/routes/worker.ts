const isEqual = (counts1: Counts, counts2: Counts): boolean => {
	for (const key in counts1) {
		if (!(key in counts2)) {
			return false;
		}
		if (counts1[key] !== counts2[key]) {
			return false;
		}
	}
	// in case we encounter the shorter word first, make sure there are no uncounted letters
	if (Object.keys(counts1).length != Object.keys(counts2).length) {
		return false;
	}
	return true;
};

const isSubset = (wordCounts: Counts, phraseCounts: Counts): boolean => {
	// we know the empty phrase has all letters so skip that step
	for (const key in wordCounts) {
		if (wordCounts[key] > phraseCounts[key]) {
			return false;
		}
	}
	return true;
};

let dictionary: string[] = [];
let dictionaryMap: { word: string; counts: Counts }[] = [];

export const setDictionary = (dictionary_raw: string) => {
	dictionary = dictionary_raw.split('\n');
	createDictionaryMap();
	console.debug(dictionaryMap.slice(0, 10));
};

const countLetters = (word: string) => {
	const counts: Counts = {};
	for (const letter of word) {
		counts[letter] ? counts[letter]++ : (counts[letter] = 1);
	}
	return counts;
};

const createDictionaryMap = () => {
	dictionaryMap = dictionary.map((word) => ({ word: word, counts: countLetters(word) }));
};

export const getWords = (jumbledWord: string) => {
	const jWordCounts = countLetters(jumbledWord);
	return dictionaryMap
		.filter((wordAndCounts) => {
			return isEqual(wordAndCounts.counts, jWordCounts);
		})
		.map((word) => word.word);
};

// const _getPhrases = (
// 	jumbledPhrase: Counts,
// 	foundPhrases: string[],
// 	addSolutionProxy: Function,
// 	idx = 0,
// 	phrase = ''
// ) => {
// 	//base case: if we've used up all the words then the phrase is good
// 	if (idx >= subDictionaries.length) {
// 		// foundPhrases.push(phrase);
// 		addSolutionProxy(phrase);
// 		return;
// 	}
// 	outerLoop: for (const { word: word, counts: counts } of subDictionaries[idx]) {
// 		const jumbledPhrase_clone = structuredClone(jumbledPhrase);
// 		// console.debug(jumbledPhrase_clone);
// 		// if each jumbledPhrase_clone[key] - counts[key] of current doesn't go negative
// 		for (const key in counts) {
// 			jumbledPhrase_clone[key] -= counts[key];
// 			//early exit because we ran out of a particular letter
// 			if (jumbledPhrase_clone[key] < 0) continue outerLoop;
// 		}
// 		//add word to phrase and recursively call
// 		_getPhrases(jumbledPhrase_clone, foundPhrases, addSolutionProxy, idx + 1, `${phrase} ${word}`);
// 	}
// };

const numCpus = navigator.hardwareConcurrency;

const subWorkers = [];
for (let i = 0; i < Math.floor(numCpus / 1); i++) {
	// for (let i = 0; i < 1; i++) {
	const subWorker = new ComlinkWorker<typeof import('./subWorker')>(
		new URL('/subWorker', import.meta.url)
	);
	subWorkers.push(subWorker);
}

console.debug('hello from worker');

let subDictionaries: WordAndCounts[][];
let jPhrase: Counts;
export const getPhrases = (addSolutionProxy: Function) => {
	if (numCpus > subDictionaries[0].length) {
		subWorkers[0]._getPhrases(jPhrase, [], addSolutionProxy, subDictionaries);
	} else {
		subWorkers.forEach((subWorker, i) => {
			const subRange = {
				start: i * Math.floor(subDictionaries[0].length / numCpus),
				end: (i + 1) * Math.floor(subDictionaries[0].length / numCpus)
			};
			if (i === subWorkers.length - 1) {
				subRange.end = subDictionaries[0].length + 1;
			}
			const subSubDictionaries = structuredClone(subDictionaries);
			subSubDictionaries[0] = subSubDictionaries[0].slice(subRange.start, subRange.end);
			subWorkers[i]._getPhrases(jPhrase, [], addSolutionProxy, subSubDictionaries);
		});
	}
};

export let setupData = (jumbledPhrase: Counts, emptyWords: number[]) => {
	jPhrase = jumbledPhrase;
	const lettersInPhrase = new Set(
		Object.entries(jumbledPhrase)
			.filter(([k, v]) => {
				return v > 0;
			})
			.map(([k, v]) => k)
	);
	subDictionaries = emptyWords.map((numLetters) => {
		return dictionaryMap.filter(({ word: word, counts: counts }) => {
			if (!(numLetters === word.length)) return false;
			return isSubset(counts, jumbledPhrase);
		});
	});

	return;
};
