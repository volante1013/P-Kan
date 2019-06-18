<template>
	<div id="draggable">
		<draggable class="list-group" group="taskList" animation="150" :list="taskLists">
			<div v-for="list in taskLists" :key="list.ListId">
				<div class="header" slot="header">
					<div>{{ list.ListId }}</div>
					<b-button @click="addList">+</b-button>
				</div>

				<draggable group="task" animation="150" :list="list.Tasks">
					<div v-for="task in list.Tasks" :key="task.id" @click="showTask(task)">{{ task.title }}</div>
				</draggable>

				<b-button slot="footer" @click="addTask(list.ListId)">Add</b-button>
			</div>
		</draggable>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import draggable from 'vuedraggable';
	import TaskList from '../TaskList';
	import Task from '../Task';

	@Component({
		components: {
			draggable,
		},
	})
	export default class Draggable extends Vue {
		private taskLists: TaskList[] = [];

		private mounted() {
			const taskList0 = new TaskList(0);
			taskList0.AddTask(new Task('task0', 'content0'));
			taskList0.AddTask(new Task('task1', 'content1'));
			taskList0.AddTask(new Task('task2', 'content2'));
			taskList0.AddTask(new Task('task3', 'content3'));
			const taskList1 = new TaskList(1);
			taskList1.AddTask(new Task('task0', 'content0'));
			taskList1.AddTask(new Task('task1', 'content1'));
			taskList1.AddTask(new Task('task2', 'content2'));
			taskList1.AddTask(new Task('task3', 'content3'));
			this.taskLists.push(taskList0, taskList1);
		}

		private addList(): void {
			const taskListIdArray: number[] = this.taskLists.map((tl): number => tl.ListId);
			this.taskLists.push(new TaskList(Math.max(...taskListIdArray) + 1));
		}

		private addTask(listId: number): void {
			const taskList: TaskList[] = this.taskLists.filter(tl => tl.ListId === listId);
			if (taskList.length > 1) {
				console.warn('Same TaskListId is found!', taskList);
			}

			taskList[0].AddTask(new Task('Untitled', 'Uncontented'));
		}

		private showTask(task: Task): void {
			console.log(`${task.title}: ${task.content}`);
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
