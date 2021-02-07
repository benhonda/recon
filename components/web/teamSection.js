import { useEffect, useState } from "react";
import Reveal from "react-awesome-reveal";
import { useStorage } from "../../lib/firebaseClient";
import { shortFadeSlideUp, shortshortFadeSlideUp } from "../../utils/animation";
import { imageForTeamMemberAtIndex } from "../../utils/data";

export default function TeamSection({ data = {} }) {
  const { members, desc, title } = data?.team;

  return (
    <div className="bg-white pb-12">
      <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-8 sm:space-y-12">
          <div className="space-y-5 sm:mx-auto sm:max-w-2xl sm:space-y-4">
            <Reveal triggerOnce keyframes={shortshortFadeSlideUp}>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
            </Reveal>
            <Reveal triggerOnce keyframes={shortFadeSlideUp} delay={100}>
              <p className="text-xl text-gray-500">{desc}</p>
            </Reveal>
          </div>
          <div className="max-w-2xl lg:max-w-5xl mx-auto">
            <ul className="mx-auto grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-6 md:gap-x-6 lg:gap-x-8 lg:gap-y-12">
              {members && members.map((member, index) => <Teammate key={`team-mem-${index}`} data={member} index={index} />)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Teammate({ data, index }) {
  const { name, position, image } = data;

  return (
    <li key={`team-member-${index}`}>
      <Reveal triggerOnce keyframes={shortshortFadeSlideUp} duration={600} delay={index * 75}>
        <div className={`space-y-4 `}>
          <img
            className="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24"
            src={image || "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"}
            alt=""
          />
          <div className="space-y-2">
            <div className="text-xs font-medium lg:text-sm">
              <h3>{name}</h3>
              <p className="text-blue-500">{position}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </li>
  );
}
