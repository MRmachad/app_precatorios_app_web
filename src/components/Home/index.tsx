import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import pluginConfig from "../../../plugin.config.json"

import { HomeContainer, ModulosContainer, RecursosContainer } from "./styles";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export function Home() {
  return (
    <HomeContainer>
      {pluginConfig.modules.map((rm, im) => {
        return (
          <ModulosContainer key={im}>
            <h3>{rm.name}</h3>
            <RecursosContainer>
              {rm.resources.map((rr, ir) => {
                return (
                  <a href={`/${rm.id}/${rr.id}`} key={ir}>
                    <header>
                      <p>{rm.name}</p>
                    </header>
                    <div>
                      {rr.name}
                      <span>
                        <FontAwesomeIcon icon={rm.icon as IconProp} />
                      </span>
                    </div>
                  </a>
                );
              })}
            </RecursosContainer>
          </ModulosContainer>
        );
      })}
    </HomeContainer>
  );
}
