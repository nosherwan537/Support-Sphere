import Image from "next/image";
import "./utility.css";

export default function Home() {
    return (
        <div className="flex justify-center flex-col items-center">
            <h1 className="text-white flex justify-center text-3xl relative bottom-1 jersey-25-regular">
                SupportSphere
            </h1>
            <div>
                <span>
                    <img className="h-44 rounded-md" src="/giphy.gif" alt="" />
                </span>
            </div>
            <div className="relative top-3">
                <button
                    type="button"
                    class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                    Start
                </button>
                <button
                    type="button"
                    class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                    Support
                </button>
            </div>
            <div className="bg-white w-full h-1 flex relative top-4"></div>
            <div className="flex flex-col md:flex-row relative top-14 md:gap-40 gap-6 text-white montserrat-regular items-center md:items-start w-full">
                <div className="flex flex-col items-center text-center w-full md:w-auto mx-auto">
                    <img
                        className="h-20 w-20 rounded-full"
                        src="kid.avif"
                        alt=""
                    />
                    <h1 className="font-bold">Smooth Work</h1>
                    <p className="text-sm">
                        Get reward and support for work you do
                    </p>
                </div>
                <div className="flex flex-col items-center text-center w-full md:w-auto mx-auto">
                    <img
                        className="h-20 rounded-full w-20"
                        src="coin.gif"
                        alt=""
                    />
                    <h1 className="font-bold">Get Funded</h1>
                    <p className="text-sm">Get funds for financial support</p>
                </div>
                <div className="flex flex-col items-center text-center w-full md:w-auto mx-auto">
                    <img
                        className="h-20 rounded-full w-20"
                        src="support.gif"
                        alt=""
                    />
                    <h1 className="font-bold">Build Community</h1>
                    <p className="text-sm">
                        You and your audience build a strong connection
                    </p>
                </div>
            </div>
        </div>
    );
}
