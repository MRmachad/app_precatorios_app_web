import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Icon,
  MenuButton,
  MenuContainer,
  MenuItem,
  SideContainer,
  SubMenuItem,
} from "./styles";

import pluginConfig from "../../../plugin.config.json";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export function Menu() {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState<number>(0);

  return (
    <div>
      <MenuContainer isOpen={isOpen}>
        <header>{isOpen && <p>APP Precatorios</p>}</header>
        <MenuButton
          onClick={() => {
            if (isOpen) {
              setSelectedMenuItem(0);
            }
            setIsOpen(!isOpen);
          }}
          isOpen={isOpen}
        >
          <small>
            <FontAwesomeIcon icon={isOpen ? "angles-left" : "angles-right"} />
          </small>
        </MenuButton>
        <div className="menuContent">
          <header>{isOpen && <p>Menu</p>}</header>
          <section>
            <ul className={location.pathname === "/" ? "active" : "inactive"}>
              <MenuItem href="/">
                <div>
                  <small>
                    <Icon isOpen={isOpen} icon="home" />
                  </small>

                  {isOpen && <>Home</>}
                </div>
              </MenuItem>
            </ul>
            {pluginConfig.modules.map((module, im) => {
              return (
                <ul
                  key={im}
                  className={`${im + 1 === selectedMenuItem ? "selected" : ""} 
                ${
                  module.resources.find(
                    (res) => `/${module.id}/${res.id}` === location.pathname
                  )
                    ? "active"
                    : "inactive"
                }`}
                >
                  <MenuItem
                    className={im + 1 === selectedMenuItem ? "selected" : ""}
                    onClick={() => {
                      if (!isOpen) {
                        setIsOpen(true);
                      }

                      if (im + 1 === selectedMenuItem) {
                        setSelectedMenuItem(0);
                      } else {
                        setSelectedMenuItem(im + 1);
                      }
                    }}
                  >
                    <div>
                      <small>
                        <Icon isOpen={isOpen} icon={module.icon as IconProp} />
                      </small>

                      {isOpen && <>{module.name}</>}
                    </div>
                    {isOpen && <FontAwesomeIcon icon="angle-right" />}
                  </MenuItem>
                  {isOpen &&
                    module.resources.map((resource, ir) => {
                      return (
                        <li
                          key={ir}
                          className={
                            location.pathname === `/${module.id}/${resource.id}`
                              ? "active"
                              : "inactive"
                          }
                        >
                          <SubMenuItem href={`/${module.id}/${resource.id}`}>
                            {resource.name}
                          </SubMenuItem>
                        </li>
                      );
                    })}
                </ul>
              );
            })}
          </section>
        </div>
      </MenuContainer>
    </div>
  );
}
