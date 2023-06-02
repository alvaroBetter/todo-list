"use client";
import { ITask } from "@/types/tasks";
import { FiEdit3, FiTrash } from "react-icons/fi";
import { Modal } from "./Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
	task: ITask;
}

export const Task: React.FC<TaskProps> = ({ task }) => {
	const router = useRouter();
	const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
	const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
	const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

	const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		await editTodo({
			id: task.id,
			text: taskToEdit,
		});
		setOpenModalEdit(false);
		setTaskToEdit("");
		router.refresh();
	};

	const handleDeleteTask = async (id: string) => {
		await deleteTodo(id);
		setOpenModalDelete(false);
		router.refresh();
	};
	return (
		<tr key={task.id}>
			<td className="w-full">{task.text}</td>
			<td className="flex gap-5">
				<FiEdit3
					onClick={() => setOpenModalEdit(true)}
					cursor="pointer"
					className="text-blue-500"
					size={25}
				/>
				<Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
					<form onSubmit={handleSubmitEditTodo}>
						<h3 className="font font-bold text-lg text-center">Edit Task</h3>
						<div className="modal-action">
							<input
								value={taskToEdit}
								onChange={(e) => setTaskToEdit(e.target.value)}
								type="text"
								placeholder="Edit here"
								className="input input-bordered w-full"
							/>
							<button className="btn" type="submit">
								Submit
							</button>
						</div>
					</form>
				</Modal>
				<FiTrash
					onClick={() => setOpenModalDelete(true)}
					className="text-red-500"
					size={25}
				/>
				<Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
					<h3 className="text-lg text-center mt-4">
						Are you sure, you want to delete this task?
					</h3>
					<div className="modal-action">
						<button className="btn" onClick={() => handleDeleteTask(task.id)}>
							Yes
						</button>
					</div>
				</Modal>
			</td>
		</tr>
	);
};
