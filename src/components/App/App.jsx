import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import { coordinates, apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { getItems, addItem, deleteItem } from "../../utils/api";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { register, login } from "../../utils/auths";
import UserContext from "../../contexts/UserContext";
import { getUserInfo } from "../../utils/auths";
import { updateUserProfile } from "../../utils/api";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import api from "../../utils/api";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const openEditProfileModal = () => setIsEditProfileOpen(true);

  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");

    updateUserProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setUser(updatedUser);
        setIsEditProfileOpen(false);
      })
      .catch((err) => console.error("Profile update error:", err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    getUserInfo(token)
      .then((data) => {
        setUser(data);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Token invalid:", err);
        localStorage.removeItem("jwt");
      });
  }, []);

  const handleAddItem = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");

    if (!user) return;

    addItem(
      {
        name,
        imageUrl,
        weather,
        owner: user._id,
      },
      token
    )
      .then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
        closeActiveModal();
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteItem = (id) => {
    const token = localStorage.getItem("jwt");
    deleteItem(id, token)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((err) => console.error(err));
  };

  const openRegisterModal = () => setIsRegisterOpen(true);
  const openLoginModal = () => setIsLoginOpen(true);

  const closeAllModals = () => {
    setActiveModal("");
    setIsRegisterOpen(false);
    setIsLoginOpen(false);
    setIsConfirmOpen(false);
    setIsEditProfileOpen(false);
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    register({ name, avatar, email, password })
      .then(() => {
        return login({ email, password });
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);

        return getUserInfo(data.token);
      })
      .then((userData) => {
        setUser(userData);
        closeAllModals();
      })
      .catch((err) => console.error("Registration/Login Error:", err));
  };

  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);

        return getUserInfo(data.token);
      })
      .then((userData) => {
        setUser(userData);
        closeAllModals();
        navigate("/");
      })
      .catch((err) => console.error("Login Error:", err));
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    if (!isLiked) {
      api
        .addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <CurrentUserContext.Provider value={user}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page">
            <div className="page__content">
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
                onLoginClick={openLoginModal}
                onRegisterClick={openRegisterModal}
                isLoggedIn={isLoggedIn}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      setClothingItems={setClothingItems}
                      onSelectCard={handleCardClick}
                      onCardLike={handleCardLike}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile
                        onCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        setClothingItems={setClothingItems}
                        handleAddClick={handleAddClick}
                        onEditProfile={openEditProfileModal}
                        onSignOut={handleSignOut}
                        onCardLike={handleCardLike}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>

            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
              onAddItem={handleAddItem}
            />
            <ItemModal
              isOpen={activeModal === "preview"}
              card={selectedCard}
              onClose={closeActiveModal}
              openConfirmModal={() => setIsConfirmOpen(true)}
            />

            <DeleteConfirmModal
              isOpen={isConfirmOpen}
              onClose={() => setIsConfirmOpen(false)}
              onConfirm={() => {
                handleDeleteItem(selectedCard._id);
                setIsConfirmOpen(false);
                closeActiveModal();
              }}
            />

            <RegisterModal
              isOpen={isRegisterOpen}
              onClose={closeAllModals}
              onRegister={handleRegister}
            />

            <LoginModal
              isOpen={isLoginOpen}
              onClose={closeAllModals}
              onLogin={handleLogin}
            />

            <EditProfileModal
              isOpen={isEditProfileOpen}
              onClose={() => setIsEditProfileOpen(false)}
              onSubmit={handleEditProfile}
              currentUser={user}
            />

            <Footer />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
