import { Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Reveal from "react-awesome-reveal";
import { scrollTo } from "../../pages";
import { shortFadeSlideUp, shortshortFadeSlideUp } from "../../utils/animation";
import { servicesSectionName, teamSectionName, aboutSectionName, footerSectionName } from "../../utils/data";

export default function HeaderSection({ data = {}, teamRef, aboutRef, footerRef, servicesRef }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative bg-gray-900 overflow-hidden">
      <div className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full" aria-hidden="true">
        <div className="relative h-full max-w-7xl mx-auto">
          <svg className="absolute right-full transform translate-y-1/4 sm:translate-y-2/3 translate-x-1/4 lg:translate-x-1/2" width={404} height={784} fill="none" viewBox="0 0 404 784">
            <defs>
              <pattern id="f210dbf6-a58d-4871-961e-36d5016a0f49" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                <rect x={0} y={0} width={4} height={4} className="text-gray-800" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={784} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
          </svg>
          <svg className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2" width={404} height={784} fill="none" viewBox="0 0 404 784">
            <defs>
              <pattern id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                <rect x={0} y={0} width={4} height={4} className="text-gray-700" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={784} fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)" />
          </svg>
        </div>
      </div>
      <div className="relative pt-6 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
            <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <Link href="/">
                  <a className="hover:opacity-80 transition-opacity">
                    <img src="/recon-transparent-logo.png" className="h-5" alt="ReCon Home" />
                  </a>
                </Link>
                <div className="-mr-2 flex items-center md:hidden">
                  <button
                    type="button"
                    className="bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    id="main-menu"
                    aria-haspopup="true"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    <span className="sr-only">Open main menu</span>
                    {/* Heroicon name: menu */}
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:flex md:space-x-10">
              <button
                onClick={() => {
                  scrollTo(servicesRef);
                }}
                className="font-medium text-gray-400 hover:text-gray-500"
              >
                {servicesSectionName}
              </button>
              <button
                onClick={() => {
                  scrollTo(aboutRef);
                }}
                className="font-medium text-gray-400 hover:text-gray-500"
              >
                {aboutSectionName}
              </button>
              <button
                onClick={() => {
                  scrollTo(teamRef);
                }}
                className="font-medium text-gray-400 hover:text-gray-500"
              >
                {teamSectionName}
              </button>
              <button
                onClick={() => {
                  scrollTo(footerRef);
                }}
                className="font-medium text-gray-400 hover:text-gray-500"
              >
                Get in touch
              </button>
            </div>
            <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
              <span className="inline-flex rounded-md shadow">
                <button
                  onClick={() => {
                    scrollTo(footerRef);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white shadow bg-gray-700 hover:bg-gray-800 transition-colors"
                >
                  {footerSectionName}
                </button>
              </span>
            </div>
          </nav>
        </div>
        <Transition
          show={mobileMenuOpen}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50">
            <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="px-5 pt-4 flex items-center justify-between">
                <div>
                  <Link href="/">
                    <a className="hover:opacity-80 transition-opacity">
                      <img src="/recon-transparent-logo.png" className="h-5" alt="ReCon Home" />
                    </a>
                  </Link>
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    <span className="sr-only">Close menu</span>
                    {/* Heroicon name: x */}
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div role="menu" aria-orientation="vertical" aria-labelledby="main-menu">
                <div className="px-2 pt-2 pb-3" role="none">
                  <button
                    onClick={() => {
                      scrollTo(servicesRef);
                    }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    role="menuitem"
                  >
                    {servicesSectionName}
                  </button>
                  <button
                    onClick={() => {
                      scrollTo(aboutRef);
                    }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    role="menuitem"
                  >
                    {aboutSectionName}
                  </button>
                  <button
                    onClick={() => {
                      scrollTo(teamRef);
                    }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    role="menuitem"
                  >
                    {teamSectionName}
                  </button>
                  <button
                    onClick={() => {
                      scrollTo(footerRef);
                    }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    role="menuitem"
                  >
                    {footerSectionName}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
        <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
          <div className="text-center py-16 sm:py-40">
            <Reveal keyframes={shortshortFadeSlideUp} duration={750}>
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl max-w-4xl mx-auto">
                <span className="block xl:inline">{data.header?.title}</span>
                <span className="block xl:inline text-gradient bg-gradient-to-r from-blue-300 via-blue-400 to-blue-600">&nbsp;{data.header?.titleAccent}</span>
              </h1>
            </Reveal>
            <Reveal keyframes={shortshortFadeSlideUp} duration={750} delay={75}>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">{data.header?.desc}</p>
            </Reveal>
            <Reveal keyframes={shortshortFadeSlideUp} duration={750} delay={150}>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <button
                    onClick={() => {
                      scrollTo(servicesRef);
                    }}
                    className="transition-colors w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 md:text-lg md:px-10"
                  >
                    {data.header?.button1}
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </main>
      </div>
    </div>
  );
}
