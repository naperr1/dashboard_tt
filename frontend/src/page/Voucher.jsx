import { } from "react";
import VoucherTable from "../components/VoucherTable";
import { Link } from "react-router-dom";

const Voucher = () => {
  return (
    <>
      <div className="pr-5 py-5 mt-12">
        <div className="flex justify-between mb-4 px-3">
          <div className="text-xl font-bold cursor-default">Voucher</div>
          <Link to='/voucher/add' >
            <button className="bg-blue-600 px-4 py-1 text-white rounded-[6px] ">
              Thêm voucher
            </button>
          </Link>
        </div>
        <div className="">
          <VoucherTable />
        </div>
      </div>
    </>
  );
};

export default Voucher;
