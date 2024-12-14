import { create, StateCreator } from "zustand";
import { Task, TaskStatus } from "../../interfaces";
import { devtools, persist } from "zustand/middleware";
import { v4 } from "uuid";
// import { produce } from "immer";
import { immer } from "zustand/middleware/immer";
interface TaskState {
  draggingTaskId?: string;
  tasks: Record<string, Task>;

  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  getTaskByStatus: (status: TaskStatus) => Task[];
  removeDraggingTaskId: () => void;
  setDraggingTaskId: (taskId: string) => void;
  onTaskDrop: (status: TaskStatus) => void;

  addTask: (title: string, status: TaskStatus) => void;

  countTask: () => number;
}

const storeApi: StateCreator<TaskState, [["zustand/immer", never]]> = (
  set,
  get
) => ({
  tasks: {
    "ABC-1": {
      id: "ABC-1",
      title: "Task #1",
      status: "open",
    },
    "ABC-2": {
      id: "ABC-2",
      title: "Task #2",
      status: "in-progress",
    },
    "ABC-3": {
      id: "ABC-3",
      title: "Task #3",
      status: "open",
    },
    "ABC-4": {
      id: "ABC-4",
      title: "Task #4",
      status: "open",
    },
  },
  getTaskByStatus: (status: TaskStatus) => {
    return Object.values(get().tasks).filter((task) => task.status === status);
  },

  setDraggingTaskId: (taskId: string) => {
    set({
      draggingTaskId: taskId,
    });
  },

  removeDraggingTaskId: () => set({ draggingTaskId: undefined }),

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    set((state) => {
      state.tasks[taskId] = {
        ...state.tasks[taskId],
        status,
      };
    });
  },
  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;
    get().changeTaskStatus(taskId, status);
    get().removeDraggingTaskId();
  },
  addTask: (title: string, status: TaskStatus) => {
    const newTask = { id: v4(), title, status };

    //Middelware immer nativo
    set((state) => {
      state.tasks[newTask.id] = newTask;
    });

    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTask.id]: newTask,
    //   },
    // }));

    // Mutando el estado con immer sin middleware
    // set(
    //   produce((state: TaskState) => {
    //     state.tasks[newTask.id] = newTask;
    //   })
    // );
  },
  countTask: () => {
    return Object.keys(get().tasks).length;
  },
});

export const useTaskStore = create<TaskState>()(
  devtools(persist(immer(storeApi), { name: "task-storage" }))
);
