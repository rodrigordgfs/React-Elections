export default function CitiesSelector({ cities = [], onCityChange = null }) {
  function handleChangeCity(event) {
    if (onCityChange) {
      onCityChange(event.target.value);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <p>Escolha o município</p>
      <select
        className="border px-2 py-1 rounded-md"
        name="citiesSelector"
        id="cities"
        onChange={handleChangeCity}
      >
        {cities.map(({ id, name }) => {
          return (
            <option key={id} value={id}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
