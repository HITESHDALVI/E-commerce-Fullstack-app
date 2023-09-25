import React, {createContext, useState} from 'react';

const UserType = createContext();

type Props = {
  children: React.ReactNode;
};

const UserContext = (props: Props) => {
  const {children} = props;
  const [userId, setUserId] = useState('');
  return (
    <UserType.Provider value={{userId, setUserId}}>
      {children}
    </UserType.Provider>
  );
};

export {UserType, UserContext};
