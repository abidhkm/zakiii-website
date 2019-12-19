import { Col, Row } from "antd";
import * as React from "react";
import { LinkV2 } from "src/components/link-v2";
import { mainConfig } from "t9/apps/main/config";
import "./style";

const changeLanguage = (languageCode: string) => {
  const baseURL = mainConfig.language.defaultLanguageCode === languageCode ? "" : "/" + languageCode;
  let href = location.href;

  if (mainConfig.language.isDefaultLanguage) {
    href = href.replace(location.origin, location.origin + baseURL);
  } else {
    href = href.replace(location.origin + "/" + mainConfig.language.languageCode, location.origin + baseURL);
  }
  location.href = href;
};

const footerSections = [
  {
    items: [
      { to: "/FAQ", content: "{|FAQ|}" },
      { to: "/Contact_us", content: "{|Send feedback|}" },
    ],
    title: "{|Useful links|}",
  },
  {
    items: [
      { href: "tel:+213559790024", content: "{|Phone number|}" },
      { href: "https://www.facebook.com/zakiii.man", content: "{|Facebook page|}" },
      { href: "https://www.youtube.com/channel/UCD1rlkXciGqAi52iJtVpu3A", content: "{|YouTube chanel|}" },
      { href: "https://www.instagram.com/zakiii.web", content: "{|Instagram account|}" },
      { href: "https://www.linkedin.com/in/mansouri-zakaria", content: "{|LinkedIn profile|}" },
      { href: "https://www.upwork.com/o/profiles/users/_~0164cec8ad3b89fe21", content: "{|Upwork profile|}" },
      { href: "https://github.com/zibanpirate", content: "{|Github profile|}" },
      { href: "https://twitter.com/zibanpirate", content: "{|Twitter account|}" },
    ],
    title: "{|Contact us|}",
  },
  {
    items: [
      {
        content: "{|language english|}",
        onClick: (e: any) => { e.preventDefault(); changeLanguage("en"); },
      },
      {
        content: "{|language arabic|}",
        onClick: (e: any) => { e.preventDefault(); changeLanguage("ar"); },
      },
    ],
    title: "{|Languages|}",
  },
];

export const Footer: React.SFC<{}> = () => {
  return (
    <>
      <Row className="footer links" type="flex" justify="space-around">
        <Col>
          <h3>{"{|My goal title|}".toUpperCase()}</h3>
          <div className="divider" />
          {"{|My goal paragraph|}"
            .split("\n").map((paragraph, i) => <p key={`p-${i}`} dangerouslySetInnerHTML={{ __html: paragraph }} />)}
        </Col>
        {footerSections.map((footerSection, i) => (
          <Col key={`fSection-${i}`}>
            <h3>{footerSection.title.toUpperCase()}</h3>
            <div className="divider" />
            <ul>
              {(footerSection.items as any[]).map((item, j) => (
                <li key={`fLink-${i}-${j}`}>
                  {item.to
                    ? <LinkV2 to={item.to}>{item.content}</LinkV2>
                    : <a href={item.href} onClick={item.onClick}>{item.content}</a>
                  }
                </li>
              ))}
            </ul>
          </Col>
        ))}
      </Row>
      <Row className="footer bottom">
        <p>2020 <a>Zakiii</a></p>
      </Row>
    </>
  );
};
