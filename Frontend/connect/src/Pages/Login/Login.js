import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../app/feature/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, isLoggedIn, authError } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && isLoggedIn) {
      navigate("/");
    }
  }, [token, isLoggedIn, navigate]);

  const submitLoginFormData = () => {
    if (email && password) {
      dispatch(loginUser({ email, password }));
    }
  };

  const loginCredentialsHandler = () => {
    setEmail("ns9417411@gmail.com");
    setPassword("nileshh");
    dispatch(loginUser({ email: "ns941741@gmail.com", password: "nilesh" }));
  };

  return (
    <main className="min-h-screen bg-white sm:bg-gray-100 max-w-full flex flex-col lg:flex-row">
      <div className="lg:w-2/5 bg-white flex items-center justify-center md:py-6 lg:py-0"></div>
      <div className="flex items-center justify-center w-full lg:w-3/5 sm:py-12 lg:py-0">
        <div className="bg-white w-[350px] sm:w-[450px] h-auto px-6 py-8 sm:py-16 rounded-lg">
          <div className="sm:w-10/12 mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center pb-8 sm:pb-12">
              Sign in to Circle
            </h2>
            <form
              className="flex flex-col space-y-5"
              onSubmit={e => e.preventDefault()}
            >
              {authError && <div className="text-red-500">{authError}</div>}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="border border-gray-300 w-full p-2 rounded-[4px]"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="border border-gray-300 w-full p-2 rounded-[4px]"
              />
              <button
                className="w-full bg-colorgray-800 hover:bg-opacity-95 text-white rounded-full py-2"
                onClick={submitLoginFormData}
              >
                Sign in
              </button>
            </form>
            <div
              className="text-center mt-4 text-colorblue-100 underline cursor-pointer"
              onClick={loginCredentialsHandler}
            >
              Use test credentials
            </div>
            <h4 className="text-center pt-8 text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-colorblue-100 hover:underline cursor-pointer"
              >
                Sign up
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
