import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "../components/admin/textfield";
import { useUser } from "../context/userContext";
import { useAuth } from "../lib/firebaseClient";

export default function Login() {
  const [signInLoading, setSignInLoading] = useState();
  const { handleSubmit, errors, control } = useForm();
  const { loadingUser, user } = useUser();
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loadingUser) {
      // You know that the user is loaded: either logged in or out!
      if (user) router.push("/admin");
    }
  }, [loadingUser, user]);

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-white py-2 px-2">
        <p className="text-sm">Please wait...</p>
      </div>
    );
  }

  const logMeIn = async ({ email, password }) => {
    setSignInLoading(true);
    await login({ email, password });
    setSignInLoading(false);
  };

  return (
    <>
      <div className="relative pt-6 pb-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
            <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <Link href="/">
                  <a className="hover:opacity-80 transition-opacity">
                    <img src="/recon-transparent-icon.png" className="w-8" alt="ReCon Admin Login" />
                  </a>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="bg-gray-50 min-h-screen flex flex-col sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">Sign in to your account</h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(logMeIn)}>
              <TextField control={control} name="email" required errorText={errors.email && "This field is required"} label="Email" placeholder="email@example.com" type="email" />
              <TextField control={control} name="password" required errorText={errors.password && "This field is required"} label="Password" placeholder="Password" type="password" />

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {signInLoading ? (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
