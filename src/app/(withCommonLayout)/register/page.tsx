"use client";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

import TechForm from "@/components/form/TechForm/TechForm";
import { TechInput } from "@/components/form/TechInput/TechInput";
import Loading from "@/utils/loading";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/redux/feature/auth/authApi";
import { loginValidationSchema } from "@/schema/login.schema";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import { setUser } from "@/redux/feature/auth/authSlice";
import uploadImageToCloudinary from "@/utils/uploadImage";
import { Button } from "@heroui/button";

const Register = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | "">("");
  const [handleUserRegistration] = useRegisterMutation();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setImageUploadLoading(true);

    try {
      const files = await uploadImageToCloudinary(e.target.files);

      if (files && files.length > 0) {
        setProfileImage(files);
      }
    } catch (error: any) {
      toast.error("Error uploading image:", error);
    } finally {
      setImageUploadLoading(false);
    }
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      profileImg: profileImage,
    };

    handleUserRegistration(userData);
  };

  const handleNavigateToLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <div className="py-8">
        <div className="bg-[#F9F9F9] p-7">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-3xl lg:text-4xl font-semibold text-center md:text-left">
              My Account
            </h1>
          </div>
        </div>
        <div className="py-12 px-4 sm:px-8 lg:px-12">
          <div className="mt-8 md:mt-16 w-full max-w-lg mx-auto text-center">
            <h2 className="mb-3 text-xl sm:text-2xl font-semibold">
              Please Register
            </h2>
            <p className="mb-6 text-md sm:text-lg">
              If you already have an account, please log in to continue.
            </p>
          </div>

          <div className="flex border flex-col items-center justify-center w-full max-w-lg bg-[#F9F9F9] mx-auto mt-5 p-6 rounded-lg mb-10">
            <TechForm
              // resolver={zodResolver(loginValidationSchema)}
              onSubmit={onSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4 ">
                  <TechInput
                    label="Email"
                    name="email"
                    radius="none"
                    size="lg"
                    type="email"
                    variant="bordered"
                  />
                </div>

                <div className="mb-4 ">
                  <TechInput
                    endContent={
                      <button
                        aria-label="toggle password visibility"
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    label="Password"
                    name="password"
                    radius="none"
                    size="lg"
                    type={isVisible ? "text" : "password"}
                    variant="bordered"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <TechInput
                    label="Address"
                    name="address"
                    radius="none"
                    size="md"
                    type="text"
                    variant="bordered"
                  />
                </div>
                <div className="mb-4">
                  <TechInput
                    label="Name"
                    name="name"
                    radius="none"
                    size="md"
                    type="text"
                    variant="bordered"
                  />
                </div>
              </div>
              <div className="mb-4 w-full">
                <label
                  className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                  htmlFor="image"
                >
                  Upload image
                </label>
                <input
                  className="hidden"
                  id="image"
                  type="file"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>

              <Button
                className="w-full py-2 text-white mt-4 bg-[#4E7776] font-semibold"
                disabled={imageUploadLoading}
                // isLoading={isPending}
                radius="none"
                type="submit"
                variant="bordered"
                onClick={handleNavigateToLogin}
              >
                Register
              </Button>
            </TechForm>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Dont have an account?
                <Link
                  className="text-red-700 hover:underline ml-1"
                  href="/register"
                >
                  Create one here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
