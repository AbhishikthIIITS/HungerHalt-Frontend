import landingImage from "../assets/landing.png";
import appDownload from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`,
        });
    };

    const handleCityClick = (city: string) => {
        navigate({
            pathname: `/search/${city}`,
        });
    };

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
            </div>
            <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center mx-5">
                <h3 className="text-3xl font-bold text-orange-500">Our Current Outlets:</h3>
                <div className="flex justify-center">
                    <div className="flex flex-wrap gap-4 justify-center text-xl text-gray-500 w-full">
                        {['Kakinada', 'Vijayawada', 'Vizag', 'Nellore', 'Guntur', 'Tada'].map(city => (
                            <button
                                key={city}
                                onClick={() => handleCityClick(city)}
                                className="border border-blue-300 text-blue-500 bg-blue-100 rounded-lg px-6 py-2 font-medium shadow hover:bg-blue-200 transition duration-300 ease-in-out"
                            >
                                {city}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingImage} alt="Landing" />
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className="font-bold text-3xl tracking-tighter">
                        Order takeaway even faster!
                    </span>
                    <span>
                        Download the HungerHalt App for faster ordering and personalised recommendations
                    </span>
                    <img src={appDownload} className="block mx-auto w-1/2" alt="App Download" />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
