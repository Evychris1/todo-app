import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2">Sorry, the page you visited does not exist.</p>
      <Link
        to="/todos"
        className="inline-block mt-4 px-4 py-2 bg-purple-600 text-white rounded"
      >
        Go Back to Todos
      </Link>
    </div>
  );
}

export default NotFound;
