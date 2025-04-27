'use client';
import NextTopLoader from 'nextjs-toploader';
const LoadingBarProvider = ({ children }: any) => {
    return (
        <>
            <NextTopLoader
                color="#336699"
                height={4}
            />
        </>
    );
};

export default LoadingBarProvider;