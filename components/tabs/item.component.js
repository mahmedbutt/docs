import { useState, useEffect } from "react";

// To render Item based on selected tab
function Item({ children }) {
  // Return markdown
  return <div className={`my-6`}>{children}</div>;
}

// Add type name
Item._name = "Item";

// Export
export default Item;
