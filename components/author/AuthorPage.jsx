import { useRouter } from "next/router";
import Container from "../blog/Container";
import PostList from "../post/PostList";
import { useState, useEffect } from "react";
import SkeletonImg from "../blog/SkeletonImg";

const AuthorPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState("12345");
  const router = useRouter();
  const { id } = router.query;
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
      <Container>
        <h1 className="text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
          {author}
        </h1>
        {isLoading ? (
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
            {new Array(6).fill().map((item, index) => (
              <div key={index}>
                <SkeletonImg />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
            {posts.map((post) => (
              <PostList key={post.id} post={post} aspect="square" />
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default AuthorPage;
