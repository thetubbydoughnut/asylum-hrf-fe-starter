import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

// Create a context to share data across components
const AppContext = createContext({});

// Function to provide data and actions to components
const useAppContextProvider = () => {
  // State to hold the data for graphs
  const [graphData, setGraphData] = useState({});
  // State to track if data is being loaded
  const [isDataLoading, setIsDataLoading] = useState(false);

  // Custom hook to save and load data from local storage
  useLocalStorage({ graphData, setGraphData });

  // Function to get fiscal data from an online source
  const getFiscalData = async () => {
    try {
      const response = await axios.get('https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary');
      return response.data; // Return the data received
    } catch (error) {
      console.error('Error fetching fiscal data:', error);
      return null; // Return null if there's an error
    }
  };

  // Function to get citizenship data from an online source
  const getCitizenshipResults = async () => {
    try {
      const response = await axios.get('https://hrf-asylum-be-b.herokuapp.com/cases/citizenshipSummary');
      return response.data; // Return the data received
    } catch (error) {
      console.error('Error fetching citizenship data:', error);
      return null; // Return null if there's an error
    }
  };

  // Function to fetch and prepare data for graphs
  const fetchData = async () => {
    try {
      const fiscalData = await getFiscalData();
      const citizenshipData = await getCitizenshipResults();

      // Transform fiscal data into an array if needed
      const transformedFiscalData = Array.isArray(fiscalData.yearResults)
        ? fiscalData.yearResults
        : Object.keys(fiscalData).map(key => ({
            fiscal_year: key,
            ...fiscalData[key],
          }));

      // Check if both data sets are arrays and set them for graphs
      if (Array.isArray(transformedFiscalData) && Array.isArray(citizenshipData)) {
        setGraphData({
          yearResults: transformedFiscalData,
          citizenshipResults: citizenshipData,
        });
      } else {
        console.error('Data structure is incorrect:', { transformedFiscalData, citizenshipData });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsDataLoading(false); // Stop loading indicator
    }
  };

  // Function to start loading data
  const updateQuery = async () => {
    setIsDataLoading(true);
  };

  // Function to clear the current data
  const clearQuery = () => {
    setGraphData({});
  };

  // Function to get a list of years from the data
  const getYears = () => graphData?.yearResults?.map(({ fiscal_year }) => Number(fiscal_year)) ?? [];

  // Automatically fetch data when loading state changes
  useEffect(() => {
    if (isDataLoading) {
      fetchData();
    }
  }, [isDataLoading]);

  // Provide data and actions to components that need them
  return {
    graphData,
    setGraphData,
    isDataLoading,
    updateQuery,
    clearQuery,
    getYears,
  };
};

// Hook to use the shared data in components
export function useAppContext() {
  return useContext(AppContext);
}

// Component to wrap parts of the app that need access to the context
export function ProvideAppContext({ children }) {
  const contextValue = useAppContextProvider();

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}
