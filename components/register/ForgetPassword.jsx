import { useState } from "react";

const ForgetPassword = ({ open, setOpen }) => {
  const [inputField, setInputField] = useState({
    email: "",
  });
  const [errorField, setErrorField] = useState({
    email: "",
  });
  const [show, setShow] = useState(false);
  const inputHandler = (name, value) => {
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorField((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };
  const setErrorMessage = (name, value) => {
    setErrorField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const checkAndSetValidationsErrors = () => {
    var hasError = false;
    Object.keys(inputField).map((field) => {
      if (field === "email") {
        if (inputField[field] === "") {
          hasError = true;
          setErrorMessage(field, "Please enter emailId");
        }
      }
    });
    return hasError;
  };
  const submitButton = async () => {
    if (!checkAndSetValidationsErrors()) {
      await fetch("/api/auth/sendemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          EmailId: inputField.email,
          Type: "ForgetPassword",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 1) {
            setShow(true);
            const timer = setTimeout(() => {
              setShow(false);
            }, 4000);
          } else {
          }
        });
    }
  };
  return (
    <div>
      {open && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="relative w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  onClick={() => {
                    setOpen(false);
                  }}
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-6 text-center">
                  <svg
                    className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h2 className="mb-5 mx-10 font-normal text-gray-500 dark:text-gray-400">
                    Please enter your registered email address
                  </h2>
                  <div className="space-y-4 md:space-y-6 mb-3">
                    <div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className={`focus:ring-blue-600 focus:border-blue-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm`}
                        placeholder="Enter your emailId"
                        defaultValue={inputField.email}
                        onChange={(e) =>
                          inputHandler(e.target.name, e.target.value)
                        }
                      />
                      {errorField && errorField.email && (
                        <div className="mt-1 text-red-600">
                          <small>{errorField.email}</small>
                        </div>
                      )}
                    </div>
                  </div>

                  {show && (
                    <div
                      className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
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
                      <span className="sr-only">Info</span>
                      <div>
                        We’ve sent you a link to the email address{" "}
                        <span className="font-medium">{inputField.email}</span>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={submitButton}
                    type="button"
                    className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Send
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                    }}
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
