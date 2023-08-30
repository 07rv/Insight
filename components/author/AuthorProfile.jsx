import { useState } from "react";
import Image from "next/image";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

const AuthorProfile = ({ author }) => {
  const [inputField, setInputField] = useState({
    name: author.name,
    email: author.email,
    about: author.about ? author.about : "",
  });
  const [errorField, setErrorField] = useState({
    name: "",
    email: "",
    about: "",
  });

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
      } else if (field === "name") {
        if (inputField[field] === "") {
          hasError = true;
          setErrorMessage(field, "Please enter name");
        }
      }
    });
    return hasError;
  };

  const submitButton = async () => {
    if (!checkAndSetValidationsErrors()) {
      console.log(inputField);
    }
  };
  return (
    <div className="mx-auto flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <div className="space-y-4 md:space-y-6">
            <div className="m-auto relative mt-1 h-48 w-48 flex-shrink-0 ">
              {author.img ? (
                <div>
                  <Image
                    src={author.img}
                    alt={author.name}
                    className="rounded-full object-cover"
                    fill
                    sizes="96px"
                  />
                </div>
              ) : (
                <div>
                  <Image
                    src={"/img/preview.jpeg"}
                    alt={author.name}
                    className="rounded-full object-cover"
                    fill
                    sizes="96px"
                  />
                </div>
              )}
              <div className=" cursor-pointer absolute w-full py-2.5 bottom-5 inset-x-40  text-xs text-center leading-4 text-slate-950 dark:text-gray-400">
                <div className="relative h-6 w-6">
                  <PencilSquareIcon />
                </div>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className={`focus:ring-blue-600 focus:border-blue-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm`}
                defaultValue={inputField.name}
                onChange={(e) => inputHandler(e.target.name, e.target.value)}
              />
              {errorField && errorField.name && (
                <div className="mt-1 text-red-600">
                  <small>{errorField.name}</small>
                </div>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                disabled
                readonly
                type="email"
                name="email"
                id="email"
                className={`focus:ring-blue-600 focus:border-blue-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm`}
                placeholder="blog@gmail.com"
                defaultValue={inputField.email}
                onChange={(e) => inputHandler(e.target.name, e.target.value)}
              />
              {errorField && errorField.email && (
                <div className="mt-1 text-red-600">
                  <small>{errorField.email}</small>
                </div>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                About
              </label>
              <textarea
                type="text"
                name="about"
                id="about"
                rows="4"
                maxlength="300"
                defaultValue={inputField.about}
                onChange={(e) => inputHandler(e.target.name, e.target.value)}
                className="focus:ring-blue-600 focus:border-blue-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <button
              onClick={submitButton}
              className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
