import CitiesSelector from "../../components/CitiesSelector";
import Header from "../../components/Header";
import Main from "../../components/Main";
import { getAllCities } from "../../services/api/citiesService";
import { useEffect, useState } from "react";
import Elections from "../../components/Elections";
import { errorMessage } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ElectionsPage() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    getAllCities()
      .then(({ data }) => {
        setCities(data.sort((a, b) => a.name.localeCompare(b.name)));
        setSelectedCity(data[0]);
      })
      .catch(({ message }) => {
        errorMessage(message);
      });
  }, []);

  function handleChangeCity(cityId) {
    setSelectedCity(cities.filter((city) => city.id === cityId)[0]);
  }

  return (
    <div>
      <Header title="React Elections" color="bg-red-500" />

      <Main>
        <CitiesSelector cities={cities} onCityChange={handleChangeCity} />
        {selectedCity && <Elections city={selectedCity} />}
      </Main>
      <ToastContainer />
    </div>
  );
}
