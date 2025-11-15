# WTWR (What to Wear?)

## About the project

The idea of the application is pretty simple - we make a call to an API, which then responds with the daily weather forecast. We collect the weather data, process it, and then based on the forecast, we recommend suitable clothing to the user.

## Technology Used

React (with Hooks) – Built with functional components and React Hooks (useState, useEffect, useContext) for state management and lifecycle methods.

Vite – Used as the development environment and bundler for fast builds and hot reloading.

React Router – Provides client-side routing for seamless navigation between pages (e.g.: Main and Profile views).

Context API – Implements a global context to share state (like Fahrenheit/Celsius toggling) across the app.

Custom Components – Modular UI design with reusable components such as ItemModal, DeleteConfirmModal, AddItemModal, ClothesSection, SideBar, etc.

API Integration – Fetches live data using:

    OpenWeather API for real-time weather and temperature.

    Custom Clothing Items API for CRUD operations

Form Handling & Validation – Controlled form components for adding clothing items, with error handling and state updates.

Conditional Rendering – Modals and UI states are controlled with conditional classes to show/hide content.

CSS – Organized, modular CSS with BEM naming convention.

State Lifting & Prop Drilling – Higher-level components (like App) manage state and pass it down to children where necessary.

Confirmation Modals – A reusable modal system for critical actions (e.g., confirming item deletion) that improves UX and prevents accidental actions

## Links

- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)
- [Backend] (https://github.com/Avery-Walker/se_project_express)
