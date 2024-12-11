import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useCallback, useState } from "react";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
  });

  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex">
      {/* Sidebar que se oculta en pantallas pequeñas */}
      <Sidebar
        isOpen={isOpen}
        closeSidebar={closeSidebar}
        className="lg:block lg:w-64 sm:hidden"
      />
      <div className="flex-1 flex flex-col min-h-screen w-full">
        <Header toggleSidebar={toggleSidebar} />
        <div className="px-4 py-2 overflow-y-auto h-full w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
