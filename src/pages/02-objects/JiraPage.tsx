import { JiraTasks } from "../../components";
import { useTaskStore } from "../../stores";

export const JiraPage = () => {
  const state = useTaskStore((state) => state);


  const pendingTasks = state.getTaskByStatus("open");
  const inProgressTasks = state.getTaskByStatus("in-progress");
  const doneTasks = state.getTaskByStatus("done");

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <JiraTasks title="Pendientes" status="open" tasks={pendingTasks} />

        <JiraTasks
          title="Avanzando"
          status="in-progress"
          tasks={inProgressTasks}
        />

        <JiraTasks title="Terminadas" status="done" tasks={doneTasks} />
      </div>
    </>
  );
};
