import { useEffect, useState } from "react";

import Dashboard from "../../Layouts/Dashboard";
import PageWithMenu from "../../Layouts/PageWithMenu";
import Menu from "../../components/Menu";

import Section from "./components/Section";

import { IStatus } from "../../models/sidebar.model";
import { theme } from "../../theme";
import { useLocation } from "react-router-dom";

const Vendas = () => {
  const location = useLocation();
  const menuBack =
    parseInt(window.location.href?.split("menu=")[1]?.split("?")[0]) || null;
  const [status, setStatus] = useState<IStatus>({
    title: "Vendas",
    menu: menuBack || 1,
  });

  useEffect(() => {
    document.title = `${theme.content.project} - Vendas`;

    const menuPath = parseInt(
      location.search?.split("menu=")[1]?.split("?")[0],
    );

    if (location?.search) {
      setStatus({
        title: "Vendas",
        menu: menuPath,
      });
    }
  }, [location.search]);

  return (
    <Dashboard menu={<Menu />}>
      <PageWithMenu
        section={<Section menu={status.menu} />}
      />
    </Dashboard>
  );
};

export default Vendas;
