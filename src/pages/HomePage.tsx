import landingImage from "../assets/landing.png"
import appDownload from "../assets/appDownload.png"
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`,
        })
    }
    return (
        <div className="md:px-32 flex flex-col gap-12">
            <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-4xl font-bold tracking-tight text-orange-600">
                    Treat your taste buds to a feast of flavors today!
                </h1>
                <span className="text-xl">Halt your hunger with just one click!</span>
                <SearchBar
                    placeHolder="Search by City or Town"
                    onSubmit={handleSearchSubmit}
                />
            </div><div className="bg-white rounded-lg shadow-md bg-orange py-8 flex flex-col gap-5 text-center mx-5">
                <h3 className="text-3xl font-bold text-orange-500">Our Current Outlets:</h3>
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-4  text-xl text-gray-700 w-full">
                        <div className="hidden md:flex"></div> {/* Placeholder for spacing on small screens */}
                        <div className="flex flex-col items-center">
                            <ul className="list-disc">
                                <li>Kakinada</li>
                                <li>Vijayawada</li>
                                <li>Vizag</li>
                            </ul>
                        </div>
                        <div className="flex flex-col items-center">
                            <ul className="list-disc list-outside">
                                <li>Nellore</li>
                                <li>Guntur</li>
                                <li>Tada</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>




            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingImage} />
                <div className="flex flex-col intems-center justify-center gap-4 text-center">
                    <span className="font-bold text-3xl tracking-tighter">
                        Order takeaway even faster!
                    </span>
                    <span>
                        Download the HungerHalt App for faster ordering and personalised recommendations
                    </span>
                    <img src={appDownload} className="block mx-auto w-1/2" />
                </div>
            </div>
        </div>
    )
}

export default HomePage;