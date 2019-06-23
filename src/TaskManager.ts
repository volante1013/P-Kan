import Task from "./Task";
import TaskList from "./TaskList";
export default class TaskManager {
	public TaskLists: TaskList[] = [];

	/**
	 * addTaskList
	 */
	public addTaskList(): void {
		if (this.TaskLists.length <= 0) {
			this.TaskLists.push(new TaskList(0));
			return;
		}
		const taskListIdArray: number[] = this.TaskLists.map((tl): number => tl.ListId);
		this.TaskLists.push(new TaskList(Math.max(...taskListIdArray) + 1));
	}

	/**
	 * addTask
	 * TaskListが少なくとも１つ以上ある時に呼ばれる前提
	 */
	public addTask(listId: number, task?: Task): void {
		const taskList: TaskList[] = this.TaskLists.filter((tl): boolean => tl.ListId === listId);
		if (taskList.length > 1) {
			console.warn(`Same TaskListId is found! => ${taskList}`);
		}

		const newTaskID = this.getMaxTaskID() + 1;
		if (task != null) {
			task.id = newTaskID;
			taskList[0].AddTask(task);
		} else {
			taskList[0].AddTask(new Task("Untitled", "Uncontented", newTaskID));
		}
	}

	private getMaxTaskID(): number {
		const taskIDs: number[] = [];
		this.TaskLists.filter((tl): boolean => tl.Tasks.length > 0).forEach((tl): void => {
			const ids: number[] = tl.Tasks.map((t): number => t.id);
			taskIDs.push(...ids);
		});
		return taskIDs.length > 0 ? Math.max(...taskIDs) : -1;
	}
}
