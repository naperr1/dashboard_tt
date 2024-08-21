import { Link } from "react-router-dom"
import SaleTable from "../components/SaleTable"

const Sale = () => {
    return (
        <div className="pr-5 pt-5 mt-12">
            <div className="flex justify-between mb-4 px-3">
                <div className="text-xl font-bold cursor-default ">Giảm giá</div>
                <Link to='/sale/add' >
                    <button className="bg-blue-600 px-4 py-1 text-white rounded-[6px] ">
                        Thêm giảm giá
                    </button>
                </Link>
            </div>
            <SaleTable />
        </div>
    )
}

export default Sale
