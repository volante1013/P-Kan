import Task from "./Task";

export default class TaskList {
	public ListId: number;
	public Tasks: Task[] = [];
	public constructor(id: number) {
		this.ListId = id;
	}

	public AddTask(task: Task): void {
		this.Tasks.push(task);
	}
}
