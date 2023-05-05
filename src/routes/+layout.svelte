<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	// import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
	// import '@skeletonlabs/skeleton/themes/theme-rocket.css';
	// import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import './theme2.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	import { LightSwitch } from '@skeletonlabs/skeleton';

	// import { Modal, modalStore } from '@skeletonlabs/skeleton';
	// import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	// const aboutModal = () => {
	// 	const alert: ModalSettings = {
	// 		type: 'alert',
	// 		// Data
	// 		title: 'About Unjumbler',
	// 		body: 'Ruin the fun of the popular newspaper word game <a href="https://www.google.com/search?q=jumble&tbm=isch" target="_blank">Jumble™️</a>',
	// 		// image: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Jumble_puzzle.png',
	// 		// <br>Example Jumble style puzzle from Lord Belbury, scientist cartoon by BAUSCHRON on wikimedia <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>
	// 		buttonTextCancel: 'Close'
	// 	};
	// 	modalStore.trigger(alert);
	// };
	let aboutDialog: HTMLDialogElement = { open: false };
	let dialogOpen = false;
	export const openAbout = () => {
		dialogOpen = true;
		aboutDialog.show();
	};

	const onClickOutSide = (e: MouseEvent) => {
		console.debug(e);
		const { left, right, top, bottom } = aboutDialog.getBoundingClientRect();
		const { clientX, clientY } = e;
		if (clientX > right || clientX < left || clientY > bottom || clientY < top) {
			aboutDialog.close();
		}
		dialogOpen = false;
		aboutDialog.close();
	};
	let blurBackground = '';
	$: {
		blurBackground = dialogOpen ? 'z-20 opacity-70' : 'opacity-0 z-[-10]';
	}
</script>

<div on:click={onClickOutSide} class="w-[100vw] h-[100vh] absolute bg-black {blurBackground}" />
<dialog
	on:keydown={(e) => {
		if (e.key === 'Escape') {
			aboutDialog.close();
			dialogOpen = false;
		}
	}}
	bind:this={aboutDialog}
	class="modal w-modal-wide absolute top-[10%] z-30 bg-surface-100-800-token text-primary-400"
>
	<p>
		Ruin the fun of the popular newspaper word game <a
			href="https://www.google.com/search?q=jumble&tbm=isch"
			target="_blank">Jumble™️</a
		>
	</p>
</dialog>
<!-- App Shell -->
<AppShell>
	<!-- <Modal width="w-modal-slim" /> -->
	<!-- </div> -->
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">unjumbler</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
				<button class="btn btn-sm variant-ghost-surface" on:click={openAbout}> About </button>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/EvanBurnette/unjumbler"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
