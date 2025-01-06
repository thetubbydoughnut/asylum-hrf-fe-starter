import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AppContext = createContext({});

/**
 * TODO: Ticket 2:
 * - Use axios to fetch the data
 * - Store the data
 * - Populate the graphs with the stored data
 */
const useAppContextProvider = () => {
  const [graphData, setGraphData] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(false);

  useLocalStorage({ graphData, setGraphData });

  const getFiscalData = async () => {
    // TODO: Replace this with functionality to retrieve the data from the fiscalSummary endpoint
    try {
      const fiscalDataRes = await axios.get('https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary');
      return fiscalDataRes;
    }
    catch (error) {
      console.error('Error fetching fiscal data:', error);
      return null;
    }
  };

  const getCitizenshipResults = async () => {
    // TODO: Replace this with functionality to retrieve the data from the citizenshipSummary endpoint
    try {
      const citizenshipRes = await axios.get('https://hrf-asylum-be-b.herokuapp.com/cases/citizenshipSummary');
      return citizenshipRes;
    }
    catch (error) {
      console.error('Error fetching citizenship data:', error);
      return null;
    }
  };

  const updateQuery = async () => {
    setIsDataLoading(true);
  };

  const fetchData = async () => {
    try {
      const fiscalDataResponse = await getFiscalData();
      const citizenshipDataResponse = await getCitizenshipResults();
  
      // Extract the data arrays from the response objects
      const fiscalData = fiscalDataResponse.data;
      const citizenshipData = citizenshipDataResponse.data;
  
      // Transform fiscalData into an array of objects
      const transformedFiscalData = Array.isArray(fiscalData.yearResults)
        ? fiscalData.yearResults
        : Object.keys(fiscalData).map(key => ({
            fiscal_year: key,
            ...fiscalData[key],
          }));
  
      // Ensure both are arrays and match the expected structure
      if (Array.isArray(transformedFiscalData) && Array.isArray(citizenshipData)) {
        const combinedData = {
          yearResults: transformedFiscalData, // Ensure this is an array
          citizenshipResults: citizenshipData, // Ensure this is an array
        };
        console.log('Combined Data:', combinedData); // Log the combined data
        setGraphData(combinedData);
      } else {
        console.error('Data structure is incorrect:', { transformedFiscalData, citizenshipData });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsDataLoading(false);
    }
  };

  const clearQuery = () => {
    setGraphData({});
  };

  const getYears = () => graphData?.yearResults?.map(({ fiscal_year }) => Number(fiscal_year)) ?? [];

  useEffect(() => {
    if (isDataLoading) {
      fetchData();
    }
  }, [isDataLoading]);

  return {
    graphData,
    setGraphData,
    isDataLoading,
    updateQuery,
    clearQuery,
    getYears,
  };
};

export function useAppContext() {
  return useContext(AppContext);
}

export function ProvideAppContext({ children }) {
  const contextValue = useAppContextProvider();

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}
