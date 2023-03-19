import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
   notification: null,
   showNotification: (notificationData) => {},
   hideNotification: () => {},
});

export const NotificationContextProvider = ({ children }) => {
   const [activeNotification, setActitiveNotification] = useState();

   useEffect(() => {
      if (
         activeNotification &&
         (activeNotification.status === "success" || activeNotification.status === "error")
      ) {
         const timer = setTimeout(() => {
            setActitiveNotification(null);
         }, 3000);

         return () => {
            clearTimeout(timer);
         };
      }
   }, [activeNotification]);

   const showNotificationHandler = (notificationData) => {
      setActitiveNotification(notificationData);
   };

   const hideNotificationHandler = () => {
      setActitiveNotification(null);
   };

   const context = {
      notification: activeNotification,
      showNotification: showNotificationHandler,
      hideNotification: hideNotificationHandler,
   };

   return <NotificationContext.Provider value={context}>{children}</NotificationContext.Provider>;
};

export default NotificationContext;
