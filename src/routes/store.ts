import { readable } from 'svelte/store';

export const xStyle = readable('btn variant-filled-tertiary py-0.5 px-2.5 rounded', (set) => {
	//do nothing because it's a constant value
});
