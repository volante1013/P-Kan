<template>
	<div id="modal">
		<b-modal :active.sync="activeModal" scroll="keep">
			<div class="card">
				<div class="card-content">
					<div class="media">
						<div class="media-content">
							<!-- <p class="title is-4">
								{{ selectedTask.title }}
							</p> -->
							<input v-model="selectedTask.title" type="text" class="title is-4" />
						</div>
					</div>
					<!-- <div class="content">
						{{ selectedTask.content }}
					</div> -->
					<input v-model="selectedTask.content" type="text" class="content" />
				</div>
			</div>
		</b-modal>
	</div>
</template>

<script lang="ts">
	import { Component, Vue, PropSync, Model } from 'vue-property-decorator';
	import Task from '../Task';

	@Component
	export default class Modal extends Vue {
		@PropSync('isActive', { type: Boolean }) public activeModal!: boolean;

		// v-modelでTaskのデータを親から受け取る
		@Model('onChangedTask', { type: Task }) selectedTask!: Task;
	}
</script>

<style>
</style>
