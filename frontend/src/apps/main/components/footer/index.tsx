import { Button, Col, Row } from "antd";
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
      { to: `/FAQ`, content: `{|FAQ|}` },
      { to: `/Contact_us`, content: `{|Send feedback|}` },
    ],
    title: `{|Useful links|}`,
  },
  {
    items: [
      { content: `{|Phone number|}`, href: `tel:+213559790024`, icon: `phone` },
      {
        href: `https://www.youtube.com/channel/UCD1rlkXciGqAi52iJtVpu3A`,
        html: `<div class="g-ytsubscribe" data-channelid="UCD1rlkXciGqAi52iJtVpu3A" data-layout="default" data-theme="dark" data-count="default"></div>`,
      },
      {
        href: `https://www.facebook.com/zakiii.man`,
        html: `<iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fzakiii.man&width=200&layout=button_count&action=like&size=large&share=true&height=35&appId" width="100%" height="35" style="border:none;overflow:hidden;" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>`,
      },
      {
        href: `https://github.com/zibanpirate`,
        html: `<div dir="ltr"><a class="github-button" href="https://github.com/zibanpirate/zakiii-website" data-size="large" data-show-count="true" aria-label="Star zibanpirate/zakiii-website on GitHub">{|Github profile|}</a></div>`,
      },
      {
        href: `https://twitter.com/zibanpirate`,
        html: `<a href="https://twitter.com/zibanpirate?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-lang="{|language code|}" data-size="large" data-show-screen-name="false" data-show-count="false"></a>`,
      },
      { content: `{|Instagram account|}`, href: `https://www.instagram.com/zakiii.web`, icon: `instagram` },
      { content: `{|LinkedIn profile|}`, href: `https://www.linkedin.com/in/mansouri-zakaria`, icon: `linkedin` },
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
        <Col lg={2 + 4} sm={12} span={20}>
          <h3>{"{|My goal title|}".toUpperCase()}</h3>
          <div className="divider" />
          {"{|My goal paragraph|}"
            .split("\n").map((paragraph, i) => <p key={`p-${i}`} dangerouslySetInnerHTML={{ __html: paragraph }} />)}
        </Col>
        {footerSections.map((footerSection, i) => (
          <Col lg={4} sm={12} span={20} key={`fSection-${i}`}>
            <h3>{footerSection.title.toUpperCase()}</h3>
            <div className="divider" />
            <ul>
              {(footerSection.items as any[]).map((item, j) => (
                <li key={`fLink-${i}-${j}`}>
                  {item.to
                    ? <LinkV2 to={item.to}>{item.content}</LinkV2>
                    : item.html
                      // tslint:disable-next-line: max-line-length
                      ? <a href={item.href} target="blank" onClick={item.onClick} dangerouslySetInnerHTML={{ __html: item.html }} />
                      : (
                        <a href={item.href} target="blank" onClick={item.onClick}>
                          {item.icon ? <Button type="link" icon={item.icon} /> : null}
                          {item.content}
                        </a>
                      )
                  }
                </li>
              ))}
            </ul>
          </Col>
        ))}
      </Row>
      <Row className="footer bottom">
        {/* tslint:disable-next-line: max-line-length */}
        <p>&copy; 2020 Copyright <a href="https://twitter.com/zibanpirate" target="blank">Zakaria Mansouri</a></p>
      </Row>
    </>
  );
};
