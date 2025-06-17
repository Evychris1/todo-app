import { Routes, Route } from "react-router-dom";
import Todos from "./Todos";
import TodoDetail from "./TodoDetail";
import NotFound from "./NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Todos />} />
      <Route path="/todos" element={<Todos />} />
      <Route path="/todos/:id" element={<TodoDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
