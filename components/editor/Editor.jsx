import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
const CodeBlock = Quill.import("formats/code-block");

Quill.register("modules/imageResize", ImageResize);
Quill.register(CodeBlock, true);

const Editor = ({ value, setContent, setErrorField }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ align: [] }],
      ["link", "image", "video"],
      [{ color: [] }],
      ["clean"],
      ["code-block"],
    ],
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  };
  const formats = [
    "code-block",
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
    "color",
  ];
  return (
    <div className="content">
      <ReactQuill
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500  dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-primary-500 dark:focus:border-primary-500"
        value={value}
        theme={"snow"}
        onChange={(ev) => {
          setContent(ev);
          setErrorField({ content: "" });
        }}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
