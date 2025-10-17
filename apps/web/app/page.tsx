import { TodoList } from "./todo-list";

import { Text } from "@repo/ui/text";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load todos");
  }

  return response.json();
}

async function TodoListLoader() {
  const todos = await fetchTodos();
  return <TodoList initialTodos={todos} />;
}

export default function TodoPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-6">
      <header className="flex flex-col gap-2">
        <Text as="h1" variant="title" className="font-medium">
          My Todos
        </Text>
        <Text variant="body" className="text-[var(--colors-text-secondary)]">
          This sample app consumes JSONPlaceholder and uses the shared design
          system components.
        </Text>
      </header>

      {/* <Suspense fallback={<TodoListSkeleton />}> */}
      <TodoListLoader />
      {/* </Suspense> */}
    </main>
  );
}
