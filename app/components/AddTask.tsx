"use client";
import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export const AddTask = () => {
	const router = useRouter();
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [newTaskValue, setNewTaskValue] = useState<string>("");

	const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!newTaskValue) {
			return alert("Please type a task");
		} else {
			await addTodo({
				id: uuidv4(),
				text: newTaskValue,
			});
			setModalOpen(false);
			setNewTaskValue("");
			router.refresh();
		}

	};

	return (
		<div>
			<button
				onClick={() => setModalOpen(true)}
				className="btn btn-primary w-full">
				Add new task <AiOutlinePlus className="ml-2" size={18} />
			</button>
			<Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
				<form onSubmit={handleSubmitNewTodo}>
					<h3 className="font font-bold text-lg">Add new Task</h3>
					<div className="modal-action">
						<input
							value={newTaskValue}
							onChange={(e) => setNewTaskValue(e.target.value)}
							type="text"
							placeholder="Type here"
							className="input input-bordered w-full "
						/>
						<button className="btn" type="submit">
							Submit
						</button>
					</div>
				</form>
			</Modal>
		</div>
	);
};
