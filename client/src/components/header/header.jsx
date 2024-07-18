import { useCreateScrapeMutation } from "@/lib/slices/service";
import { isValidDomain } from "@/lib/utils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../loader/loader";

const Header = () => {
  const [createScrape, { data, isSuccess, isError, isLoading, error }] =
    useCreateScrapeMutation();

  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createScrape({ url });
    // if (isValidDomain(url)) createScrape({ url });
    // else toast.error("Invalid URL");
  };

  useEffect(() => {
    if (isSuccess) toast.success(data?.message);
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, isLoading, isSuccess, data]);
  return (
    <div className=" bg-white py-4 sticky top-0 z-10 border border-b-2">
      <form className="max-w-screen-xl m-auto sm:px-5 " onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Search
        </label>
        <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-5 px-5">
          <div className="absolute top-3 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search"
            className=" block pl-9 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-500"
            placeholder="Enter domain name"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            className="text-[#6C2BD9]  bg-[#EDE5FF] hover:bg-purple-300 duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : "Fetch & Save Details"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Header;
