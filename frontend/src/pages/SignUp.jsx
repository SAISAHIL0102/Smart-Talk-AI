import React, { useContext, useState } from 'react';
import bg from "../assets/authBg.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from "axios";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      );
      setUserData(result.data);
      setLoading(false);
      navigate("/customize");
    } catch (error) {
      console.error(error);
      setUserData(null);
      setLoading(false);
      setErr(error.response?.data?.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div 
      className="w-full h-[100vh] bg-cover flex justify-start items-center pl-8 md:pl-20" 
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form 
        className="rounded-lg bg-[#00000062] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-5 px-10 py-10" 
        onSubmit={handleSignUp}
      >
        <h1 className="text-white text-[30px] font-semibold mb-8">
          Register to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        <input 
          type="text" 
          placeholder="Enter your Name" 
          aria-label="Name"
          className="w-full h-[60px] outline-none border-2 border-white/50 bg-transparent text-white placeholder-gray-300 px-5 py-2 rounded text-lg focus:border-purple-500 transition-all duration-300" 
          required 
          onChange={(e) => setName(e.target.value)} 
          value={name} 
          disabled={loading}
        />

        <input 
          type="email" 
          placeholder="Email" 
          aria-label="Email"
          className="w-full h-[60px] outline-none border-2 border-white/50 bg-transparent text-white placeholder-gray-300 px-5 py-2 rounded text-lg focus:border-purple-500 transition-all duration-300" 
          required 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
          disabled={loading}
        />

        <div className="w-full h-[60px] bg-transparent text-white rounded-full text-lg relative">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password"
            aria-label="Password"
            autoComplete="new-password"
            className="w-full h-full rounded outline-none bg-transparent placeholder-gray-300 px-5 py-2 border-2 border-white/50 focus:border-purple-500 transition-all duration-300" 
            required 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            disabled={loading}
          />
          {!showPassword ? (
            <IoEye 
              className="absolute top-4 right-5 w-6 h-6 text-white cursor-pointer" 
              onClick={() => setShowPassword(true)} 
            />
          ) : (
            <IoEyeOff 
              className="absolute top-4 right-5 w-6 h-6 text-white cursor-pointer" 
              onClick={() => setShowPassword(false)} 
            />
          )}
        </div>

        {err && (
          <p className="text-red-500 text-base">*{err}</p>
        )}

        <button 
          type="submit"
          className="min-w-[150px] h-[60px] mt-8 text-black font-semibold bg-white rounded-full text-lg transition-all hover:bg-gray-200 disabled:opacity-70 disabled:cursor-not-allowed" 
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        <p 
          className="text-white text-lg cursor-pointer mt-4" 
          onClick={() => navigate("/signin")}
        >
          Already have an account? <span className="text-blue-400">Sign In</span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
