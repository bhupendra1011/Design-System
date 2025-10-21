'use client';

import { useOptimistic, useState, useTransition } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { toggleTodo } from "./actions";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type TodoListProps = {
  initialTodos: Todo[];
};

type OptimisticUpdate = {
  id: number;
  completed: boolean;
};

export function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState(initialTodos);
  const [pendingIds, setPendingIds] = useState<number[]>([]);
  const [optimisticTodos, applyOptimisticUpdate] = useOptimistic(
    todos,
    (currentTodos: Todo[], update: OptimisticUpdate) =>
      currentTodos.map(todo =>
        todo.id === update.id ? { ...todo, completed: update.completed } : todo
      )
  );
  const [, startTransition] = useTransition();

  const handleToggle = (todoId: number) => {
    const current = todos.find(todo => todo.id === todoId);
    if (!current) {
      return;
    }

    const nextCompleted = !current.completed;

    // Set pending state immediately (outside transition is ok for this)
    setPendingIds(prev => [...prev, todoId]);

    startTransition(() => {
      // Apply optimistic UI state inside transition
      applyOptimisticUpdate({ id: todoId, completed: nextCompleted });
      setTodos(prev =>
        prev.map(todo =>
          todo.id === todoId ? { ...todo, completed: nextCompleted } : todo
        )
      );

      toggleTodo({ id: todoId, completed: nextCompleted })
        .then(result => {
          setTodos(prev =>
            prev.map(todo =>
              todo.id === result.id
                ? { ...todo, completed: result.completed }
                : todo
            )
          );
        })
        .catch(() => {
          // Revert optimistic update on failure.
          applyOptimisticUpdate({ id: todoId, completed: current.completed });
          setTodos(prev =>
            prev.map(todo =>
              todo.id === todoId
                ? { ...todo, completed: current.completed }
                : todo
            )
          );
        })
        .finally(() => {
          setPendingIds(prev => prev.filter(id => id !== todoId));
        });
    });
  };

  return (
    <ul className="flex flex-col gap-3">
      {optimisticTodos.map(todo => {
        const isPending = pendingIds.includes(todo.id);

        return (
          <li key={todo.id}>
            <Card
              title={todo.title}
              className="cursor-default focus:outline-none"
              style={{
                gap: "var(--spacing-gap-large, 12px)"
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center px-2 py-1 text-sm font-normal rounded-md border border-transparent bg-[color-mix(in_srgb,var(--colors-button-primary)_15%,transparent)] text-[var(--colors-text-secondary)]">
                  {todo.completed ? "Done" : "Pending"}
                </span>

                <Button
                  variant={todo.completed ? "outline" : "primary"}
                  onClick={() => handleToggle(todo.id)}
                  disabled={isPending}
                >
                  {isPending
                    ? "Saving…"
                    : todo.completed
                      ? "Mark Pending"
                      : "Mark Complete"}
                </Button>
              </div>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
