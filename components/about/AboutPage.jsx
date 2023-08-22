import Container from "../blog/Container";

import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  const authors = [
    {
      _id: 1,
      name: "Rohit",
      img: "/img/pic.avif",
    },
    {
      _id: 2,
      name: "Rohit Verma",
      img: "/img/pic.avif",
    },
    {
      _id: 3,
      name: "Rohit Verma",
      img: "/img/pic.avif",
    },
  ];
  return (
    <Container>
      <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
        About
      </h1>
      <div className="text-center">
        <p className="text-lg">We are a small passionate team.</p>
      </div>

      <div className="mb-16 mt-6 grid grid-cols-3 gap-5 md:mb-32 md:mt-16 md:gap-16">
        {authors.slice(0, 3).map((author) => {
          return (
            <div
              key={author._id}
              className="relative aspect-square overflow-hidden rounded-md bg-slate-50 odd:translate-y-10 odd:md:translate-y-16"
            >
              {true && (
                <Image
                  src={author.img}
                  alt={author?.name || " "}
                  fill
                  sizes="(max-width: 320px) 100vw, 320px"
                  className="object-cover"
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="prose mx-auto mt-14 text-center dark:prose-invert">
        <p>
          We provide real-time connectivity to enable software providers and
          financial institutions to build integrated products for their small
          business customers.
        </p>
        <p>
          Our API infrastructure is leveraged by clients ranging from lenders to
          corporate card providers and business forecasting tools, with use
          cases including automatic reconciliation, business dashboarding, and
          loan decisioning.
        </p>
        <p>
          <Link href="/contact">Get in touch</Link>
        </p>
      </div>
    </Container>
  );
};

export default AboutPage;
