import React, { useState } from 'react'
import { useEffect } from 'react'
import useAuthContext from '../context/AuthContext';
import axios from "../api/axios";
import defaultImage from '../assets/news.jpg';

const Feed = () => {

  const [query, setQuery] = useState(''); // stores user search
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //FILTERS

  //by date
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  //by categories
  const categories = ['sports', 'arts and culture', 'music', 'politics', 'science and technology', 'business and finance', 'health', 'ecology', 'entertainment', 'travel and tourism'];
  const [selectedCategories, setSelectedCategories] = useState([]);
  //by sources
  const [selectedSources, setSelectedSources] = useState({
    newsAPI: true,
    nyt: true,
    guardian: true,
  });

  //accordions
  const [isCategoriesAccordionOpen, setIsCategoriesAccordionOpen] = useState(false);
  const [isSourcesAccordionOpen, setIsSourcesAccordionOpen] = useState(false);
  const [isDatesAccordionOpen, setIsDatesAccordionOpen] = useState(false);

  const { user, getUser } = useAuthContext();










  const loadNews = async (e = null, searchByUser = false) => {

    e?.preventDefault();
    
    setLoading(true);
    //accordions get closed
    setIsCategoriesAccordionOpen(false);
    setIsSourcesAccordionOpen(false);
    setIsDatesAccordionOpen(false);

    //filtra los selectedSources con valor true
    const selectedSourceKeys = Object.keys(selectedSources).filter(
      (source) => selectedSources[source]
    );

    if(searchByUser){setData([])}
  
    try {

      const queryWithCategories = selectedCategories.join(' ');

      const response = await axios.get('/api/feed', {
        params: {
          search: `${query} ${queryWithCategories}`,
          page: page,
          sources: selectedSourceKeys.join(','),
          newSearch: searchByUser,
          fromDate: fromDate,
          toDate: toDate
        },
      });
  
      const { articles } = response.data;
  
      if (page === 1) {
        setData(articles);
      } else {
        setData((prevData) => [...prevData, ...articles]);
      }
  
      setLoading(false);

    } catch (error) {

      console.log(error);
      setLoading(false);

    }
  };

  const loadMoreNews = () => {
    setPage((prevPage) => prevPage + 1);
    loadNews();
  };



  
  useEffect(() => {

    // if(!user){
    //   getUser();
    // }

    loadNews();

  }, []);







  const handleSourceChange = (source) => {
    setSelectedSources((prevSelectedSources) => ({
      ...prevSelectedSources,
      [source]: !prevSelectedSources[source],
    }));
  };


  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((c) => c !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  const clearDates = () => {
    setFromDate('');
    setToDate('');
  }


  return (
    
    <div className="container mx-auto">
      <div>{user?.name}</div>

      <div className="flex items-center">

        <form onSubmit={(e) => loadNews(e, true)} className="mr-4">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search"
            value={query}
            className="w-fit p-3"
          />
          <button
            type="submit"
            className="w-fit p-3 bg-indigo-500 hover:bg-indigo-700 rounded-md text-white"
          >
            SEARCH
          </button>
        </form>

        {/* Categories Accordion */}
        <div className="relative">
          <button
            onClick={() => setIsCategoriesAccordionOpen(!isCategoriesAccordionOpen)}
            className="w-fit p-3 bg-indigo-500 hover:bg-indigo-700 rounded-md text-white"
          >
            Select Categories
          </button>
          {isCategoriesAccordionOpen && (
            <div className="absolute mt-2 w-64 bg-white rounded-md shadow-lg">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center py-2 px-4 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="mr-2"
                  />
                  {category}
                </label>
              ))}
            </div>
          )}
        </div>

    {/* Sources Accordion */}
    <div className="relative">
      <button
        onClick={() => setIsSourcesAccordionOpen(!isSourcesAccordionOpen)}
        className="w-fit p-3 bg-indigo-500 hover:bg-indigo-700 rounded-md text-white"
      >
        Select Sources
      </button>
      {isSourcesAccordionOpen && (
        <div className="absolute mt-2 w-64 bg-white rounded-md shadow-lg">
          <label className="flex items-center py-2 px-4 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedSources.newsAPI}
              onChange={() => handleSourceChange('newsAPI')}
              className="mr-2"
            />
            NewsAPI
          </label>
          <label className="flex items-center py-2 px-4 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedSources.nyt}
              onChange={() => handleSourceChange('nyt')}
              className="mr-2"
            />
            The New York Times
          </label>
          <label className="flex items-center py-2 px-4 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedSources.guardian}
              onChange={() => handleSourceChange('guardian')}
              className="mr-2"
            />
            The Guardian
          </label>
        </div>
      )}
    </div>

    {/* Dates Accordion */}
      <div className="relative">
        <button
          onClick={() => setIsDatesAccordionOpen(!isDatesAccordionOpen)}
          className="w-fit p-3 bg-indigo-500 hover:bg-indigo-700 rounded-md text-white"
        >
          Filter by Date
        </button>
        {isDatesAccordionOpen && (
          <div className="absolute mt-2 w-64 bg-white rounded-md shadow-lg">
            <div className="flex items-center py-2 px-4 cursor-pointer">
              <label htmlFor="from-date-input" className="mr-2">
                from:
              </label>
              <input
                id="from-date-input"
                type="date"
                onChange={(e) => setFromDate(e.target.value)}
                className="mr-2"
                value={fromDate}
              />
            </div>
            <div className="flex items-center py-2 px-4 cursor-pointer">
              <label htmlFor="to-date-input" className="mr-2">
                to:
              </label>
              <input
                id="to-date-input"
                type="date"
                onChange={(e) => setToDate(e.target.value)}
                className="mr-2"
                value={toDate}
              />
            </div>
            <button onClick={clearDates}>Clear</button>
          </div>
        )}
      </div>
      </div>


    {/* DATA */}
      <div className="bg-white/50 p-3 my-10 grid grid-cols-1 md:grid-cols-2 gap-4">

        {data &&
          data.map((article) => (
            <div key={article.id} className="bg-white p-4 my-5">
              <a href={article.id} target="_blank">
                <h1 className="text-3xl p-3 text-cyan-700">{article.title}</h1>
                <div className="px-3 py-1 my-2 flex justify-between">
                  <span className="font-medium">{article.source}</span>
                  <span className="font-medium">
                    {article.date.substring(0, article.date.indexOf("T"))}
                  </span>
                </div>
                <span className="font-medium text-orange-600 px-3">
                  {article.author}
                </span>
                <img
                  src={article.image || defaultImage}
                  alt={article.title}
                  loading="lazy"
                  className="my-3"
                />
                <p className="p-4">{article.content}</p>
              </a>
            </div>
          ))}
          
          {loading && <div>Loading news...</div>}
          
      </div>

      

      {!loading && data.length > 0 && (
        <button
          onClick={loadMoreNews}
          className="w-fit p-3 bg-indigo-500 hover:bg-indigo-700 rounded-md text-white"
        >
          Load More
        </button>
      )}
    </div>
  )
}

export default Feed