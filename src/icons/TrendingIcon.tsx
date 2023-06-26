type TrendingIconProps = {
    className?: string
}

const TrendingIcon = (props: TrendingIconProps) => (
  <svg
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20.9998 7.5C21.0093 7.43032 21.0093 7.35968 20.9998 7.29C20.9911 7.23129 20.9743 7.17407 20.9498 7.12C20.9234 7.07113 20.8933 7.02433 20.8598 6.98C20.8218 6.91675 20.7746 6.85947 20.7198 6.81L20.5998 6.74C20.5421 6.69696 20.478 6.66321 20.4098 6.64H20.2098C20.1489 6.58099 20.0777 6.53356 19.9998 6.5H14.9998C14.7346 6.5 14.4802 6.60536 14.2927 6.79289C14.1052 6.98043 13.9998 7.23478 13.9998 7.5C13.9998 7.76522 14.1052 8.01957 14.2927 8.20711C14.4802 8.39464 14.7346 8.5 14.9998 8.5H17.8298L13.8298 13.21L9.50981 10.64C9.30519 10.5183 9.06387 10.4736 8.82923 10.5139C8.5946 10.5542 8.38205 10.677 8.22981 10.86L3.22981 16.86C3.14561 16.961 3.08217 17.0777 3.04312 17.2033C3.00408 17.3289 2.99019 17.461 3.00227 17.592C3.01435 17.7229 3.05214 17.8503 3.11349 17.9666C3.17485 18.0829 3.25855 18.1861 3.35981 18.27C3.53972 18.4191 3.76616 18.5005 3.99981 18.5C4.14672 18.5002 4.29188 18.4681 4.42496 18.4059C4.55804 18.3437 4.67578 18.2529 4.76981 18.14L9.21981 12.8L13.4898 15.36C13.6923 15.4801 13.9308 15.5249 14.1631 15.4865C14.3954 15.4481 14.6067 15.3289 14.7598 15.15L18.9998 10.2V12.5C18.9998 12.7652 19.1052 13.0196 19.2927 13.2071C19.4802 13.3946 19.7346 13.5 19.9998 13.5C20.265 13.5 20.5194 13.3946 20.7069 13.2071C20.8945 13.0196 20.9998 12.7652 20.9998 12.5V7.5Z"
      fill="#626262"
    />
  </svg>
);
export default TrendingIcon;
