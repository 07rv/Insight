import { useRouter } from "next/router";
import Container from "../blog/Container";
import PostList from "./PostList";
const posts = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
];

const CategoryPost = () => {
  const router = useRouter();
  return (
    <Container>
      <h1 className="text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
        {router.query.id}
      </h1>
      <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
        {posts.map((post) => (
          <PostList key={post.id} post={post} aspect="square" />
        ))}
      </div>
    </Container>
  );
};

export default CategoryPost;
