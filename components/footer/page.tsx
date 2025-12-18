import React from "react";

type Props = {};

const Footer = () => {
  return (
    <footer className="flex justify-center bg-base-300 text-gray-700 bg-gray-950 items-center py-5">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - James Boogie</p>
      </aside>
    </footer>
  );
};

export default Footer;
