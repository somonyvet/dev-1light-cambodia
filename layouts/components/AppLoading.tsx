import Image from "next/image";

const AppLoading = () => {
    return <>
        <div className="fixed w-full h-full bg-body top-0 left-0 z-[99]"></div>
        <div className="fixed w-full h-full top-0 left-0 z-[999] content-center text-center p-3 text-white">
            <Image src="/icons/gear-spinner-loading.svg" alt="loading" width={50} height={50} className="block mb-3 mx-auto" priority/>
            Loading...
        </div>
    </>
}

export default AppLoading