import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import UserContext from "../../contexts/UserContext";

function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const { user: currentUser } = useContext(UserContext);

  const userWeatherItems = clothingItems.filter(
    (item) => item.weather === weatherData.type
  );

  return (
    <main>
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>

        <ul className="cards__list">
          {userWeatherItems.map((item) => (
            <ItemCard
              key={item._id || item.name}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
