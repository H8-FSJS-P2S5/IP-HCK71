import { useState } from "react";

export default function Search({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = () => {
    onSearch(searchValue);
  };
  return (
    <>
      <div
        className="relative flex border"
        data-twe-input-wrapper-init=""
        data-twe-input-group-ref=""
      >
        <input
          type="search"
          className="peer block min-h-[auto] w-full rounded 
          border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none"
          placeholder="Search"
          aria-label="search"
          value={searchValue}
          onChange={handleChange}
        />

        <button
          className="bg-black relative z-[2] -ms-0.5 flex items-center rounded-e bg-primary px-5  text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          type="button"
          id="button-addon1"
          data-twe-ripple-init=""
          data-twe-ripple-color="light"
          onClick={handleSubmit}
        >
          <span className="[&>svg]:h-5 [&>svg]:w-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </span>
        </button>
      </div>
    </>
  );
}
