import { useParams, Link, useNavigate } from "react-router-dom";
import todos from "./todos-data";

export default function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const todo = todos.find((t) => t.id === parseInt(id));

  if (!todo) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold mb-2">Todo Not Found</h2>
        <Link to="/todos" className="text-purple-600 underline">Back to Todos</Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto mt-10 rounded bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-4">{todo.title}</h2>
      <p className="mb-2">
        <span className="font-semibold">Completed:</span>{" "}
        {todo.completed ? "✅ Yes" : "❌ No"}
      </p>
      <p className="mb-4">
        <span className="font-semibold">Todo ID:</span> {todo.id}
      </p>
      <Link to="/todos" className="inline-block px-4 py-2 bg-purple-600 text-white rounded">← Back to List</Link>
    </div>
  );
}
