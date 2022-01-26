import cn from "classnames";
import React, { useState } from "react";
import styles from "./sidebar.module.scss";
import { MdClose, MdMenu } from "react-icons/md";
import { useHistory, useLocation } from "react-router-dom";
import { routeLabel, routes } from "../../routes";

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const toggleMenu = () => {
    setOpen(!open);
  };

  const navigate = (href: string) => {
    toggleMenu();

    history.push(href);
  };

  const menuItems = [
    {
      label: "Home",
      href: routes.home,
    },
    {
      label: "Exercise Library",
      href: routes.availableExercises,
    },
    {
      label: "Track",
      href: routes.track,
    },
    {
      label: "Exercise History",
      href: routes.history,
    },
  ];

  if (location && location.pathname === "/login") {
    return null;
  }

  return (
    <>
      <div className={cn(styles["menu-header"])}>
        <button onClick={toggleMenu}>
          <MdMenu />
        </button>
        <h3>{routeLabel(location.pathname)}</h3>
        <div
          id="action-portal"
          className={cn(styles["menu-action-portal"])}
        ></div>
      </div>
      <div className={cn(styles.menu, !open && styles.closed)}>
        <div className={cn(styles["close-menu-container"])}>
          <button onClick={toggleMenu}>
            <MdClose />
          </button>
        </div>
        <ul>
          {menuItems.map((menuItem) => {
            return (
              <li key={menuItem.label}>
                <button
                  onClick={() => navigate(menuItem.href)}
                  className={cn(styles["menu-link"])}
                >
                  {menuItem.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SideBar;
