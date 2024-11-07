import { createContext, useState } from "react";

const PersonnelContext = createContext();

const PersonnelProvider = ({ children }) => {
  const [personnel, setPersonnel] = useState({});
  const [personnelList, setPersonnelList] = useState([]);

  console.log(personnel);
  console.log(personnelList);

  return (
    <PersonnelContext.Provider
      value={{ personnel, setPersonnel, personnelList, setPersonnelList }}
    >
      {children}
    </PersonnelContext.Provider>
  );
};

export { PersonnelContext, PersonnelProvider };
