export default class Task {
	public id!: number;
	public title!: string;
	public content?: string;
	public constructor(title: string, content: string, id?: number) {
		this.title = title;
		this.content = content;
		this.id = id != null ? id : -1;
	}
}
