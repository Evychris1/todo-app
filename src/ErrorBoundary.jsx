import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center">
          <h2 className="text-2xl font-bold text-red-600">Something went wrong ❌</h2>
          <p className="text-gray-600">{this.state.error?.message}</p>
          <button
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
            onClick={() => window.location.href = '/todos'}
          >
            Go Back to Todos
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
