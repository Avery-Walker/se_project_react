import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import { coordinates, apiKey } from "../../utils/constants";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";

import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";

import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  getItems,
  addItem,
  deleteItem,
  updateUserProfile,
} from "../../utils/api";

import { register, login, getUserInfo } from "../../utils/auths";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import UserContext from "../../contexts/UserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import api from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [activeModal, setActiveModal] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => setClothingItems(items))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    getUserInfo(token)
      .then((userData) => {
        setUser(userData);
        setIsLoggedIn(true);
      })
      .catch(() => localStorage.removeItem("jwt"));
  }, []);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((unit) => (unit === "F" ? "C" : "F"));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => setActiveModal("add-item");

  const closeAllModals = () => {
    setActiveModal("");
    setIsConfirmOpen(false);
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsEditProfileOpen(false);
  };

  const handleAddItem = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    if (!user) return;

    addItem({ name, imageUrl, weather, owner: user._id }, token)
      .then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
        closeAllModals();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (id) => {
    const token = localStorage.getItem("jwt");

    deleteItem(id, token)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== id));
        closeAllModals();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    const apiCall = isLiked ? api.removeCardLike : api.addCardLike;

    apiCall(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((card) => (card._id === id ? updatedCard : card))
        );
      })
      .catch(console.error);
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    register({ name, avatar, email, password })
      .then(() => login({ email, password }))
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        return getUserInfo(data.token);
      })
      .then((userData) => {
        setUser(userData);
        closeAllModals();
      })
      .catch(console.error);
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
      .catch(console.error);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");

    updateUserProfile({ name, avatar }, token)
      .then((updated) => {
        setUser(updated);
        closeAllModals();
      })
      .catch(console.error);
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
                isLoggedIn={isLoggedIn}
                weatherData={weatherData}
                handleAddClick={handleAddClick}
                onLoginClick={() => setIsLoginOpen(true)}
                onRegisterClick={() => setIsRegisterOpen(true)}
              />

              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                    />
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile
                        clothingItems={clothingItems}
                        onCardClick={handleCardClick}
                        handleAddClick={handleAddClick}
                        onEditProfile={() => setIsEditProfileOpen(true)}
                        onSignOut={handleSignOut}
                        onCardLike={handleCardLike}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>

            <AddItemModal
              isOpen={activeModal === "add-item"}
              onClose={closeAllModals}
              onAddItem={handleAddItem}
            />

            <ItemModal
              isOpen={activeModal === "preview"}
              card={selectedCard}
              onClose={closeAllModals}
              openConfirmModal={() => setIsConfirmOpen(true)}
            />

            <DeleteConfirmModal
              isOpen={isConfirmOpen}
              onClose={() => setIsConfirmOpen(false)}
              onConfirm={() => handleDeleteItem(selectedCard._id)}
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
              onClose={closeAllModals}
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
