import * as React from "react";

type BookIconProps = {
  className?: string;
};
const BookIcon = (props: BookIconProps) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M26.6667 12V14H5.33333V12H26.6667ZM21.3333 4V6H5.33333V4H21.3333ZM16 28V18H26.6667V28H16ZM18.6667 20V26H24V20H18.6667ZM26.6667 8V10H5.33333V8H26.6667ZM0 0H32V32H0V0ZM29.3333 30V2H2.66667V30H29.3333ZM13.3333 26V28H5.33333V26H13.3333ZM13.3333 18V20H5.33333V18H13.3333ZM13.3333 22V24H5.33333V22H13.3333Z"
      fill="black"
    />
  </svg>
);
export default BookIcon;
