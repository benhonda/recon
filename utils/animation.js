import { keyframes } from "@emotion/react";

export const fadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px)
    // transform: translate3d(-200px, -100px, 0);
  }

  to {
    opacity: 1;
    transform: translateY(0)
    // transform: translate3d(0, 0, 0);
  }
`;

export const shortFadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px)
  }

  to {
    opacity: 1;
    transform: translateY(0)
  }
`;

export const shortshortFadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px)
  }

  to {
    opacity: 1;
    transform: translateY(0)
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;


