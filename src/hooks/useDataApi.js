import { useState, useEffect } from "react";
import axios from "axios";

/**
 * @description hook for fetching data from url
 * @param {string} initialUrl 
 * @param {object} initialData
 * @param {function} fetchMethod
 * @returns {array}
 */
export const useDataApi = (initialUrl, initialData, fetchMethod=axios) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await fetchMethod(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};
