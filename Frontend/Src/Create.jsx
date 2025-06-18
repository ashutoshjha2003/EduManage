import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/login";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.token); // assuming backend sends token
      localStorage.setItem("userName", res.userName); // optional
      navigate("/dashboard"); // redirect after login
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
        {/* Left Content */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Sign In</h1>
          <p className="text-gray-600 text-sm mb-6">
            Join me<br />
            Unlock a world of knowledge and possibilities. Sign in now to
            access exclusive educational resources, interactive courses, and
            personalized learning experiences.
          </p>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-1 w-10 bg-blue-600 rounded"></div>
            <div className="h-1 w-5 bg-purple-400 rounded"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                maxLength="256"
                required
                placeholder="johndoe.banking@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={data.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                maxLength="256"
                required
                placeholder="********"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={data.password}
                onChange={handleChange}
              />
            </div>

            {error && (
              <div className="w-full p-3 text-sm bg-red-500 text-white rounded-md text-center">
                {error}
              </div>
            )}

            <div>
              <input
                type="submit"
                value="Sign In"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer transition duration-200"
              />
            </div>
          </form>

          <p className="text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Right Image Section */}
        <div className="w-full md:w-1/2 bg-gray-50 p-6 flex items-center justify-center">
          <img
            src="https://assets-global.website-files.com/6649d9640e151c6ff17d76fc/664d0bfd96738d31ce7eb424_SVG_Euh8sJe.svg"
            alt="Illustration"
            className="w-80 h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;