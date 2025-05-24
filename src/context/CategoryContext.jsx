import React, { createContext, useState, useContext } from 'react';

const CategoryContext = createContext();

export const useCategories = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState({
    player1Category: 'animals',
    player2Category: 'fruits',
  });

  return (
    <CategoryContext.Provider value={{ selectedCategories, setSelectedCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};
