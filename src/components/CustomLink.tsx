import { NavLink, useResolvedPath, useMatch } from "react-router-dom";
import "../styles/scss/custom-link.scss";

type CustomLinkProps = {
  to: string;
  children: React.ReactNode;
};

export function CustomLink(props: CustomLinkProps) {
  const resolvedPath = useResolvedPath(props.to);
  const isActive = useMatch({ path: resolvedPath.pathname });

  return (
      <NavLink to={props.to} className={isActive ? "active_link" : "inactive_link"}>{props.children}</NavLink>
  );
}
