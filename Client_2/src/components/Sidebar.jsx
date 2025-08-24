import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard/123", label: "Dashboard" },
  { to: "/contacts", label: "Contacts" },
  { to: "/coupons", label: "Coupons" },
  { to: "/profile", label: "Profile" },
  // Add more links as needed
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-56 bg-blue-50 border-r flex flex-col py-8 px-4">
      <div className="mb-8 text-2xl font-bold text-blue-700">FeedSense</div>
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `px-3 py-2 rounded hover:bg-blue-100 font-medium ${
                isActive ? "bg-blue-200 text-blue-900" : "text-gray-700"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
