import { useEffect, useState } from "react";
import Reveal from "react-awesome-reveal";
import { useStorage } from "../../lib/firebaseClient";
import { shortFadeSlideUp, shortshortFadeSlideUp } from "../../utils/animation";
import { imageForTestimonial } from "../../utils/data";

export default function TestimonialSection({ data = {} }) {
  const { quote, personName, personPosition, image } = data?.testimonial;

  return (
    <div className="bg-white pt-16 lg:py-32">
      <div className="pb-16 bg-blue-500 lg:pb-0 lg:z-10 lg:relative">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="relative lg:-my-8">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2 bg-white lg:hidden" />
            <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-0 lg:pr-8 lg:h-full">
              <div className="aspect-w-10 aspect-h-6 rounded-xl shadow-xl overflow-hidden sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full">
                <img
                  className="object-cover lg:h-full lg:w-full"
                  src={image || "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="mt-12 lg:m-0 lg:col-span-2 lg:pl-8">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:py-20 lg:max-w-none">
              <blockquote>
                <div>
                  <Reveal triggerOnce keyframes={shortshortFadeSlideUp}>
                    <svg className="h-12 w-12 text-white opacity-30" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </Reveal>
                  <Reveal triggerOnce keyframes={shortFadeSlideUp} delay={100}>
                    <p className="mt-6 text-2xl font-medium text-white">{quote || ""}</p>
                  </Reveal>
                </div>
                <footer className="mt-6">
                  <Reveal triggerOnce keyframes={shortshortFadeSlideUp} delay={200}>
                    <p className="text-base font-medium text-white">{personName || "John Appleseed"}</p>
                  </Reveal>
                  <Reveal triggerOnce keyframes={shortshortFadeSlideUp} delay={300}>
                    <p className="text-base font-medium text-blue-200">{personPosition || "CEO, Workation"}</p>
                  </Reveal>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
