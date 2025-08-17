import React, { useContext, useEffect, useState } from "react";
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
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const API_KEY = "80b9fa56bab2917fb9bc7ff431a08768";

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    setImageFile(image);
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    const Name = e.target.Name.value;
    const Email = e.target.Email.value;
    const password = e.target.Password.value;
    const acoountType = e.target.acoountType.value;

    if (!imageFile) {
      swal({ text: "Please upload a profile picture!", icon: "warning" });
      return;
    }

    try {
      setUploading(true);

      // !Upload image to imgbb
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        formData
      );

      // const imgData = await res.json();
      // if (!imgData.success) throw new Error("Image upload failed");

      const photoURL = res.data.data.display_url;

      // Create user in Firebase
      const result = await createUser(Email, password);
      const user = result.user;

      await updateProfile(user, {
        displayName: Name,
        photoURL: photoURL,
      });

      setUser({ ...user, displayName: Name, photoURL: photoURL });

      // prepare user data for DB
      const userData = {
        name: Name,
        profession: "",
        email: Email,
        image: photoURL,
        coins: acoountType === "Worker" ? 10 : 50,
        about: "",
        role: acoountType === "Worker" ? "worker" : "buyer",
      };

      if (acoountType === "Worker") {
        await axios.post("http://localhost:3000/allworkers", userData);
        swal({
          text: "You have successfully registered and earned 10 coins!",
          icon: "success",
          button: "Okay",
        });
      } else {
        await axios.post("http://localhost:3000/allbuyers", userData);
        swal({
          text: "You have successfully registered and earned 50 coins!",
          icon: "success",
          button: "Okay",
        });
      }

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      swal({ text: err.message, icon: "error", button: "Okay" });
    } finally {
      setUploading(false);
    }
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
                <label className="label text-white">Your Profile</label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleImageUpload}
                  required
                  placeholder="Your Profile"
                  className="input bg-gray-200 text-black w-full"
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
