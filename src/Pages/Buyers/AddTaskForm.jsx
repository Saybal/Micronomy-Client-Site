import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Shared/Hooks/AuthProvider";
import { useTheme } from "../../Shared/Hooks/useTheme";
import AxiosToken from "../../Shared/Hooks/AxiosToken";

const AddTaskForm = () => {
  const { user } = use(AuthContext);
  const [availableCoins, setAvailableCoins] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const currentTheme = useTheme();
  const axiosInstance = AxiosToken();

  useEffect(() => {
    axiosInstance
      .get(`/allbuyers/${user.email}`)
      .then((res) => {
        if (res.data) {
          setAvailableCoins(res.data[0].coins);
          setLoader(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching coins:", err);
        setLoader(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to fetch available coins!",
        });
      });
  }, []);
  // console.log("Available coins:", availableCoins);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const form = new FormData();
    form.append("image", image);

    const API_KEY = "80b9fa56bab2917fb9bc7ff431a08768"; // Replace with your real key

    try {
      setLoading(true);
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        form
      );
      const imageUrl = res.data.data.display_url;
      setValue("task_image_url", imageUrl); // Set to hook form field
      Swal.fire("Uploaded!", "Image uploaded successfully!", "success");
    } catch (error) {
      console.error("Image upload failed", error);
      Swal.fire("Upload Failed", "Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const requiredWorkers = parseInt(data.required_workers);
    const payableAmount = parseFloat(data.payable_amount);

    const totalPayable = requiredWorkers * payableAmount;

    if (totalPayable > availableCoins) {
      Swal.fire(
        "Not Enough Coins",
        "Purchase more coins to post this task.",
        "warning"
      );
      window.location.href = "purchase-coin";

      return;
    }

    const taskData = {
      ...data,
      required_workers: requiredWorkers,
      payable_amount: payableAmount,
      total_payable: totalPayable,
      buyer_email: user.email,
      posted_at: new Date(),
    };

    try {
      await axiosInstance.post("/addtask", taskData);

      const updatedCoins = availableCoins - totalPayable;
      // console.log("Updated coins:", updatedCoins);

      await axiosInstance.patch(`/allbuyers/${user.email}`, {
        coins: Math.max(updatedCoins, 0),
      });

      Swal.fire("Success", "Task added successfully!", "success");
      navigate("/dashboard/my-posted-tasks");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not add task. Try again.", "error");
    }
  };

  return (
    <div>
      {loader ? (
        <h1>loading</h1>
      ) : (
        <div className={`max-w-4xl mx-auto p-6 ${currentTheme === 'acid' ? "bg-white" : "bg-gray-700"}  rounded-xl shadow`}>
          <h2 className={`${currentTheme === 'acid' ? "text-black" : "text-white"} text-2xl font-bold mb-6 text-center`}>
            Post a New Task
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              placeholder="Task Title"
              className="input input-bordered w-full"
              {...register("task_title", { required: true })}
            />
            {errors.task_title && (
              <p className="text-red-500">Task title is required</p>
            )}

            <textarea
              rows="4"
              placeholder="Task Detail"
              className="textarea textarea-bordered w-full"
              {...register("task_detail", { required: true })}
            />
            {errors.task_detail && (
              <p className="text-red-500">Task detail is required</p>
            )}

            <input
              type="number"
              placeholder="Required Workers"
              className="input input-bordered w-full"
              {...register("required_workers", { required: true, min: 1 })}
            />
            {errors.required_workers && (
              <p className="text-red-500">Enter a valid number</p>
            )}

            <input
              type="number"
              placeholder="Payable Amount (per worker)"
              className="input input-bordered w-full"
              {...register("payable_amount", { required: true, min: 1 })}
            />
            {errors.payable_amount && (
              <p className="text-red-500">Enter a valid amount</p>
            )}

            <input
              type="date"
              className="input input-bordered w-full"
              {...register("completion_date", { required: true })}
            />
            {errors.completion_date && (
              <p className="text-red-500">Completion date is required</p>
            )}

            <input
              type="text"
              placeholder="Submission Info (e.g., screenshot)"
              className="input input-bordered w-full"
              {...register("submission_info", { required: true })}
            />
            {errors.submission_info && (
              <p className="text-red-500">Submission info required</p>
            )}

            <input
              type="file"
              className="file-input w-full"
              onChange={handleImageUpload}
            />
            {loading && <p className="text-blue-500">Uploading image...</p>}

            <input type="hidden" {...register("task_image_url")} />

            <button
              type="submit"
              className={`btn bg-indigo-400 text-white w-full font-bold mt-4`}
              disabled={loading}
            >
              Add Task
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
