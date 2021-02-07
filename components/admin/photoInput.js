import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import firebase, { useStorage } from "../../lib/firebaseClient";

export default function PhotoInput({ id = "", name, label, noborder, control, defaultValue = "", required, pattern, setValue = () => {}, ...props }) {
  const [uploadProgress, setUploadProgress] = useState(-1);
  const [downloadURL, setDownloadURL] = useState();
  const [error, setError] = useState();
  const { uploadImage } = useStorage();

  const imageFileInput = document.getElementById(`file-input-${id}`);

  const onClickHandler = () => {
    document.getElementById(`file-upload-${id}`).click();
  };

  useEffect(() => {
    if (imageFileInput) {
      setDownloadURL(imageFileInput.value);
    }
  }, [imageFileInput]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    try {
      // upload image to firebase
      const uploadTask = uploadImage(file, `file-upload-${id}`);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          setError("Failed to upload image.");
          console.error(error);
        },
        async () => {
          const _downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          setValue(name, _downloadURL || "", { shouldDirty: true });
          setDownloadURL(_downloadURL);
        }
      );
    } catch (e) {
      console.log("error uploading image.");
    }
  };

  var input = (
    <div>
      <button
        type="button"
        onClick={() => onClickHandler()}
        className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Change
      </button>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );

  if (uploadProgress >= 100) {
    // upload completed
    input = (
      <div className="flex space-x-2 items-center">
        <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <p className="text-sm text-green-500">Uploaded</p>
      </div>
    );

    setTimeout(() => {
      setUploadProgress(-1); // reset upload progress
    }, 2000);
  } else if (uploadProgress >= 0) {
    // uploading
    const intUploadProgress = parseInt(`${uploadProgress / 10}`);

    input = (
      <div className="h-2 w-28">
        <div className={`bg-blue-500 h-full rounded-full ${uploadProgress <= 1 ? "w-1/12" : `w-${intUploadProgress}/12`}`}></div>
      </div>
    );
  }

  return (
    <div className={`sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:pt-5 pb-5 ${!noborder && "sm:border-t sm:border-gray-200"}`}>
      <label className="block text-sm font-medium text-gray-700">{label || "Photo"}</label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <div className="flex items-center">
          <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-300 mr-4">
            {downloadURL ? (
              <img className="object-contain h-full w-full" src={downloadURL} />
            ) : (
              <svg className="h-full w-full text-gray-100" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </span>
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={{ required: required, pattern: pattern }}
            render={({ onChange, value }) => <input id={`file-input-${id}`} type="text" className="sr-only" value={value} onChange={onChange} />}
          />
          <input id={`file-upload-${id}`} onChange={onSelectFile} name={`file-upload-${id}`} type="file" className="sr-only" />
          {input}
        </div>
      </div>
    </div>
  );
}
