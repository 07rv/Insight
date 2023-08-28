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
      <div className="prose mx-auto mt-14 text-center dark:prose-invert ">
        <div className="font-Cinzel font-semibold">
          <p>
            A dedicated and versatile software engineer with a strong foundation
            in multiple programming languages including JavaScript, SCSS, C#,
            TypeScript, Python, and C++. My experience spans across various
            cutting-edge technologies such as React, MongoDB, MySQL, and
            Angular. With a passion for problem-solving and innovation, I thrive
            in dynamic work environments.
          </p>
          <p>
            My proficiency extends to both front-end and back-end development,
            allowing me to create seamless user interfaces and robust
            server-side functionalities. I have a deep understanding of various
            tools and frameworks, enabling me to efficiently build and maintain
            applications that meet high standards of performance and user
            experience.
          </p>
        </div>

        <p>
          <Link href="/contact">Get in touch</Link>
        </p>
      </div>
    </Container>
  );
};

export default AboutPage;
