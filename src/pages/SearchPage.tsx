import { useSearchRestaurants } from "@/api/RestaurantApi";
import SearchResultInfo from "@/components/SearchResultInfo";
import SearchResultCard from "@/components/SearchResultCard";
import { useParams } from "react-router-dom";
import { useState } from "react";
import SearchBar, { SearchForm } from "@/components/SearchBar";

export type SearchState = {
  searchQuery: string;
}

const SearchPage = () => {
  const { city } = useParams();
  // const { SearchState, setSearchState} = useState<SearchState>({
  //   searchQuery: ""
  // })
  const { results, isLoading } = useSearchRestaurants(city);

  // const setSearchQuery = (searchFormdata: SearchForm) => {

  // }

  if(isLoading) {
    return <span>Loading....</span>
  }

  if(!results?.data || !city){
    return <span>No results found</span>
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        Insert cuisines here :)
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar onSubmit={setSearchQuery}/>
        <SearchResultInfo total={results.pagination.total} city={city}/>
        {results.data.map((restaurant)=>(
          <SearchResultCard restaurant={restaurant}/>
        ))}
      </div>
    </div>
  )
}

export default SearchPage;