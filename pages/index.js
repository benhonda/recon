import Head from "next/head";
import FeatureSection from "../components/web/featureSection";
import HeaderSection from "../components/web/headerSection";
import TeamSection from "../components/web/teamSection";
import FooterSection from "../components/web/footerSection";
import TestimonialSection from "../components/web/testimonialSection";
import ContactSection from "../components/web/contactSection";
import NewsletterBannerSection from "../components/web/newsletterBannerSection";
import ContentSection from "../components/web/contentSection";
import { useEffect, useRef, useState } from "react";
import firebase, { useDatabase } from "../lib/firebaseClient";
import { getPageData } from "../lib/firebaseServer";

export const scrollTo = (ref) => {
  if (!ref.current) return;
  window.scroll({
    top: ref.current.offsetTop,
    behavior: "smooth",
  });
};

export default function Home({ data }) {
  const aboutRef = useRef(null);
  const teamRef = useRef(null);
  const footerRef = useRef(null);
  const topRef = useRef(null);
  const servicesRef = useRef(null);

  return (
    <div className="">
      <Head>
        <title>ReCon - Research and Consulting</title>
        <link rel="icon" href="/recon-transparent-icon.png" />
      </Head>

      <div ref={topRef}>
        <HeaderSection aboutRef={aboutRef} teamRef={teamRef} footerRef={footerRef} servicesRef={servicesRef} data={data} />
      </div>

      <div ref={servicesRef}>
        <FeatureSection data={data} />
      </div>

      <NewsletterBannerSection data={data} />

      <div ref={aboutRef}>
        <ContentSection data={data} />
      </div>

      <div ref={teamRef}>
        <TeamSection data={data} />
      </div>

      <TestimonialSection data={data} />
      {/* <ContactSection /> */}
      <div ref={footerRef}>
        <FooterSection topRef={topRef} aboutRef={aboutRef} teamRef={teamRef} servicesRef={servicesRef} data={data} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await getPageData();

  return {
    props: {
      data,
    },
  };
}

// export async function getStaticProps() {
//   const data = await getPageData();

//   return {
//     props: {
//       data,
//     },
//     // Next.js will attempt to re-generate the page:
//     // - When a request comes in
//     // - At most once every second
//     revalidate: 1, // In seconds
//   };
// }
