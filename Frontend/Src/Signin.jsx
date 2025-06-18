import React, { useState, useEffect } from "react";
import axios from "axios";

const Signin = () => {
  useEffect(() => {
    const firsttime = async () => {
      try {
        const url = "http://localhost:8080/signup";
        await axios.post(url, {});
        console.log("Admin user created");
      } catch (error) {
        console.error("Error creating admin user", error);
      }
    };
    firsttime();
  }, []);

  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleCheckbox = (e) => {
    setRemember(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/login";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      localStorage.setItem("userName", res.username);
      localStorage.setItem("userEmail", res.email);

      switch (res.role) {
        case "admin":
          window.location = "/admin";
          break;
        case "teacher":
          window.location = "/teacher";
          break;
        case "student":
          window.location = "/";
          break;
        default:
          window.location = "/";
          break;
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError("Invalid Credentials.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-500 p-4">
      <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl w-full max-w-5xl overflow-hidden">
        <div className="bg-gradient-to-b from-indigo-500 to-blue-500 text-white flex-1 p-10 relative flex flex-col justify-center items-center">
          <div className="absolute top-4 left-4 flex items-center gap-2 text-lg font-bold">
            <i className="fa fa-graduation-cap"></i>
            <span>Learnify</span>
          </div>
          <div className="rounded-full bg-indigo-600 p-8 w-64 h-64 flex items-center justify-center">
            <img
              src="../Images/LMS-User.jpg"
              alt="Illustration"
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
        </div>

        <div className="flex-1 p-10 flex flex-col justify-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto flex items-center justify-center text-gray-400 text-4xl mb-8">
            <i className="fa fa-user"></i>
          </div>
          <form
            className="w-full max-w-sm mx-auto flex flex-col gap-5"
            onSubmit={handleSubmit}
          >
            {error && (
              <div className="bg-red-500 text-white text-center py-3 px-4 rounded-md text-sm">
                {error}
              </div>
            )}
            <div className="relative">
              <input
                type="text"
                name="username"
                value={data.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full bg-gray-100 rounded-full py-3 px-5 text-sm text-gray-700 placeholder:uppercase placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <i className="fa fa-user absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base"></i>
            </div>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-gray-100 rounded-full py-3 px-5 text-sm text-gray-700 placeholder:uppercase placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <i className="fa fa-lock absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base"></i>
            </div>
            <div className="flex justify-between text-xs text-gray-400 items-center">
              <label className="flex items-center gap-2 text-black text-[0.7rem]">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={handleCheckbox}
                  className="w-3.5 h-3.5"
                />
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-blue-500 text-white rounded-full py-3 font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              Sign In
            </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-6">
            Don't have an account?{' '}
            <a href="/signup" className="text-pink-500 font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;