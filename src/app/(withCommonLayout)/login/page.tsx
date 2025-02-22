"use client";
import Link from "next/link";
import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import TechForm from "@/components/form/TechForm/TechForm";
import { TechInput } from "@/components/form/TechInput/TechInput";
import Loading from "@/utils/loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/redux/feature/auth/authApi";
import { loginValidationSchema } from "@/schema/login.schema";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import { setUser } from "@/redux/feature/auth/authSlice";
import { getToken } from "@/utils/seetCookie";

const Login = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await loginUser(data).unwrap();

    if (res.error) {
      toast.error(res?.message, { duration: 2000 });
    } else {
      toast.success(res?.message, { duration: 2000 });
    }
    const token = res.data?.accessToken;
    const decoded = verifyToken(token);

    await getToken(token);

    dispatch(
      setUser({
        token: res.data?.accessToken,
        user: decoded,
      })
    );

    router.push("/");
    window.location.reload();
  };

  return (
    <>
      {isLoading && <Loading />}
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
            <h2 className="mb-3 text-xl sm:text-2xl font-semibold">Log In</h2>
            <p className="mb-6 text-md sm:text-lg">
              Login if you are a returning customer.
            </p>
          </div>

          <div className="flex border flex-col items-center justify-center w-full max-w-lg bg-[#F9F9F9] mx-auto mt-5 p-6 rounded-lg mb-10">
            <TechForm
              resolver={zodResolver(loginValidationSchema)}
              onSubmit={onSubmit}
            >
              <div className="mb-4 w-full sm:w-[300px] md:w-[400px]">
                <TechInput
                  label="Email"
                  name="email"
                  radius="none"
                  size="lg"
                  type="email"
                  variant="bordered"
                />
              </div>

              <div className="mb-4 w-full sm:w-[300px] md:w-[400px]">
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
              <button
                className="w-full py-2 text-white mt-4  bg-[#4E7776] font-semibold rounded-lg  transition-colors"
                type="submit"
              >
                Login
              </button>
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

export default Login;
