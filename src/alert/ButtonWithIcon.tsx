import React from 'react';
import { Link } from 'react-router-dom';
const ButtonWithIcon: React.FC<{ to: string, text: string }> = ({ to, text }) => {
  return (
    <Link
      to={to}
      className='inline-flex items-center justify-center gap-2.5 bg-primary py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 rounded-md w-50'
    >
      <span>
        <svg
          className="fill-current"
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM9 9V5H11V9H15V11H11V15H9V11H5V9H9Z"
            fill="#FFFFFF"
          />
        </svg>
      </span>
      {text}
    </Link>
  );
};

export default ButtonWithIcon;