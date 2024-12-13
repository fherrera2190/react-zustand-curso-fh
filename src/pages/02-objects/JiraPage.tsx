import { JiraTasks } from "../../components";
import { useTaskStore } from "../../stores";

export const JiraPage = () => {
  const getTaskByStatus = useTaskStore((state) => state.getTaskByStatus);

  const pendingTasks = getTaskByStatus("open");
  const inProgressTasks = getTaskByStatus("in-progress");
  const doneTasks = getTaskByStatus("done");

  console.log(pendingTasks.length, inProgressTasks.length, doneTasks.length);

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <JiraTasks title="Pendientes" value="open" tasks={pendingTasks} />

        <JiraTasks
          title="Avanzando"
          value="in-progress"
          tasks={inProgressTasks}
        />

        <JiraTasks title="Terminadas" value="done" tasks={doneTasks} />
      </div>
    </>
  );
};
