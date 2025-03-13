import  { useState } from "react";
import { NavLink } from "react-router-dom";

import { useDispatch } from "react-redux";


import { signup } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const SigninPage = () => {
  console.log("data here 1")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("Form Data Submitted:", formData);
    
  //   // Extract values from formData
  //   const { name, email, password } = formData;
  
  //   await dispatch(signup({ name, email, password }));
  //   navigate("/profile");
  // };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Data:", formData); // Debugging
  
    try {
      await dispatch(signup(formData)).unwrap();
      console.log("Signup Success");
      navigate("/profile");
    } catch (error) {
      console.error("Signup Failed:", error);
    }
  };
  
  return (
    <div className="h-[50rem] flex items-center justify-center bg-gray-100">
      <div className="bg-white flex shadow-lg rounded-lg overflow-hidden w-3/5">
        
        {/* Left Side - Testimonial */}
        <div className="w-1/2 bg-gray-200 flex flex-col justify-center relative">
          <img 
            src="https://images.unsplash.com/flagged/photo-1555475693-6e207bee0737?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Testimonial" 
          />
          <div className="absolute p-5 text-[var(--text-color-2)]">
            <p className="text-sm font-semibold">
              "We've been using Untitled to kick-start every new project and can't imagine working without it."
            </p>
            <div className="mt-6">
              <p className="font-bold">Olivia Rhye</p>
              <p className="text-sm">Lead Designer, Layers</p>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
          <p className="text-gray-600 text-sm mb-4">Let's get started with your 30-day free trial.</p>
          
          <form onSubmit={handleSubmit} >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mb-3"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mb-3"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mb-3"
            />
            <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800">
              Create account
            </button>
          </form>

          <button className="w-full flex items-center justify-center border mt-3 py-3 rounded-lg font-semibold hover:bg-gray-200">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign up with Google
          </button>

          <p className="text-gray-600 text-sm text-center mt-4">
            Already have an account? <NavLink to='/login' className="text-blue-600">Login</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
