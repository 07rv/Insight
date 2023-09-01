import { useState } from "react";
import { useRouter } from "next/router";

const VerifyEmail = () => {
  const [showMsg, setShowMsg] = useState("");
  const router = useRouter();
  const { token } = router.query;
  const verifiyEmailButton = async () => {
    await fetch("/api/auth/verifyemail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 1) {
          setShowMsg(true);
          const timer = setTimeout(() => {
            setShowMsg(false);
          }, 3000);
        } else {
        }
      });
  };
  return (
    <div className="mx-auto flex flex-col items-center justify-center px-6 py-8">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-3">
          <img
            className="m-auto rounded-t-lg h-32"
            src="/img/account.png"
            alt=""
          />
        </div>

        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Email Verification
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Unlock our blog's full potential! Verify your email by clicking the
            'Verify' button – it's quick, easy, and ensures a secure experience.
          </p>
          <button
            onClick={verifiyEmailButton}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Verify
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
          {showMsg && (
            <div
              className="mt-4 flex items-center p-2 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800 text-center"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 mr-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>

              <div>
                {" "}
                <span className="font-medium">Email Verified!</span> Now you can
                login
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
