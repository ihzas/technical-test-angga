import React from "react";

export const MainTableTransaksi = ({
  transaksis,
  formatDate,
  setSelectedId,
  setIsModalOpen,
  deleteTransaksi,
  isOpenModal,
  EditTransaksi,
  selectedId,
  fetchTransaksi,
  closeModal,
  search,
  sortBy,
  byName,
}) => {
  return (
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
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
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
                search={search}
                sortBy={sortBy}
                byName={byName}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
