import { NotFound } from "../components/NotFound";
import { DetalhesProcesso } from "../pages/ProcessoDetalhes";
import { ProcessoView } from "../pages/Relatorio/Index";


export const routes = [
  {
    path: "prec/precatorio",
    component: () => <ProcessoView />,
  },
  {
    path: "prec/precatorio/:id",
    component: () => <DetalhesProcesso />,
  },
  {
    path: "*",
    component: () => <NotFound />,
  },
];
