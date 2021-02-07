import Reveal from "react-awesome-reveal";
import { shortFadeSlideUp, shortshortFadeSlideUp } from "../../utils/animation";

export default function ContentSection({ data = {} }) {
  const { title, desc, stats, image } = data?.content;

  return (
    <div className="relative bg-white py-16 sm:py-16">
      <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
        <div className="relative sm:py-16 lg:py-0">
          <div aria-hidden="true" className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen">
            <div className="absolute inset-y-0 right-1/2 w-full bg-gray-100 rounded-r-3xl lg:right-72 z-10" />
            <svg className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12 z-0" width={404} height={392} fill="none" viewBox="0 0 404 392">
              <defs>
                <pattern id="02f20b47-fd69-4224-a62a-4c9de5c763f7" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                  <rect x={0} y={0} width={4} height={4} className="text-gray-300" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={392} fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)" />
            </svg>
          </div>
          <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20 z-20">
            {/* Testimonial card*/}
            <div className="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src={
                  image ||
                  "https://images.unsplash.com/photo-1521510895919-46920266ddb3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&fp-x=0.5&fp-y=0.6&fp-z=3&width=1440&height=1440&sat=-100"
                }
                alt=""
              />
              <div className="absolute inset-0 bg-white" style={{ mixBlendMode: "multiply" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-blue-400 opacity-80" />
              <div className="relative px-8 py-24"></div>
            </div>
          </div>
        </div>
        <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
          {/* Content area */}
          <div className="pt-12 sm:pt-16 lg:pt-20">
            <Reveal triggerOnce keyframes={shortshortFadeSlideUp}>
              <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">{title}</h2>
            </Reveal>
            <div className="mt-6 text-gray-500 space-y-6">
              <Reveal triggerOnce keyframes={shortFadeSlideUp} delay={100}>
                <p className="text-lg">{desc}</p>
              </Reveal>
            </div>
          </div>
          {/* Stats section */}
          <div className="mt-10">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-8">{stats && stats.map((stat, index) => <Statty key={`stat-${index}`} data={stat} index={index} />)}</dl>
            <div className="mt-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Statty({ data, index }) {
  const { title, value } = data;
  return (
    <div className="border-t-2 border-gray-100 pt-6">
      <Reveal triggerOnce keyframes={shortshortFadeSlideUp} delay={(index + 1) * 0}>
        <dt className="text-base font-medium text-gray-500">{title}</dt>
      </Reveal>
      <Reveal triggerOnce keyframes={shortshortFadeSlideUp} delay={(index + 1) * 100}>
        <dd className="text-3xl font-extrabold tracking-tight text-gray-900">{value}</dd>
      </Reveal>
    </div>
  );
}
