import { useState, useEffect } from "react";
import axios from "axios";

/**
 * @description hook for fetching data from url
 * @param {*} initialUrl 
 * @param {*} initialData 
 * @returns {Array}
 */
export const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(true);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};
