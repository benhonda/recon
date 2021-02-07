import { useEffect, useState } from "react";
import Reveal from "react-awesome-reveal";
import { useDatabase } from "../../lib/firebaseClient";
import { fadeSlideUp, fadeIn } from "../../utils/animation";

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function NewsletterBannerSection({ data = {} }) {
  const { title, desc } = data?.newsletter;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [hasSubmittedAtLeastOnce, setHasSubmittedAtLeastOnce] = useState(false);
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);

  const { updateEmailList } = useDatabase();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (validateEmail(email)) {
        await updateEmailList(email);
        setSuccessfulSubmit(true);
        setEmail("");
      } else {
        setErrorText("Please enter a valid email address.");
      }
    } catch (e) {
      console.log("error setting email in client.");
    }
    setLoading(false);
    setHasSubmittedAtLeastOnce(true);
  };

  const handleOnChange = (e) => {
    const _email = e.target.value;
    setEmail(_email);
    if ((validateEmail(_email) && errorText.length > 0) || _email.length === 0) setErrorText("");
    else if (!validateEmail(_email) && hasSubmittedAtLeastOnce) setErrorText("Please enter a valid email address.");
  };

  return (
    <div className="bg-white py-16 sm:py-24 lg:py-32">
      <div className="relative sm:py-16">
        <div aria-hidden="true" className="hidden sm:block">
          <svg className="absolute -top-8 right-1/3 -mr-3" width={404} height={392} fill="none" viewBox="0 0 404 392">
            <defs>
              <pattern id="8228f071-bcee-4ec8-905a-2a059a2cc4fb" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                <rect x={0} y={0} width={4} height={4} className="text-gray-300" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={392} fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)" />
          </svg>
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gray-100 rounded-l-3xl" />
        </div>
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="relative rounded-2xl px-6 py-10 bg-blue-500 overflow-hidden shadow-2xl sm:px-12 sm:py-20">
            <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 360">
                <path className="text-blue-600 text-opacity-40" fill="currentColor" d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z" />
                <path className="text-blue-700 text-opacity-40" fill="currentColor" d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z" />
              </svg>
            </div>
            <div className="relative">
              <div className="sm:text-center">
                <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">{title}</h2>
                <p className="mt-6 mx-auto max-w-2xl text-lg text-indigo-200">{desc}</p>
              </div>

              {successfulSubmit ? (
                <div className="mt-12 mb-8 w-full text-center text-white flex justify-center">
                  <div className="flex items-center">
                    <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                    <p className="text-xl">Thanks! We'll be in touch.</p>
                  </div>
                </div>
              ) : (
                <form className="mt-12 sm:mx-auto sm:max-w-lg sm:flex">
                  <div className="min-w-0 flex-1">
                    <label htmlFor="cta_email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="cta_email"
                      type="email"
                      className="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => handleOnChange(e)}
                    />
                    {errorText.length > 0 ? (
                      <p className="text-sm text-red-200 pt-2 flex items-center">
                        <svg className="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {errorText}
                      </p>
                    ) : (
                      <p className="text-sm text-blue-300 pt-2">We will never send you spam.</p>
                    )}
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-3">
                    <button
                      onClick={() => {
                        handleSubmit();
                      }}
                      type="button"
                      className="transition-colors block w-full rounded-md border border-transparent px-5 py-3 bg-blue-400 text-base font-medium text-white shadow hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 sm:px-8"
                    >
                      {loading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      ) : (
                        "Subscribe"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
