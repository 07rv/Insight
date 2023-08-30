import { useRouter } from "next/router";
import Container from "../blog/Container";
import PostList from "../post/PostList";
import { useState, useEffect } from "react";
import SkeletonImg from "../blog/SkeletonImg";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import AuthorCard from "./AuthorCard";
const AuthorPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const itemsPerPage = 9;
  useEffect(() => {
    fetch(`/api/author?id=${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 1) {
          setIsLoading(false);
          setPosts(data.posts);
          setAuthor(data.author);
        } else {
        }
      });
  }, [id]);
  return (
    <>
      <Pagination
        posts={posts}
        itemsPerPage={itemsPerPage}
        isLoading={isLoading}
        author={author}
      />
    </>
  );
};

export default AuthorPage;

const Pagination = ({ posts, itemsPerPage, isLoading, author }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = posts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedData = posts.slice(startIndex, endIndex);
  return (
    <>
      <Container>
        <h1 className=" font-Inconsolata text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
          {author.name}
        </h1>
        <Container>
          <article className="mx-auto max-w-screen-md ">
            {author && <AuthorCard author={author} profile={true} />}
          </article>
        </Container>
        {isLoading ? (
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
            {new Array(6).fill().map((item, index) => (
              <div key={index}>
                <SkeletonImg />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
            {displayedData.map((post) => (
              <PostList key={post.id} post={post} aspect="square" />
            ))}
          </div>
        )}

        <div className="mt-10 flex items-center justify-center">
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() =>
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
              }
              disabled={currentPage === 1}
              className="relative inline-flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
            >
              <ChevronLeftIcon className="h-3 w-3" aria-hidden="true" />
              <span>Previous</span>
            </button>
            <button
              onClick={() =>
                setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
            >
              <span>Next</span>
              <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </Container>
    </>
  );
};
