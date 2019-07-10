<template>
	<div id="modal">
		<b-modal :active.sync="activeModal" scroll="keep">
			<div class="card" id="modal-card">
				<div class="card-content">
					<header>
						<input v-model="selectedTask.title" type="text" class="modal-card-title" />
					</header>
					<div class="modal-card-body content">
						<editor-content class="editor__content has-text-left" :editor="editor" />
					</div>
				</div>
			</div>
		</b-modal>
	</div>
</template>

<script lang="ts">
	import { Component, Vue, PropSync, Model, Watch } from 'vue-property-decorator';
	import { Editor, EditorContent } from 'tiptap';
	import {
		Blockquote,
		Bold,
		BulletList,
		Code,
		CodeBlock,
		CodeBlockHighlight,
		HardBreak,
		Heading,
		History,
		HorizontalRule,
		Italic,
		Link,
		ListItem,
		OrderedList,
		Placeholder,
		Table,
		TableHeader,
		TableCell,
		TableRow,
		TodoItem,
		TodoList,
		Strike,
		Underline,
	} from 'tiptap-extensions';
	import Task from '../Task';

	@Component({
		components: {
			EditorContent,
		},
	})
	export default class Modal extends Vue {
		@PropSync('isActive', { type: Boolean }) public activeModal!: boolean;

		// v-modelでTaskのデータを親から受け取る
		@Model('onChangedTask', { type: Task }) selectedTask!: Task;

		private emitAfterOnUpdate: boolean = false;

		private editor = new Editor({
			extensions: [
				new Blockquote(),
				new Bold(),
				new BulletList(),
				new Code(),
				new CodeBlock(),
				new CodeBlockHighlight(),
				new HardBreak(),
				new Heading({ levels: [2, 3, 4, 5, 6] }),
				new History(),
				new HorizontalRule(),
				new Italic(),
				new Link(),
				new ListItem(),
				new OrderedList(),
				new Placeholder(),
				new Table({ resizable: true }),
				new TableHeader(),
				new TableCell(),
				new TableRow(),
				new TodoItem({ nested: true }),
				new TodoList(),
				new Strike(),
				new Underline(),
			],
			content: this.selectedTask.content,
			onUpdate: this.onUpdate,
		});

		private beforeDestroy(): void {
			if (this.editor) {
				this.editor.destroy();
			}
		}

		private onUpdate(info: any) {
			this.emitAfterOnUpdate = true;

			const newContent = info.getHTML();
			this.selectedTask.content = newContent;
		}

		@Watch('selectedTask', { deep: true })
		private onChangedTask(task: Task, oldTask: Task) {
			if (this.emitAfterOnUpdate) {
				this.emitAfterOnUpdate = false;
				return;
			}
			if (this.editor) {
				this.editor.setContent(this.selectedTask.content);
			}
		}
	}
</script>

<style lang="scss">
	@import '~bulma';
	@import '~buefy/src/scss/buefy';

	ul[data-type='todo_list'] {
		padding-left: 0;
	}
	li[data-type='todo_item'] {
		display: flex;
		flex-direction: row;
	}
	.todo-checkbox {
		border: 2px solid $grey;
		height: 1.25em;
		width: 1.25em;
		box-sizing: border-box;
		margin-right: 10px;
		margin-top: 0.1rem;
		user-select: none;
		-webkit-user-select: none;
		cursor: pointer;
		border-radius: 0.2em;
		background-color: transparent;
		transition: 0.4s background;
	}
	.todo-content {
		flex: 1;
		> p:last-of-type {
			margin-bottom: 0;
		}
		> ul[data-type='todo_list'] {
			margin: 0.5rem 0;
		}
	}
	li[data-done='true'] {
		> .todo-content {
			> p {
				text-decoration: line-through;
			}
		}
		> .todo-checkbox {
			background-color: $cyan;
			border: 2px solid $cyan;
			position: relative;
		}
		.todo-checkbox:after {
			content: '';
			display: block;
			position: absolute;
			border-left: 2px solid $white;
			border-bottom: 2px solid $white;
			width: 15px;
			height: 5px;
			-webkit-transform: rotate(-45deg);
			transform: rotate(-45deg);
			left: 1px;
			top: 4px;
		}
	}
	li[data-done='false'] {
		text-decoration: none;
	}

	input[type='text'] {
		outline: none;
		border: 0px;
		background: transparent;
	}

	.editor__content {
		:focus {
			outline: none;
			border: 0px;
			background: transparent;
		}
	}

	#modal-card {
		min-height: calc(100vh - 100px);
		height: auto;
	}
	.modal-content {
		max-height: calc(100vh - 100px);
	}
	.modal-card-body {
		padding-bottom: 50px;
	}
</style>
