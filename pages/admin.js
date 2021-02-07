import { Transition } from "@headlessui/react";
import { useCallback, useEffect, useState } from "react";
import TextField from "../components/admin/textfield";
import { useForm } from "react-hook-form";
import PhotoInput from "../components/admin/photoInput";
import { useUser } from "../context/userContext";
import { useRouter } from "next/router";
import { useAuth, useDatabase } from "../lib/firebaseClient";
import Image from "next/image";
import Link from "next/link";

import { LandscapeTextField } from "../components/admin/textfield";
import { getPageData } from "../lib/firebaseServer";
import Collapsible from "../components/admin/collapsible";

const PLACEHOLDER = "What should go here?";

export default function Admin({ data }) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState({});
  const [successfulSave, setSuccessfulSave] = useState(false);

  const { handleSubmit, errors, control, reset, formState, setValue } = useForm({ defaultValues: { ...data } });
  const { dirtyFields, isDirty } = formState;
  const { loadingUser, user } = useUser();
  const { logout } = useAuth();
  const { updateData, getData } = useDatabase();
  const router = useRouter();

  useEffect(() => {
    if (!loadingUser) {
      // You know that the user is loaded: either logged in or out!
      if (!user) router.push("/login");
      setLoading(false);
    }
  }, [loadingUser, user]);

  useEffect(() => {
    setPageData(data);
  }, [data]);

  const handleSuccessfulSave = () => {
    setSuccessfulSave(true);
    setTimeout(() => {
      setSuccessfulSave(false);
    }, 3000);
  };

  if (loadingUser || !user) {
    return (
      <div className="min-h-screen bg-white py-2 px-2">
        <p className="text-sm">Please wait...</p>
      </div>
    );
  }

  const save = async (data) => {
    setLoading(true);
    await updateData(data);
    handleSuccessfulSave();
    setLoading(false);
    history.go(0);
  };

  const updateMembersList = (newList) => {
    setPageData({
      ...data,
      team: {
        ...data.team,
        members: newList,
      },
    });

    setValue("team.members", newList);
  };

  const addAnotherTeamMember = () => {
    try {
      const membersList = data.team.members;
      membersList.push({ name: "", position: "" });
      updateMembersList(membersList);
    } catch (e) {
      alert(e.message);
    }
  };

  const removeTeamMember = (index) => {
    try {
      console.log(`removing member #${index + 1}`);
      const membersList = data.team.members;
      membersList.splice(index, 1);
      updateMembersList(membersList);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <nav className="bg-white relative z-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/admin">
                  <a className="hover:opacity-80 transition-opacity">
                    <div className="flex items-end">
                      <img src="/recon-transparent-icon.png" className="w-9" alt="ReCon Admin" />
                      <p className="text-xl text-blue-200 ml-1">admin</p>
                    </div>
                  </a>
                </Link>
              </div>
              {/* <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Dashboard
                </a>
              </div> */}
            </div>
            <div className="ml-6 flex items-center">
              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button
                    className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    id="user-menu"
                    aria-haspopup="true"
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <svg className="h-8 w-8 rounded-full bg-gray-100 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </button>
                </div>

                <Transition
                  show={profileMenuOpen}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <p className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                      {user && user.email}
                    </p>
                    <Link href="/">
                      <a className="w-full text-left block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100" role="menuitem">
                        View live
                      </a>
                    </Link>
                    <button
                      onClick={async () => {
                        setLogoutLoading(true);
                        await logout();
                        setLogoutLoading(false);
                      }}
                      className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      role="menuitem"
                    >
                      {logoutLoading ? (
                        <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      ) : (
                        "Sign out"
                      )}
                    </button>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <form onSubmit={handleSubmit(save)} className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 sm:space-y-5 text-gray-900">
            <div className="flex items-center">
              <div className="flex-1">
                <h2 className="text-2xl font-normal">Edit content</h2>
              </div>
              <div>
                <SaveButton loading={loading} successfulSave={successfulSave} dirtyFields={dirtyFields} />
              </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full z-10 bg-gray-100 shadow-inner mt-8 ">
              <div className="max-w-7xl mx-auto px-4 py-4 flex">
                <div className="flex-1"></div>
                <SaveButton loading={loading} successfulSave={successfulSave} dirtyFields={dirtyFields} />
              </div>
            </div>

            <Section title="Header" description="Grab the users attention here.">
              <LandscapeTextField name="header.title" label="Title" placeholder={PLACEHOLDER} type="text" control={control} />
              <LandscapeTextField name="header.titleAccent" label="Title Accent Text" placeholder={PLACEHOLDER} type="text" control={control} />
              <LandscapeTextField multiline={3} name="header.desc" label="Subtitle" placeholder={PLACEHOLDER} type="text" control={control} />
              <LandscapeTextField name="header.button1" label="Button 1" placeholder={PLACEHOLDER} type="text" control={control} />
              {/* <LandscapeTextField name="header.button2" label="Button 2" placeholder={PLACEHOLDER} type="text" control={control} /> */}
            </Section>

            <Section title="Services" description="Show off what you guys offer." alignTop>
              {pageData.services &&
                pageData.services.map((_, index) => {
                  return (
                    <div key={`service-${index}`} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div></div>
                      <Collapsible
                        title={`Service ${index + 1}`}
                        hint={pageData.services[index].title}
                        icon={
                          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                        }
                      >
                        <PhotoInput name={`services[${index}].image`} id={`services-${index}-image`} label="Icon image" noborder control={control} setValue={setValue} />
                        <LandscapeTextField name={`services[${index}].title`} label="Title" placeholder={PLACEHOLDER} type="text" control={control} />
                        <LandscapeTextField multiline={3} name={`services[${index}].desc`} label="Description" placeholder={PLACEHOLDER} type="text" control={control} />
                      </Collapsible>
                    </div>
                  );
                })}
            </Section>

            <Section title="Newsletter" description="Get people to sign up for email notifications.">
              <LandscapeTextField name="newsletter.title" label="Title" placeholder={PLACEHOLDER} type="text" control={control} />
              <LandscapeTextField multiline={3} name="newsletter.desc" label="Description" placeholder={PLACEHOLDER} type="text" control={control} />
            </Section>

            <Section title="About" description="Tell people a little more about your company.">
              <PhotoInput name={`content.image`} id={`content-image`} label="Display image/graphic" noborder control={control} setValue={setValue} />
              <LandscapeTextField name="content.title" label="Title" placeholder={PLACEHOLDER} type="text" control={control} />
              <LandscapeTextField multiline={3} name="content.desc" label="Description" placeholder={PLACEHOLDER} type="text" control={control} />

              {pageData.content &&
                pageData.content.stats &&
                pageData.content.stats.map((_, index) => {
                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>{index === 0 && "Stats"}</div>
                      <Collapsible
                        title={`Stat ${index + 1}`}
                        hint={pageData.content?.stats[index].title}
                        icon={
                          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                        }
                      >
                        <LandscapeTextField name={`content.stats[${index}].title`} label="Title" placeholder={PLACEHOLDER} type="text" control={control} noborder />
                        <LandscapeTextField name={`content.stats[${index}].value`} label="Value" placeholder={PLACEHOLDER} type="text" control={control} />
                      </Collapsible>
                    </div>
                  );
                })}
            </Section>

            <Section title="Team" description="Show off your amazing team.">
              <LandscapeTextField name="team.title" label="Title" placeholder={PLACEHOLDER} type="text" control={control} />
              <LandscapeTextField multiline={3} name="team.desc" label="Description" placeholder={PLACEHOLDER} type="text" control={control} />

              {pageData.team &&
                pageData.team.members &&
                pageData.team.members.map((_, index) => {
                  return (
                    <div key={`team-${index}`} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        {index === 0 && (
                          <>
                            <p>Team members</p>
                            <p className="text-sm text-gray-500 mt-1">Order is the same on the live site.</p>
                          </>
                        )}
                      </div>

                      <Collapsible
                        title={`Teammate ${index + 1}`}
                        hint={pageData.team?.members[index].name}
                        removeHandler={() => removeTeamMember(index)}
                        icon={
                          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                        }
                      >
                        <PhotoInput name={`team.members[${index}].image`} id={`team-members-${index}-image`} label="Display image" noborder control={control} setValue={setValue} />
                        <LandscapeTextField name={`team.members[${index}].name`} label="Name" placeholder={PLACEHOLDER} type="text" control={control} />
                        <LandscapeTextField name={`team.members[${index}].position`} label="Position" placeholder={PLACEHOLDER} type="text" control={control} />
                      </Collapsible>
                    </div>
                  );
                })}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div></div>
                <button type="button" onClick={() => addAnotherTeamMember()} className="col-span-2 bg-blue-500 hover:bg-blue-600 shadow px-6 py-2 rounded-md w-full">
                  <p className="text-sm text-white text-center">{pageData.team?.members && pageData.team?.members.length > 0 ? "Add another teammate +" : "Add a teammate +"}</p>
                </button>
              </div>
            </Section>

            <Section title="Testimonial" description="How much do people love your brand?">
              <PhotoInput name={`testimonial.image`} id={`testimonial-image`} label="Testimonial image" noborder control={control} setValue={setValue} />
              <LandscapeTextField multiline={3} name="testimonial.quote" label="Testimonial quote" placeholder={PLACEHOLDER} type="text" control={control} />
              <LandscapeTextField name="testimonial.personName" label="Person Name" placeholder={PLACEHOLDER} type="text" control={control} />
              <LandscapeTextField name="testimonial.personPosition" label="Person Position" placeholder={PLACEHOLDER} type="text" control={control} />
            </Section>

            <Section title="Footer/Contact" description="Extra information &amp; contact details.">
              <LandscapeTextField multiline={3} name="footer.text" label="Footer left text" placeholder={PLACEHOLDER} type="text" control={control} />
              <LandscapeTextField name="footer.facebook" label="Facebook URL" placeholder={PLACEHOLDER} type="text" control={control} />
              <LandscapeTextField name="footer.instagram" label="Instagram URL" placeholder={PLACEHOLDER} type="text" control={control} />
              <LandscapeTextField name="footer.twitter" label="Twitter URL" placeholder={PLACEHOLDER} type="text" control={control} />
              <LandscapeTextField name="footer.linkedin" label="LinkedIn URL" placeholder={PLACEHOLDER} type="text" control={control} />
              <LandscapeTextField name="footer.email" label="Email" placeholder={PLACEHOLDER} type="text" control={control} />
              <LandscapeTextField name="footer.phone" label="Phone" placeholder={PLACEHOLDER} type="text" control={control} />
            </Section>
          </div>
        </form>
      </div>
    </div>
  );
}

function Section({ first = false, title = "", description = "", alignTop, children }) {
  if (first) {
    return (
      <div>
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{description}</p>
        </div>
        <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">{children}</div>
      </div>
    );
  }

  return (
    <div className={`pt-8 space-y-6 sm:pt-10 sm:space-y-5 pb-4 sm:pb-12`}>
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{description}</p>
      </div>
      <div className={`space-y-4 ${alignTop && "pt-4 border-t border-gray-200"}`}>{children}</div>
    </div>
  );
}

function SaveButton({ loading, successfulSave, dirtyFields }) {
  if (successfulSave) {
    return (
      <button type="button" className=" inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md bg-green-600 text-white hover:bg-green-600">
        <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Saved
      </button>
    );
  }

  if (loading) {
    return (
      <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md bg-blue-500 text-white hover:bg-blue-500">
        <svg className="animate-spin h-5 w-5 mx-2 my-0.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    );
  }

  if (Object.keys(dirtyFields).length === 0) {
    return (
      <button type="button" className="transition-colors inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md bg-gray-400 text-white">
        Save
      </button>
    );
  }

  return (
    <button type="submit" className="transition-colors inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md bg-blue-500 text-white hover:bg-blue-600">
      Save
    </button>
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
