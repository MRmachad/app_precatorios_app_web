import { useContext } from "react";
import { AuthContext } from "../context";

export const possuiPermissaoDeAcesso = (permissions: string[]): boolean => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useContext(AuthContext);

  if (permissions == undefined || permissions.length == 0) return true;

  const userPermissions = user != null ? user.claims.map((c) => c.value) : [];

  return (
    permissions.filter(
      (perm) =>
        userPermissions.includes(perm) ||
        userPermissions.includes("Administrador")
    ).length > 0
  );
};
