export default class Task {
	public id!: number;
	public title!: string;
	public content?: string;
	public constructor(title: string, content: string) {
		this.id = -1; // idはTaskListのほうで決定する
		this.title = title;
		this.content = content;
	}
}
