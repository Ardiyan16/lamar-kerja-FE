import banner from '@/public/images/background.png'
import Image from 'next/image'
import Link from 'next/link'
import { RiArrowRightUpLine, RiNumber1, RiNumber2, RiNumber3, RiPagesLine, RiRegisteredLine, RiUser2Line } from 'react-icons/ri'

const CompanyHomePage = () => {

    return (
        <div>
            <BannerCompanyHome />
            <section className='why-me'>
                <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                    <div className="relative p-6 md:p-16">
                        <WhyMe />
                    </div>
                </div>
            </section>
            <section className='stepbystep bg-primary'>
                <div className='px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
                    <h1 className="text-zinc-50 text-4xl text-center">Langkah Langkah Posting Iklan Lowongan Kerja</h1>
                    <div className="relative p-10 md:p-20 flex justify-center">
                        <StepPostings />
                    </div>
                </div>
            </section>
            <section className="satistic mt-16">
                <h1 className="text-primary font-extrabold text-4xl text-center">Kami Membangun Lingkungan Terpercaya</h1>
                <Statistic />
            </section>
        </div>
    )

}

const BannerCompanyHome = () => {
    return (
        <section className="bg-primary n">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-zinc-50">Pasang infomasi lowongan kerja gratis!</h1>
                    <p className="max-w-2xl mb-6 font-light text-zinc-200 lg:mb-8 md:text-lg lg:text-xl">Kami menyediakan akses untuk anda menemukan tanlenta tanlenta terbaik di bidangnya. Pasang lowongan kerja gratis dan cari talenta sesuai kebutuhan perusahaan anda.</p>
                    <Link href="/masuk-perusahaan" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-zinc-50 border border-primary2 rounded-lg hover:bg-primary2 focus:ring-4 focus:ring-gray-100 ml-">
                        <RiArrowRightUpLine className='animate-bounce mr-2' /> Pasang Lowongan Sekarang
                    </Link>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <Image src={banner} className="image w-[800px] max-w-[500px] md:max-w-[700px] lg:max-w-[800px] h-[500px] max-h-[300px] md:max-h-[500px] lg:max-h-[600px]" width={0} height={0} alt="banner" />
                </div>
            </div>
        </section>
    )
}

const WhyMe = () => {
    return (
        <div>
            <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
                <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
                    <h2 className="text-2xl text-gray-800 font-bold sm:text-3xl dark:text-neutral-200">
                        Kenapa Memilih Kami ?
                    </h2>

                    <nav className="grid gap-4 mt-5 md:mt-10" aria-label="Tabs" role="tablist" aria-orientation="vertical">
                        <button type="button" className="hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-primary2 focus:outline-hidden focus:bg-primary2 p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-neutral-700 active" id="tabs-with-card-item-1" aria-selected="true" data-hs-tab="#tabs-with-card-1" aria-controls="tabs-with-card-1" role="tab">
                            <span className="flex gap-x-6">
                                <RiPagesLine className="shrink-0 mt-2 size-6 md:size-7 hs-tab-active:text-blue-600 text-zinc-50 dark:hs-tab-active:text-blue-500" />
                                <span className="grow">
                                    <span className="block text-lg font-semibold hs-tab-active:text-blue-600 text-zinc-50 dark:hs-tab-active:text-blue-500">Posting Lowongan Gratis</span>
                                    <span className="block mt-1 text-zinc-50 dark:hs-tab-active:text-gray-200">Anda dapat memposting iklan lowongan kerja gratis dan mudah.</span>
                                </span>
                            </span>
                        </button>

                        <button type="button" className="hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-primary2 focus:outline-hidden focus:bg-primary2 p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-neutral-700" id="tabs-with-card-item-2" aria-selected="false" data-hs-tab="#tabs-with-card-2" aria-controls="tabs-with-card-2" role="tab">
                            <span className="flex gap-x-6">
                                <RiUser2Line className='shrink-0 mt-2 size-6 md:size-7 hs-tab-active:text-blue-600 text-zinc-50 dark:hs-tab-active:text-blue-500' />
                                <span className="grow">
                                    <span className="block text-lg font-semibold hs-tab-active:text-blue-600 text-zinc-50 dark:hs-tab-active:text-blue-500">Jangkauan Luas</span>
                                    <span className="block mt-1 text-zinc-50 dark:hs-tab-active:text-gray-200">Kami memiliki ribuan talenta pencari kerja aktif di seluruh Indonesia dengan keahlian dan kemampuan sesuai bidang yang dibutuhkan.</span>
                                </span>
                            </span>
                        </button>

                        <button type="button" className="hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-primary2 focus:outline-hidden focus:bg-primary2 p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-neutral-700" id="tabs-with-card-item-3" aria-selected="false" data-hs-tab="#tabs-with-card-3" aria-controls="tabs-with-card-3" role="tab">
                            <span className="flex gap-x-6">
                                <svg className="shrink-0 mt-2 size-6 md:size-7 hs-tab-active:text-blue-600 text-zinc-50 dark:hs-tab-active:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></svg>
                                <span className="grow">
                                    <span className="block text-lg font-semibold hs-tab-active:text-blue-600 text-zinc-50 dark:hs-tab-active:text-blue-500">Brand Exposure</span>
                                    <span className="block mt-1 text-zinc-50 dark:hs-tab-active:text-gray-200">Tingkatkan citra perusahaan di depan calon pegawai potensial.</span>
                                </span>
                            </span>
                        </button>
                    </nav>
                </div>


                <div className="lg:col-span-6">
                    <div className="relative">
                        <div>
                            <div id="tabs-with-card-1" role="tabpanel" aria-labelledby="tabs-with-card-item-1">
                                <img className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/20" src="https://img.freepik.com/free-photo/business-executives-doing-video-conference_1170-1924.jpg?t=st=1745897838~exp=1745901438~hmac=edc12a7509431a7de730c97ad6b7ef00419e3d2abe25e0f78c1a719abee127d2&w=826" alt="Features Image" />
                            </div>
                        </div>
                        <div className="hidden absolute top-0 end-0 translate-x-20 md:block lg:translate-x-20">
                            <svg className="w-16 h-auto text-primary2" width="121" height="135" viewBox="0 0 121 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                                <path d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                                <path d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 grid grid-cols-12 size-full">
                <div className="col-span-full lg:col-span-7 lg:col-start-6 bg-primary w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full"></div>
            </div>
        </div>
    )
}

const StepPostings = () => {

    return (
        <div>

            <div className="group relative flex gap-x-5 mx-40">
                <div className="relative group-last:after:hidden after:absolute after:top-8 after:bottom-2 after:start-3 after:w-px after:-translate-x-[0.5px] after:bg-zinc-50">
                    <div className="relative z-10 size-6 flex justify-center items-center">
                        <RiNumber1 className='shrink-0 size-6 text-zinc-50' />
                    </div>
                </div>

                <div className="grow pb-8 group-last:pb-0">
                    <h3 className="mb-1 text-4xl text-zinc-50">
                        Langkah 1
                    </h3>

                    <p className="font-semibold text-2xl text-gray-800 dark:text-neutral-200">
                        Daftar Akun
                    </p>

                    <Link href="/perusahaan/register" className="hidden md:flex px-3 py-2 rounded-md text-white bg-primary border border-primary2 hover:bg-primary2 hover:border-primary1 w-48 items-center gap-2 mt-5">
                        <RiRegisteredLine />
                        Daftar Sekarang
                    </Link>
                </div>
            </div>

            <div className="group relative flex gap-x-5 mx-40 mt-10">
                <div className="relative group-last:after:hidden after:absolute after:top-8 after:bottom-2 after:start-3 after:w-px after:-translate-x-[0.5px] after:bg-zinc-50">
                    <div className="relative z-10 size-6 flex justify-center items-center">
                        <RiNumber2 className='shrink-0 size-6 text-zinc-50' />
                    </div>
                </div>

                <div className="grow pb-8 group-last:pb-0">
                    <h3 className="mb-1 text-4xl text-zinc-50">
                        Langkah 2
                    </h3>

                    <p className="font-semibold text-2xl text-gray-800 dark:text-neutral-200">
                        Posting Iklan Lowongan Kerja
                    </p>
                </div>
            </div>

            <div className="group relative flex gap-x-5 mx-40 mt-10">
                <div className="relative group-last:after:hidden after:absolute after:top-8 after:bottom-2 after:start-3 after:w-px after:-translate-x-[0.5px] after:bg-zinc-50">
                    <div className="relative z-10 size-6 flex justify-center items-center">
                        <RiNumber3 className='shrink-0 size-6 text-zinc-50' />
                    </div>
                </div>

                <div className="grow pb-8 group-last:pb-0">
                    <h3 className="mb-1 text-4xl text-zinc-50">
                        Langkah 3
                    </h3>

                    <p className="font-semibold text-2xl text-gray-800 dark:text-neutral-200">
                        Memilih Pelamar Terbaik
                    </p>
                </div>
            </div>
        </div>
    )

}

const Statistic = () => {
    return (
        <div className="bg-white shadow-xl mb-10 rounded-md mt-5 max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="grid gap-6 grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-8">
                <div className='text-center'>
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-neutral-200">Accuracy rate</h4>
                    <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-600">99.95%</p>
                    <p className="mt-1 text-gray-500 dark:text-neutral-500">in fulfilling orders</p>
                </div>

                <div className='text-center'>
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-neutral-200">Startup businesses</h4>
                    <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-600">2,000+</p>
                    <p className="mt-1 text-gray-500 dark:text-neutral-500">partner with Preline</p>
                </div>

                <div className='text-center'>
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-neutral-200">Happy</h4>
                    <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-600">85%</p>
                    <p className="mt-1 text-gray-500 dark:text-neutral-500">this year alone</p>
                </div>
            </div>
        </div>
    )
}

export default CompanyHomePage
