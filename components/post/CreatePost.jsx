import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { storage } from "@/database/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { useSession } from "next-auth/react";

import dynamic from "next/dynamic";
const Editor = dynamic(
  () => {
    return import("../editor/Editor");
  },
  { ssr: false }
);
const CreatePost = ({ options }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [fileUrl, setfileUrl] = useState("");
  const [category, setCategory] = useState(options[1]._id);
  const [errorField, setErrorField] = useState({
    title: "",
    content: "",
    file: "",
    category: "",
  });

  const router = useRouter();
  const { data: session } = useSession();
  const setErrorMessage = (name, value) => {
    setErrorField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const checkAndSetValidationsErrors = () => {
    var hasError = false;
    if (title === "") {
      setErrorMessage("title", "Enter title");
      hasError = true;
    }
    if (file === "") {
      setErrorMessage("file", "Choose file");
      hasError = true;
    }
    if (content === "") {
      setErrorMessage("content", "Enter content");
      hasError = true;
    }
    if (category === "") {
      setErrorMessage("category", "Choose Category");
    }
    return hasError;
  };

  const submitButton = async () => {
    if (!checkAndSetValidationsErrors()) {
      const fileName = `posts/${uuid()}.${file.name.split(".").pop()}`;
      const storageRef = ref(storage, `${fileName}`);
      uploadBytesResumable(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          await fetch("/api/post", {
            method: "POST",
            body: JSON.stringify({
              title: title,
              content: content,
              cover: downloadURL,
              category: category,
              email: session?.user?.email,
            }),
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status == 1) {
                router.push("/");
              } else {
              }
            });
        });
      });
    }
  };
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-4 lg:py-8 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Post
          </h2>
          <div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Title
              </label>
              <textarea
                type="text"
                name="title"
                id="title"
                rows="3"
                maxLength={200}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="title..."
                defaultValue={title}
                onChange={(ev) => {
                  setErrorField({ title: "" });
                  setTitle(ev.target.value);
                }}
              />
              {errorField && errorField.title && (
                <div className="mt-1 text-red-600">
                  <small>{errorField.title}</small>
                </div>
              )}
            </div>
            <div className="mb-6">
              <select
                id="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {options.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errorField && errorField.category && (
                <div className="mt-1 text-red-600">
                  <small>{errorField.category}</small>
                </div>
              )}
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group ">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                    </div>
                    <input
                      name="file"
                      id="file"
                      onChange={(ev) => {
                        setErrorField({ file: "" });
                        setfileUrl(URL.createObjectURL(ev.target.files[0]));
                        setFile(ev.target.files[0]);
                      }}
                      defaultValue={fileUrl}
                      type="file"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <div className="flex items-center justify-center w-full">
                  {fileUrl ? (
                    <img
                      className="object-fill h-32 w-50 max-w-lg rounded-lg"
                      src={fileUrl}
                      alt="image description"
                    />
                  ) : (
                    <img
                      className="h-32 w-50 max-w-lg rounded-lg"
                      src="/img/preview.jpeg"
                      alt="image description"
                    />
                  )}
                </div>
                {errorField && errorField.file && (
                  <div className="mt-1 text-red-600">
                    <small>{errorField.file}</small>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <Editor
                value={content}
                setContent={setContent}
                setErrorField={setErrorField}
              />
              {errorField && errorField.content && (
                <div className="mt-1 text-red-600">
                  <small>{errorField.content}</small>
                </div>
              )}
            </div>

            <button
              onClick={submitButton}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreatePost;
