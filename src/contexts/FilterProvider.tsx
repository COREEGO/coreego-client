import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

interface FilterContextType {
  params: Record<string, string>;
  updateFilter: (name: string, value: string) => void;
}

const FilterContext = createContext<FilterContextType>({
  params: {},

  updateFilter: () => {},
});

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const [params, setParams] = useState<FilterContextType['params']>({});

  const updateFilter = (name: string, value: string) => {
    // Mettez à jour les paramètres en utilisant une copie des paramètres existants.
    // Utilisez le nom comme clé dynamique en utilisant des crochets.
    if (!value || !value.length) {
      // Si la valeur est vide, supprimez la clé de paramètre.
      const updatedParams = { ...params };
      delete updatedParams[name];
      setParams(updatedParams);
    } else {
      setParams((prevParams) => ({
        ...prevParams,
        [name]: value,
      }));
    }
  };

  // const values = useMemo(() => {
  //   return setSearchParams(params);
  // }, [params]);



  return (
    <FilterContext.Provider value={{ params, updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
