import { NavLink, useResolvedPath, useMatch } from "react-router-dom";
import "../styles/scss/sign-in.scss";

type SignInHeaderProps = {
  to: string;
  children: React.ReactNode;
  className?: string
};

export function SignInHeader(props: SignInHeaderProps) {
  const resolvedPath = useResolvedPath(props.to);
  const isActive = useMatch({ path: resolvedPath.pathname });

  return (
    <div className={props.className}>
      <NavLink to={props.to}>{props.children}</NavLink>
      <div className="active_border_bottom">
        <hr className={isActive ? "active" : "inactive"} />
      </div>
    </div>
  );
}
