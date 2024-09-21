import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d1016] text-white">
      <div className="text-center p-8 max-w-lg bg-[#1a1f26] rounded-lg shadow-lg border border-gray-700">
        <h1 className="text-8xl font-extrabold text-[#87CEFA] mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          Oops ! It seems the page you are looking for does not exist. You will
          be redirected to the homepage in 5 seconds.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-[#87CEFA] hover:bg-[#66b0df] text-white font-medium rounded-lg shadow-lg transform transition-transform hover:-translate-y-1"
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFound;
