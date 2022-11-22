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
        console.log("Result is ", result)
      } catch (error) {
        setIsError(true);
        console.log("Error while fetchinf is", error.message)
      }

      setIsLoading(false);
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};
