<template>
	<div id="draggable"></div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import draggable from 'vuedraggable';

	@Component({
		components: {
			draggable,
		},
	})
	export default class Draggable extends Vue {}
</script>

<style>
</style>
