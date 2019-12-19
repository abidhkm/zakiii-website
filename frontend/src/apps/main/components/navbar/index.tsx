import { Icon } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { LinkV2 } from "src/components/link-v2";
import "./scroll";
import "./style";

const navButtons = [
  { icon: "phone", title: "{|Call me|}", subTitle: "+213 559 790 024", href: "Tel:+213559790024" },
  { icon: "mail", title: "{|Email me|}", subTitle: "contact@zakiii.com", href: "mailto:contact@zakiii.com" },
];

const menuButtons = [
  { title: "{|Home|}", to: "/" },
  { title: "{|Developer|}", to: "/Developer" },
  { title: "{|Articles|}", to: "/Articles" },
  { title: "{|Projects|}", to: "/Projects" },
];

const NavBarNoRedux: React.SFC = () => {
  return (
    <table className="navbar">
      <tbody>
        <tr>
          <td className="logo">
            <LinkV2 to="/" />
          </td>
          {navButtons.map((navButton, i) => (
            <React.Fragment key={`navBtn-${i}`}>
              <td className="navButtonIcon">
                <a href={navButton.href}><Icon type={navButton.icon} theme="outlined" /></a>
              </td>
              <td className="navButton">
                <a href={navButton.href}>
                  <div>{navButton.title}</div>
                  <div>{navButton.subTitle}</div>
                </a>
              </td>
            </React.Fragment>
          ))}
        </tr>
        {["regular", "sticky"].map((cn) => (
          <tr key={`nbMenu${cn}`} className={`navbarMenu ${cn}`}>
            <td colSpan={8}>
              {menuButtons.map((menuButton, i) => (
                <LinkV2 key={`menuBtn-${i}`} to={menuButton.to}>{menuButton.title.toUpperCase()}</LinkV2>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table >
  );
};

export const Navbar = connect
  (
    (state: {
    }) => ({
      ...state,
    }),
  )
  (NavBarNoRedux);
