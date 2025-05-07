import { FC, ReactNode } from "react"


interface cardInfoDashboard {
    title: string,
    total: string | number,
    icon: ReactNode
}

const CardInfoDashboard: FC<cardInfoDashboard> = ({ title, total, icon }) => {

    return (
        <div className="flex items-center bg-white border border-white rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-primary">
                {icon}
            </div>
            <div className="px-4 text-gray-700">
                <h3 className="text-sm tracking-wider">{title}</h3>
                <p className="text-3xl">{total}</p>
            </div>
        </div>
    )

}

export default CardInfoDashboard
