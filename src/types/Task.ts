export type Priority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string | null;
  priority: Priority;
  description?: string;
};
