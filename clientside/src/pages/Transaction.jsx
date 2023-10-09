import {useEffect, useState} from "react";
import axiosClient from "../axiosClient";
import {EditTransaksi} from "./EditTransaksi";
import dayjs from "dayjs";
import {Link} from "react-router-dom";
import {MainTableTransaksi} from "../components/MainTableTransaksi";
import Swal from "sweetalert2";

export const Transaction = () => {
  const [transaksis, setTransaksis] = useState([]);
  const [isOpenModal, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [byName, setByName] = useState("");

  const [mostSoldData, setMostSoldData] = useState([]);
  const [leastSoldData, setLeastSoldData] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [sortByCategory, setSortByCategory] = useState("");

  const fetchTransaksi = async (searchParam, sortByParam, sortByName) => {
    try {
      const params = new URLSearchParams({
        search: searchParam,
        sortBy: sortByParam,
        sortName: sortByName,
      });

      const response = await axiosClient.get(`transaksi?${params.toString()}`);
      setTransaksis(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMostSold = async () => {
    try {
      setMostSoldData([]);
      const response = await axiosClient.get(`/transaksi/most-sold`, {
        params: {
          startDate,
          endDate,
          category: sortByCategory,
        },
      });
      setMostSoldData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLeastSold = async () => {
    try {
      setLeastSoldData([]);
      const response = await axiosClient.get(`/transaksi/least-sold`, {
        params: {
          startDate,
          endDate,
          category: sortByCategory,
        },
      });
      setLeastSoldData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransaksi(search, sortBy, byName);
  }, [search, sortBy, byName]);

  const deleteTransaksi = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosClient.delete(`transaksi/${id}`);
          fetchTransaksi(search, sortBy, byName);
          Swal.fire(
            "Deleted!",
            "Your transaction has been deleted.",
            "success"
          );
        } catch (error) {
          console.log(error);
          Swal.fire(
            "Error",
            "An error occurred while deleting the transaction.",
            "error"
          );
        }
      }
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function formatDate(dateString) {
    const formattedDate = dayjs(dateString).format("DD - MM - YYYY");
    return formattedDate;
  }

  const handleSearch = () => {
    fetchTransaksi(search, sortBy);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleFilter = () => {
    if (!startDate || !endDate) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select both Start Date and End Date.",
      });
      return;
    }
    if (!sortByCategory) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select category.",
      });
      return;
    }

    fetchMostSold();
    fetchLeastSold();
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Transaksi</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the transaksi in your store.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link to={"/add"}>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
              Add Transaksi
            </button>
          </Link>
        </div>
      </div>

      <div className="flex items-center mt-7">
        {/* Search */}
        <div className="flex-auto">
          <div className="relative rounded-md ">
            <input
              type="text"
              placeholder="Search..."
              className="block w-full px-3 py-2 border border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                onClick={handleSearch}>
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M21 21l-4.35-4.35a8.5 8.5 0 111.4-1.4L22 19zm-2-9a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* SortBy */}
        <div className="ml-4">
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By Date</option>
            <option value="asc">Date Oldest</option>
            <option value="desc">Date Newest</option>
          </select>
        </div>
        <div className="ml-4">
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={byName}
            placeholder="Sort By Name"
            onChange={(e) => setByName(e.target.value)}>
            <option value="">Sort By Name</option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <MainTableTransaksi
            transaksis={transaksis}
            formatDate={formatDate}
            setSelectedId={setSelectedId}
            setIsModalOpen={setIsModalOpen}
            deleteTransaksi={deleteTransaksi}
            isOpenModal={isOpenModal}
            EditTransaksi={EditTransaksi}
            selectedId={selectedId}
            fetchTransaksi={fetchTransaksi}
            closeModal={closeModal}
            search={search}
            sortBy={sortBy}
            byName={byName}
          />
        </div>

        <div className="mt-8 mb-28">
          <div className="mt-4 flex flex-col justify-center mb-8 sm:flex-row">
            <div className="ml-4">
              <input
                type="date"
                placeholder="Start Date"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>

            <div className="ml-4">
              <input
                type="date"
                placeholder="End Date"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>

            <div className="ml-4">
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={sortByCategory}
                onChange={(e) => setSortByCategory(e.target.value)}>
                <option value="">Sort By Category</option>
                <option value="Pembersih">Pembersih</option>
                <option value="Konsumsi">Konsumsi</option>
              </select>
            </div>

            <button
              onClick={handleFilter}
              className="ml-4 inline-flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Filter
            </button>
          </div>

          <div className="flex flex-wrap">
            {/* Terjual Terbanyak */}
            <div className="w-full sm:w-1/2 pr-4 mb-4 sm:mb-0">
              <h2 className="text-xl font-semibold text-gray-900">
                Data Transaksi Terjual Dari Terbanyak
              </h2>
              <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300 mt-4">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        No
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Jenis Barang
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Total Terjual
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Tanggal Transaksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mostSoldData.length > 0 ? (
                      mostSoldData.map((item) => (
                        <tr key={item.Barang.Jenis_Barang}>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.Barang.id}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.Barang.Jenis_Barang}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.totalTerjual}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {formatDate(item.Tanggal_Transaksi)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="px-4 py-2 text-center text-xs font-medium text-gray-600">
                          No data available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Terjual Terendah */}
            <div className="w-full sm:w-1/2">
              <h2 className="text-xl font-semibold text-gray-900">
                Data Transaksi Terjual Dari Terendah
              </h2>
              <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300 mt-4">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        No
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Jenis Barang
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Total Terjual
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Tanggal Transaksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {leastSoldData.length > 0 ? (
                      leastSoldData.map((item) => (
                        <tr key={item.Barang.Jenis_Barang}>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.Barang.id}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.Barang.Jenis_Barang}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.totalTerjual}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {formatDate(item.Tanggal_Transaksi)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="px-4 py-2 text-center text-xs font-medium text-gray-600">
                          No data available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
