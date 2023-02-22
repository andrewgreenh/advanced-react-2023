import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

export function App() {
  // const [windowWidth, setWindowWidth] = useState(0);

  // useEffect(() => {
  //   function handleResize() {
  //     console.log(window.innerWidth);
  //     setWindowWidth(window.innerWidth);
  //   }
  //   window.addEventListener("resize", handleResize);

  //   return () => window.removeEventListener("resize", handleResize);
  // });
  return <RouterProvider router={router} />;
}
