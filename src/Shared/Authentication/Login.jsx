import React, {  useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import Lottie from "lottie-react";
import swal from "sweetalert";
import log from "../../../public/login.json";
import { AuthContext } from "../Hooks/AuthProvider";
import axios from "axios";

const Login = () => {
  const { SignInUser, setUser, SignInGoogle, SignInFacebook } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("")

  const handlecheckAccount = (e) => {
    e.preventDefault();
    const form = e.target;
    const formdata = new FormData(form);
    const email = formdata.get("email");
    const password = formdata.get("password");

    SignInUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate(from, { replace: true });
        swal({
          text: "You have successfully logged in",
          icon: "success",
          button: {
            text: "Okay",
            closeModal: true,
          },
        });
      })
      .catch((error) => {
        swal({
          text: error.message,
          icon: "error",
          button: {
            text: "Okay",
            closeModal: true,
          },
        });
      });
  };

  useEffect(() => {
    document.title = "Login Page";
  }, []);

  const handleGoogleSignIn = () => {
  SignInGoogle()
    .then((res) => {
      const user = res.user;
      setUser(user);

      const userData = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        coins: 10,
        role: "Worker",
      };

      // First check if user already exists
      axios.get(`/allworkers/${user.email}`)
        .then(res => {
          if (res.data.length === 0) {
            // User doesn't exist, create new
            axios.post("/allworkers", userData)
              .then(() => {
                swal({
                  text: "You have successfully registered and earned 10 coins!",
                  icon: "success",
                  button: "Okay",
                });
                navigate(from, { replace: true });
              })
              .catch((err) => {
                console.error("Error posting to database:", err);
                swal({
                  text: "Account created but failed to save user data!",
                  icon: "warning",
                  button: "Okay",
                });
                navigate(from, { replace: true }); // fallback navigation
              });
          } else {
            // User exists
            swal({
              text: "You have successfully logged In!",
              icon: "success",
              button: "Okay",
            });
            navigate(from, { replace: true });
          }
        })
        .catch((error) => {
          console.error("Error checking user:", error);
          swal({
            text: "Something went wrong while checking your account.",
            icon: "error",
            button: "Okay",
          });
        });
    })
    .catch((error) => {
      swal({
        text: error.message,
        icon: "error",
        button: {
          text: "Okay",
          closeModal: true,
        },
      });
    });
};

  const handleFacebokSignIn = () => {
    SignInFacebook()
      .then((res) => {
        const user = res.user;
        setUser(user);
        navigate(from, { replace: true });
        swal({
          text: "You have successfully logged in",
          icon: "success",
          button: {
            text: "Okay",
            closeModal: true,
          },
        });
      })
      .catch((error) => {
        swal({
          text: error.message,
          icon: "error",
          button: {
            text: "Okay",
            closeModal: true,
          },
        });
      });
  };

  return (
    <div className="relative flex flex-col-reverse lg:grid lg:grid-cols-2 items-center min-h-screen w-full px-4 py-8 gap-10 bg-[url('https://i.ibb.co/B2TMrc8D/danil-ahmetsah-8-I0i-Fz-Sj-Nb-Y-unsplash.jpg')] bg-cover bg-center">
      {/* Background blur overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>

      {/* Form Section */}
      <div className="w-full max-w-md mx-auto relative z-10">
        <div className="rounded-2xl shadow-2xl p-[3px]">
          <div className="bg-indigo-600/25 border-2 border-white/70 backdrop-blur-sm rounded-2xl w-full">
            <div className="card-body normal-font text-white">
              <h2 className="text-center text-2xl font-bold">Login Now</h2>

              <form onSubmit={handlecheckAccount} className="space-y-4 mt-4">
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input bg-gray-200 input-bordered w-full text-black"
                    placeholder="Email"
                    name="email"
                    required
                  />
                </div>

                <div>
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input bg-gray-200 input-bordered w-full text-black"
                    placeholder="Password"
                    name="password"
                    required
                  />
                </div>

                <div className="text-sm text-right">
                  <a className="link link-hover text-blue-400">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="btn border border-gray-400 bg-indigo-900 border-indigbg-indigo-900 text-white font-semibold text-lg w-full"
                >
                  Login
                </button>
              </form>

              <p className="text-center text-sm mt-4 text-gray-300">
                Don't have an account?{" "}
                <Link className="text-blue-400 font-semibold" to="/register">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* OR Separator */}
        <p className="text-lg mt-6 text-center text-gray-300">
          ----------or----------
        </p>

        {/* Social Buttons */}
        <div className="mt-5 space-y-4 relative z-10">
          <button
            onClick={handleGoogleSignIn}
            className="btn bg-white text-black w-full flex items-center justify-center gap-3"
          >
            <FcGoogle className="text-2xl" /> Sign In With Google
          </button>

          <button
            onClick={handleFacebokSignIn}
            className="btn bg-blue-500 border-blue-500 text-white w-full flex items-center justify-center gap-3"
          >
            <ImFacebook2 className="text-2xl" /> Sign In With Facebook
          </button>
        </div>
      </div>

      {/* Animation Section */}
      <div className="w-full mt-10 lg:mt-none flex justify-center items-center relative z-10">
        <Lottie
          className="w-72 sm:w-96 md:w-[28rem] lg:w-[32rem]"
          animationData={log}
          loop={true}
        />
      </div>
    </div>
  );
};

export default Login;
