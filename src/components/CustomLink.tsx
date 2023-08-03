import { NavLink, useResolvedPath, useMatch } from "react-router-dom";
import "../styles/scss/custom-link.scss";
import { CustomLinkProps } from "../types/Types";

export function CustomLink(props: CustomLinkProps) {
  const resolvedPath = useResolvedPath(props.to);
  const isActive = useMatch({ path: resolvedPath.pathname });

  return (
    <NavLink
      to={props.to}
      className={isActive ? "active_link" : "inactive_link"}
    >
      {props.children}
    </NavLink>
  );
}

export const CustomLinkTwo = (props: CustomLinkProps) => {
  const resolvedPath = useResolvedPath(props.to);
  const isActive = useMatch({ path: resolvedPath.pathname });

  return (
    <>
      <NavLink to={props.to} className={"custom_link_2"}>{props.children}</NavLink>
      <hr className={isActive ? "active_link-2" : "inactive_link-2"} />
    </>
  );
};
