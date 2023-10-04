import {useEffect, useState} from "react";
import axiosClient from "../axiosClient";
import {EditTransaksi} from "./EditTransaksi";
import dayjs from "dayjs";
import {Link} from "react-router-dom";

export const Transaction = () => {
  const [transaksis, setTransaksis] = useState([]);
  const [isOpenModal, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [mostSold, setMostSold] = useState([]);
  const [leastSold, setLeastSold] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  console.log({mostSold, leastSold});

  const fetchTransaksi = async (searchParam, sortByParam) => {
    try {
      const params = new URLSearchParams({
        search: searchParam,
        sortBy: sortByParam,
      });

      const response = await axiosClient.get(`transaksi?${params.toString()}`);
      setTransaksis(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMostSold = async () => {
    try {
      const response = await axiosClient.get("/transaksi/most-sold");
      setMostSold(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLeastSold = async () => {
    try {
      const response = await axiosClient.get("/transaksi/least-sold");
      setLeastSold(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterByDate = async () => {
    try {
      const response = await axiosClient.get(
        `/transaksi/filter-by-date?startDate=${startDate}&endDate=${endDate}`
      );
      setFilteredTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransaksi(search, sortBy);
    fetchMostSold();
    fetchLeastSold();
  }, [search, sortBy]);

  const deleteTransaksi = async (id) => {
    try {
      await axiosClient.delete(`transaksi/${id}`);
      fetchTransaksi();
    } catch (error) {
      console.log(error);
    }
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

  const clearSearch = () => {
    setSearch("");
    fetchTransaksi("", sortBy);
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
        <div className="ml-4">
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      <a href="#" className="group inline-flex">
                        No
                      </a>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      <a href="#" className="group inline-flex">
                        Nama Barang
                      </a>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <a href="#" className="group inline-flex">
                        Stok
                      </a>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <a href="#" className="group inline-flex">
                        Jumlah Terjual
                      </a>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <a href="#" className="group inline-flex">
                        Tanggal Transaksi
                      </a>
                    </th>
                    <th
                      scope="col"
                      className=" py-3.5 text-left text-sm font-semibold text-gray-900">
                      <a href="#" className="group inline-flex">
                        Jenis Barang
                      </a>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {transaksis.map((transaksi) => (
                    <tr key={transaksi.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {transaksi.id}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {transaksi.Barang.Nama_Barang}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {transaksi.Stok}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {transaksi.Jumlah_Terjual}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {formatDate(transaksi.Tanggal_Transaksi)}
                      </td>
                      <td className="whitespace-nowrap  py-4 text-sm text-gray-500">
                        {transaksi.Barang.Jenis_Barang}
                      </td>
                      <td className="relative whitespace-nowrap py-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => {
                            setSelectedId(transaksi.id);
                            setIsModalOpen(true);
                          }}
                          href="#"
                          className="text-indigo-600 mx-4 hover:text-indigo-900">
                          Edit
                        </button>
                        <a
                          onClick={() => deleteTransaksi(transaksi.id)}
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900">
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                  {isOpenModal && (
                    <EditTransaksi
                      id={selectedId}
                      onClose={closeModal}
                      fetchTransaksi={fetchTransaksi}
                    />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-7">
        <div className="w-1/2 pr-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Transaksi Terbanyak Terjual
          </h2>
          <table className="min-w-full divide-y divide-gray-300">
            {/* Tabel untuk data transaksi terbanyak terjual */}
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Jenis Barang
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Total Terjual
                </th>
              </tr>
            </thead>
            <tbody>
              {mostSold.map((item) => (
                <tr key={item.Barang.Jenis_Barang}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {item.Barang.Jenis_Barang}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {item.totalTerjual}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-1/2 pl-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Transaksi Terendah Terjual
          </h2>
          <table className="min-w-full divide-y divide-gray-300">
            {/* Tabel untuk data transaksi terendah terjual */}
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Jenis Barang
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Total Terjual
                </th>
              </tr>
            </thead>
            <tbody>
              {leastSold.map((item) => (
                <tr key={item.Barang.Jenis_Barang}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {item.Barang.Jenis_Barang}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {item.totalTerjual}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
