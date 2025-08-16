import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { updateProfile } from "firebase/auth";
import swal from "sweetalert";
import Lottie from "lottie-react";
import regis from "../../../public/register.json";
import { AuthContext } from "../Hooks/AuthProvider";
import axios from "axios";

const Register = () => {
  const { createUser, setUser, SignInGoogle, SignInFacebook } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleCreateAccount = (e) => {
    e.preventDefault();
    const Name = e.target.Name.value;
    const photo = e.target.photo.value;
    const Email = e.target.Email.value;
    const password = e.target.Password.value;
    const acoountType = e.target.acoountType.value;

    createUser(Email, password)
      .then((result) => {
        const user = result.user;
        updateProfile(user, {
          displayName: Name,
          photoURL: photo,
        }).then(() => {
          setUser({ ...user, displayName: Name, photoURL: photo });

          const userData = {
            name: Name,
            profession: "",
            email: Email,
            image: photo,
            coins: acoountType === "Worker" ? 10 : 50,
            about: "",
            role: acoountType === "Worker" ? "worker" : "buyer",
          };

          if (acoountType === "Worker") {
            axios
              .post("https://micronomy.vercel.app/allworkers", userData)
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
              });
          }
          else {
            axios
              .post("https://micronomy.vercel.app/allbuyers", userData)
              .then(() => {
                swal({
                  text: "You have successfully registered and earned 50 coins!",
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
              });
          }
        });
      })
      .catch((err) => {
        swal({ text: err.message, icon: "error", button: "Okay" });
      });
  };

  const handleGoogleSignIn = () => {
    SignInGoogle()
      .then((res) => {
        setUser(res.user);
        navigate(from, { replace: true });
        swal({
          text: "You have successfully signed in",
          icon: "success",
          button: "Okay",
        });
      })
      .catch((err) => {
        swal({ text: err.message, icon: "error", button: "Okay" });
      });
  };

  const handleFacebookSignIn = () => {
    SignInFacebook()
      .then((res) => {
        setUser(res.user);
        navigate(from, { replace: true });
        swal({
          text: "You have successfully signed in",
          icon: "success",
          button: "Okay",
        });
      })
      .catch((err) => {
        swal({ text: err.message, icon: "error", button: "Okay" });
      });
  };

  useEffect(() => {
    document.title = "Register Page";
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col-reverse lg:grid lg:grid-cols-5 bg-cover bg-center bg-[url('https://i.ibb.co/67cNd7Vy/image.png')]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>

      <div className="min-h-screen mt-5 lg:mt-32 px-4 py-0 lg:py-8 flex flex-col justify-center items-center lg:col-span-3 z-10">
        <div className="w-full max-w-md md:max-w-lg rounded-2xl shadow-3xl p-[3px]">
          <div className="bg-indigo-600/25 border-2 border-white/70 backdrop-blur-sm rounded-2xl p-6">
            <h2 className="text-center text-xl sm:text-2xl font-bold text-white">
              Register Now
            </h2>
            <form onSubmit={handleCreateAccount} className="space-y-4 mt-4">
              <div>
                <label className="label text-white">Your Name</label>
                <input
                  type="text"
                  name="Name"
                  required
                  placeholder="Name"
                  className="input bg-gray-200 text-black input-bordered w-full"
                />
              </div>
              <div>
                <label className="label text-white">Account Type</label>
                <select
                  name="acoountType"
                  required
                  defaultValue="Worker"
                  className="input bg-gray-200 text-black input-bordered w-full"
                >
                  <option value="Worker">Worker</option>
                  <option value="Buyer">Buyer</option>
                </select>
              </div>
              <div>
                <label className="label text-white">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  required
                  placeholder="Photo URL"
                  className="input bg-gray-200 text-black input-bordered w-full"
                />
              </div>
              <div>
                <label className="label text-white">Email</label>
                <input
                  type="Email"
                  name="Email"
                  required
                  placeholder="Email"
                  className="input bg-gray-200 text-black input-bordered w-full"
                />
              </div>
              <div>
                <label className="label text-white">Password</label>
                <input
                  type="password"
                  name="Password"
                  required
                  placeholder="Password"
                  minLength="8"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least 8 characters including an uppercase letter, a lowercase letter, and a number"
                  className="input bg-gray-200 text-black input-bordered w-full"
                />
              </div>
              <button
                type="submit"
                className="btn bg-indigo-900 border-indbg-900 text-white font-semibold text-lg w-full mt-2"
              >
                Register
              </button>
            </form>
            <p className="text-center text-sm mt-4 text-white">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-300">
                Login
              </Link>
            </p>
          </div>
        </div>

        <p className="text-lg mt-6 text-center text-gray-300">
          ----------or----------
        </p>

        <div className="w-full max-w-md md:max-w-lg mt-4 z-10 space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="btn bg-white text-black w-full flex items-center justify-center gap-3"
          >
            <FcGoogle className="text-2xl" /> Sign In With Google
          </button>

          <button
            onClick={handleFacebookSignIn}
            className="btn bg-blue-500 border-blue-500 text-white w-full flex items-center justify-center gap-3"
          >
            <ImFacebook2 className="text-2xl" /> Sign In With Facebook
          </button>
        </div>
      </div>

      <div className="w-full mt-10 md:mt-0 h-full flex justify-center items-center p-4 lg:col-span-2">
        <Lottie
          className="w-full max-w-md md:max-w-lg lg:max-w-full"
          animationData={regis}
          loop
        />
      </div>
    </div>
  );
};

export default Register;
