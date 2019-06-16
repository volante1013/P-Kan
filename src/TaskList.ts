import Task from "./Task";

export default class TaskList {
	public ListId: number;
	public Tasks: Task[] = [];
	public constructor(id: number, task: Task) {
		this.ListId = id;
		this.AddTask(task);
	}

	public AddTask(task: Task): void {
		if(this.Tasks.length <= 0){
			task.id = 0;
		}
		else{
			const taskIdArray: number[] = this.Tasks.map((t): number => t.id);
			task.id = Math.max(...taskIdArray) + 1;
		}
		this.Tasks.push(task);
	}
}