import clsx from "clsx";
import Link from "next/link";
import { FC, Fragment } from "react";
import { RiArrowRightSLine, RiHomeLine } from "react-icons/ri";


export type BreadcrumbsType = {
    label: string | any,
    link?: string,
}

interface BreadcrumbsProps {
    data: BreadcrumbsType[];
    size?: "md" | "lg"
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({data, size = "md"}) => {
    
    return (
        <div className="text-gray-400 capitalize text-xs md:text-sm leading-normal">
            {data.map((field, index, array) => (
                <Fragment key={`breadcrumbs-${index}`}>
                    {index == 0 && (
                        <RiHomeLine className={clsx(size == "md" ? "mr-1 mb-0.5" : "mr-2 mb-1 w-5 h-5", "inline")} />
                    )}
                    {field.link ? (
                        <Fragment key={`breadcrumbs-link-${index}`}>
                            <Link href={field.link} className='link hover:hov-link inline-block'>
                                <span
                                    className={`${size === 'lg' ? 'text-lg' : 'text-sm'}`}>
                                    {field.label}
                                </span>
                            </Link>
                            {index < array.length - 1 && <span className="breadcrumb-separator">
                                <RiArrowRightSLine className={clsx(size == "md" ? "mx-1 mb-0.5" : "mb-1 mx-2 w-5 h-5", "inline")} />
                            </span>}
                        </Fragment>
                    ) : (
                        <Fragment key={`breadcrumbs-span-${index}`}>
                            <span className={`${size === 'lg' ? 'text-lg' : 'text-sm'}`}>
                                {field.label}
                            </span>
                            {index < array.length - 1 && <span className="breadcrumb-separator">
                                <RiArrowRightSLine className={clsx(size == "md" ? "mx-1 mb-0.5" : "mb-1 mx-2 w-5 h-5", "inline")} />
                            </span>}
                        </Fragment>
                    )}
                </Fragment>
            ))}
        </div>
    )

}

export default Breadcrumbs
