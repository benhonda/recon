export const servicesSectionName = "Solutions";
export const aboutSectionName = "About";
export const teamSectionName = "Meet the team";
export const footerSectionName = "Contact us";

export const imageForTeamMemberAtIndex = (index) => `image-of-team-member-${index}`;

export const imageForServiceAtIndex = (index) => `image-of-service-${index}`;

export const imageForTestimonial = `image-for-testimonial`;
export const imageForContentSection = `image-for-content`;

export const cleanStringForFirebaseKey = (str = "") => {
  const string = str.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, "");
  return string;
};

export const storageDir = "landingV2";
