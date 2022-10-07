import React from "react";

const BlurredBackground = ({ isSidebarOpen, setIsSidebarOpen }) => (
    <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 z-20 block transition-opacity bg-black opacity-50 ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      />
  );

export default BlurredBackground;
