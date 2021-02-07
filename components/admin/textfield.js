import { Controller } from "react-hook-form";

export default function TextField({
  multiline = -1,
  label = "",
  placeholder = "",
  helpText = "",
  errorText,
  className = "",
  defaultValue = "",
  id = "",
  type,
  prefix,
  suffix,
  disabled,
  ref,
  name,
  control,
  required,
  pattern,
  ...props
}) {
  return (
    <div className="flex-1">
      <div className="flex text-sm">
        <label htmlFor={id} className="block flex-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      </div>
      <div className="mt-1">
        {multiline > 0 ? (
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={{ required: required, pattern: pattern }}
            render={({ onChange, value }) => (
              <textarea
                id={id}
                rows={multiline}
                className={`
                  shadow-sm block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400 
                  ${errorText ? ` ring-1 ring-red-400 border-red-400 focus:ring-red-400 focus:border-red-400 ` : ` focus:ring-blue-500 focus:border-blue-500 `} 
                  ${disabled ? ` bg-gray-50 cursor-not-allowed ` : ""}
                  ${className}
                `}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                {...props}
              />
            )}
          />
        ) : (
          <div className="flex rounded-md shadow-sm">
            {prefix ? <span className={`inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm`}>{prefix}</span> : null}
            <Controller
              name={name}
              control={control}
              defaultValue={defaultValue}
              rules={{ required: required, pattern: pattern }}
              render={({ onChange, value }) => (
                <input
                  id={id}
                  type={type || "text"}
                  className={`
                    flex-1 block w-full sm:text-sm border-gray-300 placeholder-gray-400 
                    ${errorText ? ` ring-1 ring-red-400 border-red-400 focus:ring-red-400 focus:border-red-400 ` : ` focus:ring-blue-500 focus:border-blue-500 `} 
                    ${disabled ? ` bg-gray-50 cursor-not-allowed ` : ""}
                    ${suffix ? " rounded-l-md " : prefix ? " rounded-r-md " : " rounded-md "}
                    ${className}
                  `}
                  placeholder={placeholder}
                  value={value}
                  onChange={onChange}
                  disabled={disabled}
                  {...props}
                />
              )}
            />
            {suffix ? <span className={`inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm`}>{suffix}</span> : null}
          </div>
        )}
      </div>
      {errorText ? <p className={`mt-2 text-xs text-red-400`}>{errorText}</p> : <p className={`mt-2 text-xs text-gray-500`}>{helpText}</p>}
    </div>
  );
}

export function LandscapeTextField({
  multiline = -1,
  label = "",
  placeholder = "",
  helpText = "",
  errorText,
  className = "",
  defaultValue = "",
  id = "",
  type,
  prefix,
  suffix,
  disabled,
  ref,
  name,
  control,
  required,
  pattern,
  noborder,
  ...props
}) {
  return (
    <div className={`sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5 ${!noborder && "sm:border-t sm:border-gray-200"}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
        {label}
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <div className="flex rounded-md shadow-sm">
          {multiline > 0 ? (
            <Controller
              name={name}
              control={control}
              defaultValue={defaultValue}
              rules={{ required: required, pattern: pattern }}
              render={({ onChange, value }) => (
                <textarea
                  id={id}
                  rows={multiline}
                  className={`
                  shadow-sm block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400 
                  ${errorText ? ` ring-1 ring-red-400 border-red-400 focus:ring-red-400 focus:border-red-400 ` : ` focus:ring-blue-500 focus:border-blue-500 `} 
                  ${disabled ? ` bg-gray-50 cursor-not-allowed ` : ""}
                  ${className}
                `}
                  placeholder={placeholder}
                  value={value}
                  onChange={onChange}
                  disabled={disabled}
                  {...props}
                />
              )}
            />
          ) : (
            <>
              {/* <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">workcation.com/</span> */}
              {prefix ? <span className={`inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm`}>{prefix}</span> : null}
              {/* <input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            className="flex-1 block w-full focus:ring-blue-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
          /> */}
              <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={{ required: required, pattern: pattern }}
                render={({ onChange, value }) => (
                  <input
                    id={id}
                    type={type || "text"}
                    className={`
                    flex-1 block w-full sm:text-sm border-gray-300 placeholder-gray-400 
                    ${errorText ? ` ring-1 ring-red-400 border-red-400 focus:ring-red-400 focus:border-red-400 ` : ` focus:ring-blue-500 focus:border-blue-500 `} 
                    ${disabled ? ` bg-gray-50 cursor-not-allowed ` : ""}
                    ${suffix ? " rounded-l-md " : prefix ? " rounded-r-md " : " rounded-md "}
                    ${className}
                  `}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    {...props}
                  />
                )}
              />
              {suffix ? <span className={`inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm`}>{suffix}</span> : null}
            </>
          )}
        </div>
        {errorText ? <p className={`mt-2 text-xs text-red-400`}>{errorText}</p> : <p className={`mt-2 text-xs text-gray-500`}>{helpText}</p>}
      </div>
    </div>
  );
}
