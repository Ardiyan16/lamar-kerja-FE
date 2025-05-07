import { Spinner2 } from "@/components/pages/form/button";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";
import { AnchorHTMLAttributes, ComponentProps, FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(
    ["flex", "items-center", "justify-center", "transition-colors", "duration-300"],
    {
        variants: {
            variant: {
                default: ["bg-gray-300 text-gray-800"],
                primary: ["text-white", "bg-primary", "hover:bg-primary1"],
                secondary: ["text-white", "bg-purple-500", "dark:bg-purple-600", "hover:bg-purple-600"],
                success: ["text-white", "bg-emerald-500", "dark:bg-emerald-600", "hover:bg-emerald-600"],
                info: ["text-white", "bg-cyan-500", "dark:bg-cyan-600", "hover:bg-cyan-600"],
                warning: ["text-white", "bg-amber-500", "dark:bg-amber-600", "hover:bg-amber-600"],
                danger: ["text-white", "bg-red-500", "dark:bg-red-600", "hover:bg-red-600"],
                light: ["bg-white text-gray-800"],
                dark: ["bg-gray-800 text-gray-200"],
                transparent: ["bg-none"]
            },
            size: {
                default: ["px-4", "py-2", "text-base",],
                xs: ["px-2", "h-7", "text-xs"],
                sm: ["px-3", "h-8", "text-sm"],
                lg: ["px-6", "h-12", "text-lg"],
                xl: ["px-8", "h-14", "text-xl"],
                icon: ["min-w-10", "aspect-square"],
                "icon-sm": ["min-w-8", "aspect-square"]
            },
            rounded: {
                default: "rounded",
                full: "rounded-full",
                none: "rounded-none",
            },
            shadow: {
                default: "shadow-md",
                sm: "shadow-sm",
                lg: "shadow-lg",
                none: "shadow-none",
            },
            disabled: {
                true: "opacity-50 cursor-not-allowed",
                false: "",
            },
            outline: {
                true: "bg-transparent border border-gray-300 dark:border-gray-700 dark:bg-transparent",
                false: "",
            },
            
        },
        compoundVariants: [
            {
                variant: "default",
                outline: true,
                class: "border-gray-300 text-gray-800",
            },
            {
                variant: "primary",
                outline: true,
                class: "border-primary text-primary hover:text-white",
            },
            {
                variant: "secondary",
                outline: true,
                class: "border-purple-500 text-purple-500",
            },
            {
                variant: "success",
                outline: true,
                class: "border-emerald-500 text-emerald-500",
            },
            {
                variant: "info",
                outline: true,
                class: "border-cyan-500 text-cyan-500",
            },
            {
                variant: "warning",
                outline: true,
                class: "border-amber-500 text-amber-500",
            },
            {
                variant: "danger",
                outline: true,
                class: "border-red-500 text-red-500",
            },
            {
                variant: "light",
                outline: true,
                class: "border-white text-white",
            },
            {
                variant: "dark",
                outline: true,
                class: "border-gray-800 text-gray-800",
            },

        ],
        defaultVariants: {
            variant: "default",
            size: "default",
            rounded: "default",
            shadow: "default",
            disabled: false,
            outline: false,
        },
    }
);

type ButtonType = VariantProps<typeof buttonStyles> &
    (ComponentProps<"button"> | AnchorHTMLAttributes<HTMLAnchorElement>) & {
        href?: string;
        icon?: ReactNode;
        iconPosition?: "left" | "right";
        type?: "button" | "submit" | "reset" | undefined;
    };

const Button = ({
    type = 'button',
    variant,
    size,
    rounded,
    shadow,
    disabled = false,
    outline,
    className,
    href,
    icon,
    iconPosition = "left",
    children,
    ...props
}: ButtonType) => {
    const isLink = !!href;

    const classes = twMerge(
        buttonStyles({ variant, size, rounded, shadow, disabled, outline }),
        className,
    );

    if (isLink) {
        return (
            <Link
                {...props as AnchorHTMLAttributes<HTMLAnchorElement>}
                href={href}
                className={classes}
            >
                {icon && iconPosition === "left" && <span className={clsx({ "mr-2": children })}>{icon}</span>}
                {children}
                {icon && iconPosition === "right" && <span className={clsx({ "ml-2": children })}>{icon}</span>}
            </Link>
        );
    }

    return (
        <button
            {...props as ComponentProps<"button">}
            disabled={disabled ? disabled : false}
            className={classes}
            type={type}
        >
            {icon && iconPosition === "left" && <span className={clsx({ "mr-2": children })}>{icon}</span>}
            {children && children}
            {icon && iconPosition === "right" && <span className={clsx({ "ml-2": children })}>{icon}</span>}
        </button>
    );
};

export default Button

interface buttonSubmit {
    loading: boolean,
    type: "button" | "submit" | "reset" | undefined,
    icon: ReactNode,
    children: any
}

export const ButtonSubmit: FC<buttonSubmit> = ({
    loading, type = "submit", icon, children
}) => {
    
    return (
        <button className={`flex items-center justify-center transition-colors duration-300 text-white ${loading ? 'bg-primary2' : 'bg-primary'}  hover:bg-primary1 px-4 py-2 text-base rounded shadow-md`} type={type}>{loading ? '' : icon} {loading ? <Spinner2 size="md" /> : children} </button>
    )

}