import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from '../js/api.js';
import SearchViewModal from "./SearchViewModal.jsx";

const SearchView = () => {

    //Hook
    const location = useLocation();
    const { search } = location.state;
    const [searchMv, setSearchMv] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const fetchData = async (searchTerm) => {
            try {
            const response = await api.get(`/search/movie`, {
                params: {
                query: searchTerm,
                },
            });
        setSearchMv(response.data.results); // 검색 결과를 상태에 업데이트
            } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

        if (search) {
        fetchData(search); // 검색어가 있을 때 fetchData 호출
    }

    }, [search]); // search 값이 변경될 때마다 fetchData 다시 호출


    // Handler
    
    const movieInfoClickHandler = (movie) => {
        setSelectedMovie(movie);
    }

    const closeModal = () => {
        setSelectedMovie(null);
        
    }

    return (
        <div className="content-list">
          <h2 className="info">"{search}"에 대한 검색 결과</h2>
          <div className="search-results">
            {searchMv && searchMv.length > 0 ? (
              searchMv.map((movie) => (
                <div key={movie.id} className="movie" onClick={() => movieInfoClickHandler(movie)}>
                  <img
                    src={`http://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h3>{movie.title}</h3>
                </div>
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </div>
          {selectedMovie && (
            <SearchViewModal movieInfo={selectedMovie} closeModal={closeModal} />
            )}
        </div>
      );
};

export default SearchView;
