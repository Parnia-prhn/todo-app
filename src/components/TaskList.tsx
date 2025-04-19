import TaskItem from "./TaskItem";
import { Priority, Task } from "../types/Task";

type Props = {
  tasks: Task[];
  onEdit: (
    id: string,
    newTitle: string,
    priority: Priority,
    description?: string,
    reminderAt?: string
  ) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

export default function TaskList({ tasks, onEdit, onDelete, onToggle }: Props) {
  return (
    <div className="space-y-2">
      {tasks.length === 0 && (
        <p className="text-gray-400 text-center">تسکی وجود ندارد.</p>
      )}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
