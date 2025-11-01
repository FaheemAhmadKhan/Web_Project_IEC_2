import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#111217] text-white p-8">
          <div className="bg-[#1A1B1F] border border-red-500 rounded-2xl shadow-lg max-w-2xl w-full p-8 text-center">
            <h1 className="text-3xl font-bold text-[#FFD24A] mb-4">
              Something went wrong 😢
            </h1>
            <pre className="bg-[#2A2B31] text-red-400 text-left rounded-lg p-4 overflow-auto text-sm mb-6">
              {this.state.error?.toString()}
            </pre>
            <button
              onClick={this.handleReload}
              className="px-6 py-3 bg-[#FFD24A] text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
