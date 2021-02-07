import Reveal from "react-awesome-reveal";
import { shortFadeSlideUp } from "../../utils/animation";

export default function FeatureSection({ data = {} }) {
  const services = data?.services;

  return (
    <div className="pt-24 pb-12 sm:pt-40 sm:pb-20 bg-white">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">{services && services.map((service, index) => <Feature key={`feature-${index}`} index={index} data={service} />)}</dl>
      </div>
    </div>
  );
}

function Feature({ data, index }) {
  const colors = ["bg-green-500", "bg-purple-500", "bg-yellow-400"];
  const { title, desc, image } = data;

  return (
    <div>
      <Reveal triggerOnce keyframes={shortFadeSlideUp} duration={700}>
        <div className={`shadow-lg flex items-center justify-center h-12 w-12 rounded-md ${colors[index]} text-white`}>
          {image ? (
            <img src={image} className="h-6 w-6 object-contain" />
          ) : (
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          )}
        </div>
      </Reveal>
      <div className="mt-5">
        <Reveal triggerOnce keyframes={shortFadeSlideUp} delay={(index + 1) * 100} duration={700}>
          <dt className="text-lg leading-6 font-medium text-gray-900">{title}</dt>
        </Reveal>
        <Reveal triggerOnce keyframes={shortFadeSlideUp} delay={(index + 1) * 200} duration={700}>
          <dd className="mt-2 text-base text-gray-500">{desc}</dd>
        </Reveal>
      </div>
    </div>
  );
}
