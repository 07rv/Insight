import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const Share = ({ open, setShow }) => {
  const router = useRouter();
  const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`;
  useEffect(() => {
    function handleClickOutside(event) {
      if (open && !event.target.closest(".share")) {
        setShow(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setShow]);

  return (
    <>
      {open && (
        <div className="share">
          <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-gray-100 border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
              <button
                data-tooltip-target="tooltip-home"
                type="button"
                className="inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-200 dark:hover:bg-gray-800 group"
              >
                <FacebookShareButton
                  url={currentUrl}
                  quote={"Facebook"}
                  hashtag="#Facebook"
                >
                  <FacebookIcon size={35} round />
                </FacebookShareButton>
                <span className="sr-only">Facebook</span>
              </button>

              <button
                data-tooltip-target="tooltip-wallet"
                type="button"
                className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 dark:hover:bg-gray-800 group"
              >
                <FacebookShareButton
                  url={currentUrl}
                  quote={"FacebookMessenger"}
                  hashtag="#FacebookMessenger"
                >
                  <FacebookMessengerIcon size={35} round />
                </FacebookShareButton>
                <span className="sr-only">FacebookMessenger</span>
              </button>

              <div className="flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800">
                <button
                  data-tooltip-target="tooltip-wallet"
                  type="button"
                  className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 dark:hover:bg-gray-800 group"
                >
                  <LinkedinShareButton
                    url={currentUrl}
                    quote={"Linkedin"}
                    hashtag="#Linkedin"
                  >
                    <LinkedinIcon size={35} round />
                  </LinkedinShareButton>
                  <span className="sr-only">Linkedin</span>
                </button>
              </div>

              <button
                data-tooltip-target="tooltip-settings"
                type="button"
                className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 dark:hover:bg-gray-800 group"
              >
                <WhatsappShareButton
                  url={currentUrl}
                  quote={"Whatsapp"}
                  hashtag="#Whatsapp"
                >
                  <WhatsappIcon size={35} round />
                </WhatsappShareButton>
                <span className="sr-only">Whatsapp</span>
              </button>

              <button
                data-tooltip-target="tooltip-profile"
                type="button"
                className="inline-flex flex-col items-center justify-center px-5 rounded-r-full hover:bg-gray-200 dark:hover:bg-gray-800 group"
              >
                <TwitterShareButton
                  url={currentUrl}
                  quote={"Twitter"}
                  hashtag="#Twitter"
                >
                  <TwitterIcon size={35} round />
                </TwitterShareButton>
                <span className="sr-only">Twitter</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Share;
