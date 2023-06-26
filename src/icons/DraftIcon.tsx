type DraftIconProps = {
    className?: string;
}

const DraftIcon = (props: DraftIconProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 1L21.05 6.4C21.35 6.58333 21.5833 6.83333 21.75 7.15C21.9167 7.46667 22 7.8 22 8.15V19C22 19.55 21.804 20.021 21.412 20.413C21.02 20.805 20.5493 21.0007 20 21H4C3.45 21 2.979 20.804 2.587 20.412C2.195 20.02 1.99934 19.5493 2 19V8.15C2 7.8 2.08334 7.46667 2.25 7.15C2.41667 6.83333 2.65 6.58333 2.95 6.4L12 1ZM12 12.65L19.8 8L12 3.35L4.2 8L12 12.65ZM12 15L4 10.2V19H20V10.2L12 15ZM12 19H20H4H12Z"
      fill="#626262"
    />
  </svg>
);
export default DraftIcon;
