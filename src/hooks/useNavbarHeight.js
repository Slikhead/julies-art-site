import { useEffect, useState } from "react";

export default function useNavbarHeight() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) {
      const updateHeight = () => setHeight(navbar.offsetHeight);
      updateHeight();

      // Update dynamically on resize
      window.addEventListener("resize", updateHeight);
      return () => window.removeEventListener("resize", updateHeight);
    }
  }, []);

  return height;
}
