import * as React from "react";
type AnalyticsIconProps = {
    className?: string
}

const AnalyticsIcon = (props: AnalyticsIconProps) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 2H2V28C2 28.5304 2.21071 29.0391 2.58579 29.4142C2.96086 29.7893 3.46957 30 4 30H30V28H4V2Z"
      fill="black"
    />
    <path
      d="M30 9H23V11H26.59L19 18.59L14.71 14.29C14.617 14.1963 14.5064 14.1219 14.3846 14.0711C14.2627 14.0203 14.132 13.9942 14 13.9942C13.868 13.9942 13.7373 14.0203 13.6154 14.0711C13.4936 14.1219 13.383 14.1963 13.29 14.29L6 21.59L7.41 23L14 16.41L18.29 20.71C18.383 20.8037 18.4936 20.8781 18.6154 20.9289C18.7373 20.9797 18.868 21.0058 19 21.0058C19.132 21.0058 19.2627 20.9797 19.3846 20.9289C19.5064 20.8781 19.617 20.8037 19.71 20.71L28 12.41V16H30V9Z"
      fill="black"
    />
  </svg>
);
export default AnalyticsIcon;