import { useState, useEffect } from 'react';


//---------------------------------- main function ------------------------------------------
const useCountries = () => {
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        //Get all countries from the API
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const countryNames = data.map((country: { name: { common: string } }) => country.name.common);
        setCountries(countryNames);
      } catch (error) {
        console.error("Error in retrieving countries", error)
      }
    };
    getCountries();
  }, []);

  return { countries };
};

export default useCountries;
