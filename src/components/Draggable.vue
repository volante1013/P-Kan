<template>
	<div id="draggable" class="container">
		<draggable class="columns is-multiline" group="taskList" animation="150" :list="taskMgr.TaskLists">
			<div class="column is-3" v-for="list in taskMgr.TaskLists" :key="list.ListId">
				<div class="card">
					<header class="header is-flex">
						<p class="title">{{ list.ListId }}</p>
						<b-button @click="addList">+</b-button>
					</header>

					<draggable class="tile is-parent is-vertical" group="task" animation="150" :list="list.Tasks">
						<div
							class="tile is-child box"
							v-for="task in list.Tasks"
							:key="task.id"
							@click="showTask(task)"
						>
							<p class="subtitle has-text-left">
								{{ task.title }}
							</p>
							<nav class="level">
								<b-taglist>
									<b-tag type="is-info">First</b-tag>
									<b-tag rounded>First</b-tag>
									<b-tag type="is-primary">First</b-tag>
								</b-taglist>
							</nav>
						</div>
					</draggable>

					<footer>
						<b-button @click="addTask(list.ListId)">Add</b-button>
					</footer>
				</div>
			</div>
		</draggable>

		<Modal :isActive.sync="isModalActive" v-model="selectedTask" />
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import draggable from 'vuedraggable';
	import Modal from './Modal.vue';
	import TaskManager from '../TaskManager';
	import TaskList from '../TaskList';
	import Task from '../Task';

	@Component({
		components: {
			draggable,
			Modal,
		},
	})
	export default class Draggable extends Vue {
		private taskMgr: TaskManager = new TaskManager();
		private isModalActive: boolean = false;
		private selectedTask?: Task = new Task('', '');

		private mounted() {
			this.taskMgr.addTaskList();
			this.taskMgr.addTask(0, new Task('task0', 'content0'));
			this.taskMgr.addTask(0, new Task('task1', 'content1'));
			this.taskMgr.addTask(0, new Task('task2', 'content2'));
			this.taskMgr.addTask(0, new Task('task3', 'content3'));
			this.taskMgr.addTaskList();
			this.taskMgr.addTask(1, new Task('task0', 'content0'));
			this.taskMgr.addTask(1, new Task('task1', 'content1'));
			this.taskMgr.addTask(1, new Task('task2', 'content2'));
			this.taskMgr.addTask(1, new Task('task3', 'content3'));
		}

		private addList(): void {
			this.taskMgr.addTaskList();
		}

		private addTask(listId: number): void {
			this.taskMgr.addTask(listId);
		}

		private showTask(task: Task): void {
			this.isModalActive = true;
			this.selectedTask = task;
		}
	}
</script>

<style scoped>
</style>
