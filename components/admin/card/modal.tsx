'use client'

import clsx from "clsx";
import { FC, useRef } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useOnClickOutside } from "usehooks-ts";
import Button from "../form/button";

interface modalProps {
    open: boolean;
    closeIcon?: string;
    children?: React.ReactNode;
    titleContent?: React.ReactNode;
    className?: string;
    closeFn: () => void;
    closeFnText?: string,
    primaryFn?: () => void;
    primaryFnText?: string;
    secondaryFn?: () => void;
    secondaryFnText?: string;
    size?: 'sm' | 'md' | 'lg'; // New size prop
}

const Modal: FC<modalProps> = (props) => {
    const {
        open,
        closeFn,
        primaryFn,
        secondaryFn,
        titleContent,
        children,
        closeFnText = "Close",
        primaryFnText = "Submit",
        secondaryFnText = "Other",
        size = "md"
    } = props;
    const modalRef = useRef(null!)
    useOnClickOutside(modalRef, () => closeFn())
    // useDisableBodyScroll(open)

    if (!open) {
        return null;
    }

    const sizeClass = {
        sm: 'max-w-sm',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
    }[size];



    return (
        <div>
            <div className="z-50 fixed inset-0 bg-zinc-900/50"></div>
            <div ref={modalRef} className={clsx("z-[60] fixed inset-0 m-auto bg-white p-5 rounded-2xl h-fit", sizeClass)}>
                <div className="modal-container ">
                    {titleContent && (<div className="title flex items-center justify-between">
                        <div className='font-medium'>
                            {titleContent}
                        </div>
                        {closeFn && (
                            <button onClick={closeFn}><RiCloseLine className='w-7 h-7' /></button>
                        )}
                    </div>
                    )}
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="flex justify-end gap-4">
                        {closeFnText && (
                            <Button variant="danger" onClick={closeFn}>{closeFnText}</Button>
                        )}
                        {secondaryFn && (
                            <Button variant="secondary" onClick={secondaryFn}>{secondaryFnText}</Button>
                        )}
                        {primaryFn && (
                            <Button variant="primary" onClick={primaryFn}>{primaryFnText}</Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Modal