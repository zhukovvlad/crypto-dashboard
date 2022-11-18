import React from "react";

const Sidebar = ({ user }) => {
  if (!user) {
    return;
  }

  return <div>Sidebar</div>;
};

export default Sidebar;
