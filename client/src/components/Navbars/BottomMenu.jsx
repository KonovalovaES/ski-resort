import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function BottomMenu(props) {

  const { role } = useSelector(state => state.userReducer);

  return (
    <nav className="myblur mx-2 mb-2 h-20 flex justify-around">
      {
        role === undefined
        &&
        [
          <NavLink key={"userHome"} to="/" className="botmenu-btn">
            <span className="material-icons text-current-navy text-4xl">
              home
            </span>
          </NavLink>,
          <NavLink key={"userRooms"} to="/search" className="botmenu-btn">
            <span className="material-icons text-current-navy text-4xl">
              hotel
            </span>
          </NavLink>,
          <NavLink key={"userSkipass"} to="/skipass" className="botmenu-btn">
            <span className="material-icons text-current-navy text-4xl">
              style
            </span>
          </NavLink>,
          <NavLink key={"userSchool"} to="/school" className="botmenu-btn">
            <span className="material-icons text-current-navy text-4xl">
              downhill_skiing
            </span>
          </NavLink>,
          <NavLink key={"userProfile"} to="/profile" className="botmenu-btn">
            <span className="material-icons text-current-navy text-4xl">
              assignment_ind
            </span>
          </NavLink>,
        ]
      }
      {
        role === 'user'
        &&
        [
          <NavLink key={"userHome"} to="/" className="botmenu-btn">
            <span className="material-icons text-current-navy text-4xl">
              home
            </span>
          </NavLink>,
          <NavLink key={"userRooms"} to="/search" className="botmenu-btn">
            <span className="material-icons text-current-navy text-4xl">
              hotel
            </span>
          </NavLink>,
          <NavLink key={"userSkipass"} to="/skipass" className="botmenu-btn">
            <span className="material-icons text-current-navy text-4xl">
              style
            </span>
          </NavLink>,
          <NavLink key={"userSchool"} to="/school" className="botmenu-btn">
            <span className="material-icons text-current-navy text-4xl">
              downhill_skiing
            </span>
          </NavLink>,
          <NavLink key={"userCalendar"} to="/orders" className="botmenu-btn">
            <span className="material-icons text-current-navy text-4xl">
              calendar_month
            </span>
          </NavLink>,
          <NavLink key={"userProfile"} to="/profile" className="botmenu-btn">
            <span className="material-icons text-current-navy text-4xl">
              assignment_ind
            </span>
          </NavLink>,
        ]
      }

      {
        role === 'trainer'
        &&
        [
          <NavLink key={"trainerHome"} to="/" className="botmenu-btn">
            <span className="material-icons text-current-navy text-4xl">
              home
            </span>
          </NavLink>,
          <NavLink key={"trainerOrders"} to="/orders" className="botmenu-btn">
            <span className="material-icons text-current-navy text-4xl">
              list_alt
            </span>
          </NavLink>,
          <NavLink key={"trainerCalendar"} to="/calendar" className="botmenu-btn">
            <span className="material-icons text-current-navy text-4xl">
              calendar_month
            </span>
          </NavLink>,
          <NavLink key={"trainerProfile"} to="/profile" className="botmenu-btn">
            <span className="material-icons text-current-navy text-4xl">
              assignment_ind
            </span>
          </NavLink>,
        ]
      }

      {
        role === 'admin'
        &&
        [
          <NavLink key={"adminHome"} to="/" className="botmenu-btn">
            <span className="material-icons text-current-navy text-4xl">
              home
            </span>
          </NavLink>,
          <NavLink key={"adminRooms"} to="/search" className="botmenu-btn">
            <span className="material-icons text-current-navy text-4xl">
              hotel
            </span>
          </NavLink>,
          <NavLink key={"adminOrders"} to="/orders" className="botmenu-btn">
            <span className="material-icons text-current-navy text-4xl">
              list_alt
            </span>
          </NavLink>,
          <NavLink key={"adminCalendar"} to="/calendar" className="botmenu-btn">
            <span className="material-icons text-current-navy text-4xl">
              calendar_month
            </span>
          </NavLink>,
          <NavLink key={"adminProfile"} to="/profile" className="botmenu-btn">
            <span className="material-icons text-current-navy text-4xl">
              assignment_ind
            </span>
          </NavLink>,
        ]
      }
    </nav>
  )
}

export default BottomMenu;
