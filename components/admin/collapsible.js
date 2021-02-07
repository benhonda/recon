import React, { useEffect, useState } from "react";

export default function Collapsible({ icon, title, hint, open, removeHandler, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preDelete, setPreDelete] = useState(false);

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreDelete(true);
    setTimeout(() => {
      removeHandler();
      setPreDelete(false);
    }, 500);
  };

  useEffect(() => {
    if (open) setIsOpen(true);
  }, [open]);

  return (
    <div className={`col-span-2 bg-white rounded-md w-full ${preDelete ? "border-2 border-red-500" : "border border-gray-300"}`}>
      <div onClick={() => setIsOpen(!isOpen)} className="px-4 py-3 rounded-tl-md rounded-tr-md flex space-x-2 bg-gray-50 cursor-pointer hover:bg-gray-100">
        {icon}
        <h6 className="text-gray-800 text-sm font-semibold flex-1 whitespace-nowrap overflow-hidden overflow-ellipsis">
          {title}
          <span className="italic text-gray-600 font-normal">&nbsp;&middot;&nbsp;{hint}</span>
        </h6>
        {removeHandler && (
          <button type="button" className="text-red-600 hover:bg-red-100 p-1 -m-1 rounded-full" onClick={handleRemove}>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
        {isOpen ? (
          <svg className="h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        ) : (
          <svg className="h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </div>
      <div className={`transition-all ${isOpen ? "" : "h-0 overflow-hidden"}`}>
        <div className="p-4">
          {children}
          {/* {removeHandler && (
            <div className="flex w-full">
              <div className="flex-1"></div>
              <button>
                <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Remove this person
              </button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
