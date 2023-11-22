import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

interface FilterContextType {
  searchParams: any;
  updateFilter: (name: string, value: string) => void;
}

const FilterContext = createContext<FilterContextType>({
  searchParams: {},
  updateFilter: () => { },
});

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const updateFilter = (name: string, value: string) => {

    if (!value || !value.length) {
     searchParams.delete(name)
    } else {
      if(searchParams.get(name)){
        searchParams.set(name, value)
      }else{
        searchParams.append(name, value)
      }
    }
    setSearchParams(searchParams)
  };


  return (
    <FilterContext.Provider value={{ searchParams, updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
