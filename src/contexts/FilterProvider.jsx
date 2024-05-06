import { createContext, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterContext = createContext({
  searchParam: {},
  updateFilter: () => { },
});

export const FilterProvider = ({ children }) => {

  const [searchParam, setSearchParam] = useSearchParams();

  const updateFilter = (name, value) => {

    if (!value || !value.length || value == '0') {
     searchParam.delete(name)
    } else {
      if(searchParam.get(name)){
        searchParam.set(name, value)
      }else{
        searchParam.append(name, value)
      }
    }
    setSearchParam(searchParam)
  };

  const clearFilters = () => {
    setSearchParam('');
  };

  return (
    <FilterContext.Provider value={{ searchParam, updateFilter, clearFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
