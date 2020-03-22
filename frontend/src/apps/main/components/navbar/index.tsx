import { Icon } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { LinkV2 } from "src/components/link-v2";
import "./scroll";
import "./style";

const navButtons = [
  { icon: "deployment-unit", title: "COVID-19", subTitle: "Live statistics", href: "/COVID-19" },
  {
    anchor: true,
    href: "mailto:contact@zakiii.com",
    icon: "mail",
    subTitle: "contact@zakiii.com",
    title: "{|Email me|}",
  },
];

const menuButtons = [
  { title: "{|Home|}", to: "/" },
  { title: "{|Developer|}", to: "/Developer" },
  { title: "{|Reader|}", to: "/Reader" },
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
                <LinkV2
                  anchor={navButton.anchor}
                  to={navButton.href}
                >
                  <Icon type={navButton.icon} theme="outlined" />
                </LinkV2>
              </td>
              <td className="navButton">
                <LinkV2 anchor={navButton.anchor} to={navButton.href}>
                  <div>{navButton.title}</div>
                  <div>{navButton.subTitle}</div>
                </LinkV2>
              </td>
            </React.Fragment>
          ))}
        </tr>
        {["regular", "sticky"].map((className) => (
          <tr key={`nbMenu${className}`} className={`navbarMenu ${className}`}>
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
