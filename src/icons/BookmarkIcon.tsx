type BookmarkIconProps = {
    className?: string;
}

const BookmarkIcon = (props: BookmarkIconProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.5 7V22.2417L10.197 19.5404L10 19.456L9.80304 19.5404L3.5 22.2417V7C3.5 6.58379 3.64248 6.23962 3.94155 5.94055C4.24061 5.6415 4.58424 5.4995 4.99939 5.5H5H15C15.4162 5.5 15.7604 5.64248 16.0594 5.94155C16.3585 6.24061 16.5005 6.58424 16.5 6.99939V7ZM5 5H15C15.55 5 16.021 5.196 16.413 5.588C16.805 5.98 17.0007 6.45067 17 7L5 5ZM4.5 19.95V20.7093L5.19751 20.4093L10 18.3443L14.8025 20.4093L15.5 20.7093V19.95V7V6.5H15H5H4.5V7V19.95ZM20.5 3V19.5H19.5V3V2.5H19H6.5V1.5H19C19.4162 1.5 19.7604 1.64248 20.0594 1.94155C20.3585 2.24061 20.5005 2.58424 20.5 2.99939V3Z"
      fill="#626262"
      stroke="#626262"
    />
  </svg>
);
export default BookmarkIcon;
