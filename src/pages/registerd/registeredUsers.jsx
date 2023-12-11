import UsersList from "../../components/users/Users.jsx";
import NavbarDashboard from "../../components/navbarDashboard/NavbarDashboard.jsx";

export default function Users() {
  return (
    <>
      <NavbarDashboard />
      <div className="dashboard">
        <UsersList />
      </div>
    </>
  );
}