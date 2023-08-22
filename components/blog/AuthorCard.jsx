import Link from "next/link";
import Image from "next/image";

const AuthorCard = () => {
  return (
    <div className="mt-3 rounded-2xl bg-gray-50 px-8 py-8 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
      <div className="flex flex-wrap items-start sm:flex-nowrap sm:space-x-6">
        <div className="relative mt-1 h-24 w-24 flex-shrink-0 ">
          {true && (
            <Link href={`/author`}>
              <Image
                src={`/img/pic.avif`}
                alt={`Rohit`}
                className="rounded-full object-cover"
                fill
                sizes="96px"
              />
            </Link>
          )}
        </div>
        <div>
          <div className="mb-3">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">
              About {`Rohit`}
            </h3>
          </div>
          <div>
            {true && (
              <>
                Mario is a Staff Engineer specialising in Frontend at Vercel, as
                well as being a co-founder of Acme and the content management
                system Sanity. Prior to this, he was a Senior Engineer at Apple.
              </>
            )}
          </div>
          <div className="mt-3">
            <Link
              href={`/author`}
              className="bg-brand-secondary/20 rounded-full py-2 text-sm text-blue-600 dark:text-blue-500 "
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
