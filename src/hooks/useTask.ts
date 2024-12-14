import { DragEvent, useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import { TaskStatus } from "../interfaces";

interface Args {
  status: TaskStatus;
}

export const useTask = ({ status }: Args) => {
  const isDragging = useTaskStore((state) => !!state.draggingTaskId);
  const [onDragOver, setOnDragOver] = useState(false);

  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const addTask = useTaskStore((state) => state.addTask);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onTaskDrop(status);
    setOnDragOver(false);
  };

  const handleAddTask = async () => {
    const { isConfirmed, value } = await Swal.fire({
      title: "Nueva Tarea",
      input: "text",
      inputLabel: "Nombre de la tarea",
      inputPlaceholder: "Ingrese el nombre de la tarea",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Por favor ingrese el nombre de la tarea";
        }
      },
    });

    if (!isConfirmed) return;

    addTask(value, status);
  };

  return {
    isDragging,
    onDragOver,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleAddTask,
  };
};
