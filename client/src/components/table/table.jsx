import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useScrapeDeleteMutation } from "@/lib/slices/service";
import toast from "react-hot-toast";
import { CSVLink, CSVDownload } from "react-csv";
const Table = ({ data, page, limit, handleChangePage, refetch }) => {
  const tableHeader = [
    "Company",
    "SOCIAL PROFILE",
    "DESCRIPTION",
    "ADDRESS",
    "PHONE NO.",
    "EMAIL",
  ];
  const [
    scrapeDelete,
    { data: deleteData, isSuccess, isError, isLoading, error },
  ] = useScrapeDeleteMutation();

  const [selectedItem, setSelectedItem] = useState([]);

  const handlePage = (num) => {
    if (page != num) {
      handleChangePage(num);
      setSelectedItem([]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItem.length === data?.data?.data.length) {
      setSelectedItem([]);
    } else {
      let temp = [];
      data?.data?.data.map((item) => temp.push(item?._id));
      setSelectedItem(temp);
    }
  };

  const handleSelect = (id) => {
    if (selectedItem.includes(id))
      setSelectedItem(selectedItem.filter((_id) => _id !== id));
    else setSelectedItem((prev) => [...prev, id]);
  };

  const handleDelete = () => {
    // delete selected items
    if (selectedItem.length > 0) {
      scrapeDelete({ scrapeIds: selectedItem });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setSelectedItem([]);
      toast.success("Selected items deleted successfully.");
      refetch();
    }
  }, [isSuccess]);
  return (
    <div className="m-auto max-w-screen-xl shadow-md sm:rounded-lg">
      <div className="flex p-3 pl-5 pt-4 items-center gap-20 bg-white border rounded-t-lg">
        <div className="font-semibold">
          <span>{selectedItem?.length || 0}</span> selected
        </div>
        <div className="flex gap-5">
          <Button
            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
            disabled={selectedItem.length === 0 || isLoading}
            onClick={handleDelete}
          >
            Delete
          </Button>
          {/* <Button></Button> */}
          {data?.data?.data.length > 0 && (
            <CSVLink
              data={data?.data?.data}
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 inline-flex items-center justify-center duration-300 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3"
            >
              Export as CSV
            </CSVLink>
          )}
        </div>
      </div>
      <div className="  overflow-x-auto border ">
        <table className="table-auto overflow-x-auto md:overflow-auto w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    checked={
                      selectedItem.length === data?.data?.data.length &&
                      data?.data?.data.length != 0
                    }
                    onChange={handleSelectAll}
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              {tableHeader.map((header) => (
                <th scope="col" className="px-6 py-3" key={header}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.data?.data.map((row, i) => (
              <tr className="bg-white border-b  hover:bg-gray-50 " key={i}>
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      checked={selectedItem.includes(row?._id)}
                      onChange={() => handleSelect(row?._id)}
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link to={`/scrape/${row?._id}`}>
                    <img
                      src={row?.logoUrl}
                      className="bg-black h-10 w-20 object-contain rounded-md px-1"
                    />
                  </Link>
                </th>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <Link to={row?.socialLinks?.facebook} target="_blank">
                      <FaFacebook size={20} color="darkgray" />
                    </Link>
                    <Link to={row?.socialLinks?.twitter} target="_blank">
                      <FaTwitter size={20} color="darkgray" />
                    </Link>
                    <Link to={row?.socialLinks?.linkedin} target="_blank">
                      <FaLinkedin size={20} color="darkgray" />
                    </Link>
                  </div>
                </td>
                <td className="px-6 py-4 text-elicps w-80">
                  {row?.description || "N/A"}
                </td>
                <td className="px-6 py-4">{row?.address || "N/A"}</td>
                <td className="px-6 py-4 min-w-44">{row?.phone || "N/A"}</td>
                <td className="px-6 py-4">{row?.email || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between border rounded-b-lg bg-white pt-6 p-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {page}-{data?.data?.data.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {data?.data?.totalCount}
          </span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li onClick={() => page != 1 && handlePage(page - 1)}>
            <a
              href="#"
              className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${
                page == 1 && "__disabled_link"
              }`}
            >
              Previous
            </a>
          </li>
          {Array.from({ length: data?.data?.totalPages }, (x) => x + x).map(
            (row, i) => (
              <li key={i} onClick={() => handlePage(i + 1)}>
                <a
                  href="#"
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                    page == i + 1 && "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </a>
              </li>
            )
          )}

          <li
            onClick={() =>
              data?.data?.totalPages > page && handlePage(page + 1)
            }
          >
            <a
              href="#"
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${
                data?.data?.totalPages == page && "__disabled_link"
              }`}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Table;
