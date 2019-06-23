<template>
	<div id="draggable">
		<draggable class="list-group" group="taskList" animation="150" :list="taskMgr.TaskLists">
			<div v-for="list in taskMgr.TaskLists" :key="list.ListId">
				<header class="header">
					<div>{{ list.ListId }}</div>
					<b-button @click="addList">+</b-button>
				</header>

				<draggable group="task" animation="150" :list="list.Tasks">
					<div v-for="task in list.Tasks" :key="task.id" @click="showTask(task)">{{ task.title }}</div>
				</draggable>

				<footer class="footer">
					<b-button @click="addTask(list.ListId)">Add</b-button>
				</footer>
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
	.header,
	.list-group {
		display: flex;
		justify-content: center;
	}
</style>
