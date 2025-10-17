'use server';

type TogglePayload = {
  id: number;
  completed: boolean;
};

export async function toggleTodo(payload: TogglePayload): Promise<TogglePayload> {
  // Simulate latency you might see when calling a real API or database.
  await new Promise(resolve => setTimeout(resolve, 600));

  return payload;
}
