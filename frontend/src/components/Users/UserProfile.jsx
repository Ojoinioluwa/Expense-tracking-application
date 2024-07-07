import React, { useState } from "react";
import { FaUserCircle, FaEnvelope, FaLock } from "react-icons/fa";
import UpdatePassword from "./UpdatePassword";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfileAPI } from "../../services/users/userServices";
import { getUserInfoFromStorage } from "../../utils/getUserInfoFromStorage";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid Email"),
  username: Yup.string().min(2, "username must be at least 2 characters long"),
  password: Yup.string().min(5, "Password must be at least 5 characters long"),
});
const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const userInfo = getUserInfoFromStorage();
  console.log(userInfo);
  // dispatch
  const dispatch = useDispatch();
  // navigate
  const navigate = useNavigate();
  const { mutateAsync, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: updateProfileAPI,
    mutationKey: ["Update-profile"],
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values).then((data) => {
        // dispatch(logoutAction());
        // // remove items from local storage
        // localStorage.removeItem("userInfo");
        // navigate("/login");
        console.log(data);
      });
    },
  });
  return (
    <>
      <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
        <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg">
          <h1 className="mb-2 text-2xl text-center font-extrabold">
            Welcome {userInfo.username}
            <span className="text-gray-500 text-sm ml-2">{userInfo.email}</span>
          </h1>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          User Profile
        </h2>
        {/* Display error messages */}
        {isPending && <AlertMessage type="loading" message="Updating you in" />}
        {error && (
          <AlertMessage
            type="error"
            message={error?.response?.data?.message || "An error occurred"}
          />
        )}
        {isSuccess && (
          <AlertMessage type="success" message="Profile Update successful" />
        )}

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          {/* User Name Field */}
          <div className="flex items-center space-x-4">
            <FaUserCircle className="text-3xl text-gray-400" />
            <div className="flex-1">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                {...formik.getFieldProps("username")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your username"
              />
            </div>
          </div>
          {formik.touched.username && formik.errors.username && (
            <span className="text-xs text-red-500">
              {formik.errors.username}
            </span>
          )}

          {/* Email Field */}
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-3xl text-gray-400" />
            <div className="flex-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...formik.getFieldProps("email")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your email"
              />
            </div>
          </div>
          {formik.touched.email && formik.errors.email && (
            <span className="text-xs text-red-500">{formik.errors.email}</span>
          )}

          {/* Save Changes Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <UpdatePassword />
    </>
  );
};

export default UserProfile;
