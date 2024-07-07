import React, { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changePasswordAPI } from "../../services/users/userServices";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("password required"),
});

const UpdatePassword = () => {
  // dispatch
  const dispatch = useDispatch();
  // navigate
  const navigate = useNavigate();
  const { mutateAsync, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: changePasswordAPI,
    mutationKey: ["Change-password"],
  });
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    // validations
    validationSchema,
    // submit
    onSubmit: (values) => {
      mutateAsync(values.password).then((data) => {
        dispatch(logoutAction());
        // remove items from local storage
        localStorage.removeItem("userInfo");
        navigate("/login");
      });
    },
  });
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-lg font-semibold mb-4">Change your password</h2>
      {/* Display state */}
      {isPending && <AlertMessage type="loading" message="UPdating you in" />}
      {error && (
        <AlertMessage
          type="error"
          message={error?.response?.data?.message || "An error occurred"}
        />
      )}
      {isSuccess && (
        <AlertMessage type="success" message="changed password successful" />
      )}
      <form onSubmit={formik.handleSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="new-password">
            New Password
          </label>
          <div className="flex items-center space-x-4">
            <AiOutlineLock className="text-3xl text-gray-400" />
            <input
              id="new-password"
              type="password"
              name="newPassword"
              className="items-center border-2 py-2 px-4 rounded w-full"
              placeholder="Enter new Password"
              {...formik.getFieldProps("password")}
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <span className="text-xs text-red-500">
              {formik.errors.password}
            </span>
          )}
          <div className="flex border-1 py-2 px-3 mt-1 ml-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
              Update Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
