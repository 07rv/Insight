"use-client";

import Container from "../blog/Container";
import Category from "../blog/Category";
import AuthorCard from "../author/AuthorCard";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { parseISO, format } from "date-fns";
import { useSession } from "next-auth/react";

const PostPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  useEffect(() => {
    fetch(`/api/post?id=${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 1) {
          setIsLoading(false);
          setPost(data.post);
        } else {
        }
      });
  }, [id]);
  return (
    <>
      {isLoading ? (
        <div className="mt-3 flex justify-center space-x-3 text-gray-500 ">
          <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-700 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-700 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Container className="!pt-0">
            <div className="mx-auto max-w-screen-md ">
              <div className="flex justify-center">
                <Category categories={post.category} />
              </div>

              <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
                {post.title}
              </h1>
              <div className="mt-3 flex justify-center space-x-3 text-gray-500 ">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 flex-shrink-0">
                    {post.author.profileImg ? (
                      <Link href={`/author/${post.author._id}`}>
                        {
                          <Image
                            src={post.author.profileImg}
                            alt={post.author.name}
                            className="rounded-full object-cover"
                            fill
                            sizes="40px"
                          />
                        }
                      </Link>
                    ) : (
                      <Link href={`/author/${post.author._id}`}>
                        {
                          <Image
                            src={`/img/preview.jpeg`}
                            alt={"preview"}
                            className="rounded-full object-cover"
                            fill
                            sizes="40px"
                          />
                        }
                      </Link>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-400">
                      <Link href={`/author/${post.author._id}`}>
                        {post.author.name}
                      </Link>
                    </p>
                    <div className="flex items-center space-x-2 text-sm">
                      <time
                        className="text-gray-500 dark:text-gray-400"
                        dateTime={`2008-02-14 20:00`}
                      >
                        {format(parseISO(post.createdAt), "MMMM dd, yyyy")}
                      </time>
                      <span>· {10 || "5"} min read</span>
                      {post.author._id === session?.user._id && (
                        <div
                          onClick={() => {
                            router.push(`/edit/${id}`);
                          }}
                          className="relative h-5 w-5 flex-shrink-0 cursor-pointer"
                        >
                          <PencilSquareIcon />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <div className="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg">
            {post.cover ? (
              <Image
                src={post.cover}
                alt={"Thumbnail"}
                loading="eager"
                fill
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <Image
                src={"/img/preview.jpeg"}
                alt={"Thumbnail"}
                loading="eager"
                fill
                sizes="100vw"
                className="object-cover"
              />
            )}
          </div>
          <Container>
            <article className="mx-auto max-w-screen-md ">
              <div className="prose mx-auto my-3 dark:prose-invert prose-a:text-blue-600">
                {post.content && (
                  <div
                    className="ql-editor"
                    id={"Description"}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                )}
              </div>
              <div className="mb-7 mt-7 flex justify-center">
                <Link
                  href="/"
                  className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600 dark:text-blue-500 "
                >
                  ← View all posts
                </Link>
              </div>
              {post.author && <AuthorCard author={post.author} />}
            </article>
          </Container>
        </>
      )}
    </>
  );
};

export default PostPage;
