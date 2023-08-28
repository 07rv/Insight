"use-client";

import Container from "../blog/Container";
import Category from "../blog/Category";
import AuthorCard from "../blog/AuthorCard";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { parseISO, format } from "date-fns";

const categories = [
  {
    title: "Tech",
    slug: {
      current: "123452345",
    },
    color: "pink",
  },
  {
    title: "Cosmos",
    slug: {
      current: "123452345",
    },
    color: "purple",
  },
];

const PostPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState([]);
  const router = useRouter();
  const { id } = router.query;
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
                    {post.author.img ? (
                      <Link href={`/author/${post.author._id}`}>
                        {
                          <Image
                            src={`post.author.img`}
                            alt={`Rohit`}
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
                            alt={`Rohit`}
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
                  <>
                    Reinvention often comes in spurts, after a long period of
                    silence. Just as modern architecture recently enjoyed a
                    comeback, brand architecture, a field with well-established
                    principles for decades, is back in the limelight. Simply
                    understood, brand architecture is the art and science of
                    structuring the portfolio to meet your strategic goals,
                    defining the brand number, scope, and relationships needed
                    to compete. Just as Modern Architecture prioritized
                    function, a Brand Architecture is only as good as it is
                    well-suited for the purpose it strives to achieve. Given the
                    disruption observed today across industries and segments,
                    it’s no wonder that companies are considering structural
                    rather than topical solutions to the challenges they face.
                    Yet the context in which brand architecture decisions are
                    being made has changed. Gone are the days of “competitive
                    strategy”, with the military-inspired view of competition as
                    a zero-sum game, where market share needs to be stolen from
                    competitors, often in a street-by-street battle to win over
                    each individual segment. The type of brand architecture
                    required to win in this game demanded a dogged focus on each
                    segment, and a sniper-like collection of individual brands
                    sharply focused on each one. While there was always a place
                    for a variety of architectures — see Joachimsthaler’s brand
                    relationship spectrum — houses of brands were favored, as it
                    enabled segment-by-segment competition and risk protection.
                    P&G was the king of houses of brands, slicing and dicing the
                    market not just by products and demographics, but also by
                    psychographics, price range, buying patterns or attitudes.
                    In B2B, houses of brands were omnipresent, with a
                    product-driven logic that led to branding new features meant
                    to provide short-term competitive advantage. In today’s day
                    and age, companies like Google or Amazon do not pursue
                    growth through incremental market share gains; rather, they
                    focus on understanding their customers’ needs and creating
                    entirely new markets to answer them. Creating a house of
                    brands for these markets would be folly — not only would
                    each brand need to be created from scratch, increasing the
                    already significant investment, but the new category itself
                    often needs to be explained to consumers, compounding the
                    cost. Instead, investing in a strong master brand-led
                    architecture and putting multiple if not all brands under
                    the leadership of a strong brand, presents numerous
                    advantages. First, mergers and acquisitions, or
                    partnerships, are making it necessary to bring multiple
                    market participants to “the same page” — and this common
                    ground often involves a master brand recognized by all.
                    Second, the risk profile of a “branded house” architecture
                    has changed: the master brand can create an aura of
                    innovation and risk-taking, supporting the launch of new
                    products. Third, investments can be streamlined, as a strong
                    master brand can be leveraged across markets and product
                    launches. Finally, a track record of success in creating new
                    categories can create goodwill, creating a virtual circle of
                    success. To achieve this, brand architecture does not need
                    to be a pure “branded house” — in many cases, a strong
                    master brand creates substantial leverage and a much cleaner
                    portfolio, even as a few particularly strong brands can
                    continue existing as sub-brands. An example of this is
                    Salesforce, that leverages its master brand consistently —
                    yet allows more independence to a few specific sub-brands,
                    such as Pardot. There are 3 key imperatives to build this
                    type of brand architecture — to be clear, meaningful and
                    stretchable. Clear: Just as modern architecture thrives on
                    clear and clean lines, so does brand architecture. In the
                    age of micro-segmentation, micro-targeting, information
                    overload and digital fragmentation, you need a clear and
                    loud voice in order to stand out. In the context of short
                    attention spans where specific moments and needstates need
                    to be targeted in addition to consumer/customer profiles,
                    multiple brands often lead to confusion. The technology
                    space understood this early, where clear and simple
                    architectures that bring together simple design, as Apple,
                    with complex technology, as SAP — always under the
                    discipline of a rigorously simple way to organize. In
                    addition, one of the key reasons for the regained popularity
                    of clean, streamlined architectures, often organized around
                    a single master brand, has been the emergence of platforms,
                    or 2-way marketplaces structured around mutual value
                    creation. By definition, bringing various stakeholder groups
                    to one platform requires building a single brand, in order
                    to enable network effects so critical for building scale. As
                    Uber expands into different marketplaces and “uberizes”
                    different industries, leveraging the power of its master
                    brand is likely to lead to faster expansion than building a
                    targeted brand for each industry from scratch. Meaningful:
                    Just as modern architecture prioritizes function over
                    embellishments, a solid brand architecture is founded on
                    brands and values meaningful to consumers (or customers),
                    rather than product feature distinctions. Brand architecture
                    needs to be re-organized around brands that have a “reason
                    for being” compelling enough to elicit passion, and
                    introducing a clear distinction between brands that merit
                    air time with consumers vs. “clutter”. The “decluttering”
                    trend is gaining traction in brand architecture — just as in
                    the popular consumer “decluttering” technique, only brands
                    that “bring joy” to consumers get the spotlight. TED, for
                    example, leverages the powerful TED master brand, positioned
                    around “ideas worth spreading”, in a set of sub-brands that
                    target meaningful occasions and contexts for intellectual
                    exploration (TED Talks, TEDx, TED-Ed, TED Prize, TED
                    Fellows, TED Institute, TED Radio Hour). Stretchable: Modern
                    architecture is dynamic — it finds its force in the midst of
                    usage; movement is often embedded into its very bones. In
                    today’s fast-changing world, brand architecture is a moving
                    target — clients increasingly ask to design architectures
                    that fit their growth ambitions, thinking through future
                    growth scenarios and architecting space for the future
                    product pipeline. In particular in industries undergoing
                    disruption, where next generation products aim to upset the
                    status quo, their addition to any brand architecture may
                    require a fundamental rethink. Much as strategy has become
                    “real time” as the window for strategic planning has
                    shortened, brand architecture is also becoming more “real
                    time”, requiring more frequent reassessment, adaptations and
                    flexibility as markets change. Witness the frequency with
                    which Uber readjusts its portfolio. WeWork, the popular
                    co-working space, also exploits the strength of the master
                    brand to stretch into near-in categories such as hospitality
                    with WeLive or the ventures space with WeWork Labs.
                    Traditionally, companies considered a house of brands
                    architecture as a risk management tool — a way not to put
                    all your eggs in one basket. It turns out, in the age of
                    platforms and digital disruption, a masterbrand-led
                    architecture can help you build a bigger basket, to hold
                    more eggs.
                  </>
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
