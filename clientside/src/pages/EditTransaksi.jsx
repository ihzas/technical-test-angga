import React, {useEffect, useState} from "react";
import axiosClient from "../axiosClient";
import {PulseLoader} from "react-spinners";
import {css} from "@emotion/react";

export const EditTransaksi = ({onClose, id, fetchTransaksi}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [namaBarang, setNamaBarang] = useState("");
  const [stok, setStok] = useState(0);
  const [jumlahTerjual, setJumlahTerjual] = useState(0);
  const [tanggalTransaksi, setTanggalTransaksi] = useState("");
  const [jenisBarang, setJenisBarang] = useState("");

  const spinnerStyles = css`
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-left: 5px;
  `;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axiosClient.patch(`transaksi/${id}`, {
        Stok: stok,
        Jumlah_Terjual: jumlahTerjual,
        Tanggal_Transaksi: tanggalTransaksi,
        Nama_Barang: namaBarang,
        Jenis_Barang: jenisBarang,
      });
      setIsLoading(false);
      fetchTransaksi();
      onClose();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains("fixed")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="fixed z-40 py-72 inset-6 mt-10 px-5 flex items-center justify-center bg-opacity-50 transition-opacity duration-300 ease-in-out">
      <div className="relative pt-5 bg-white shadow-xl mb-5 px-4 sm:px-6 md:px-8 py-12 rounded-xl max-w-lg w-full">
        <form onSubmit={handleSubmit} className="">
          <div className="p-7 pb-6">
            <h1 className="block text-2xl font-medium text-gray-500 text-center">
              Edit Transaksi
            </h1>
            <div className="mt-5">
              <label
                htmlFor="nama-barang"
                className="block text-sm font-medium text-gray-500 text-center">
                Nama Barang
              </label>
              <div className="mt-1 text-gray-600">
                <input
                  type="text"
                  id="nama-barang"
                  name="nama-barang"
                  value={namaBarang}
                  className="block w-full h-7 border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-center"
                  onChange={(e) => setNamaBarang(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-5">
              <label
                htmlFor="stok"
                className="block text-sm font-medium text-gray-500 text-center">
                Stok
              </label>
              <div className="mt-1 text-gray-600">
                <input
                  type="number"
                  id="stok"
                  name="stok"
                  value={stok}
                  className="block w-full border text-center h-7 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => setStok(e.target.value)}
                />
              </div>
            </div>
            <div className=" mt-5">
              <label
                htmlFor="jumlah-terjual"
                className="block text-sm font-medium text-gray-500 text-center">
                Jumlah Terjual
              </label>
              <div className="mt-1 text-gray-600">
                <input
                  type="number"
                  name="jumlah-terjual"
                  value={jumlahTerjual}
                  id="jumlah-terjual"
                  className="block w-full border h-7 rounded-md text-center border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => setJumlahTerjual(e.target.value)}
                />
              </div>
            </div>
            <div className=" mt-5">
              <label
                htmlFor="tanggal-transaksi"
                className="block text-sm font-medium text-gray-500 text-center">
                Tanggal Transaksi
              </label>
              <div className="mt-1 text-gray-600">
                <input
                  type="date"
                  name="tanggal-transaksi"
                  value={tanggalTransaksi}
                  id="tanggal-transaksi"
                  className="block w-full border h-7 rounded-md text-center border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => setTanggalTransaksi(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-5">
              <label
                htmlFor="jenis-barang"
                className="block text-sm font-medium text-gray-500 text-center">
                Jenis Barang
              </label>
              <div className="mt-1 text-gray-600">
                <input
                  type="text"
                  name="jenis-barang"
                  value={jenisBarang}
                  id="jenis-barang"
                  className="block w-full border h-7 rounded-md text-center border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => setJenisBarang(e.target.value)}
                />
              </div>
            </div>
            {isLoading ? (
              <button
                type="submit"
                className="mt-6 w-full rounded-full border border-transparent bg-gray-950 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                disabled>
                <span className="inline-flex items-center">
                  <PulseLoader
                    size={10}
                    css={spinnerStyles}
                    color="currentColor"
                    loading={true}
                  />
                  <span className="ml-2">Loading</span>
                </span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 w-full rounded-md border border-transparent bg-gray-950 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
                Submits
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
