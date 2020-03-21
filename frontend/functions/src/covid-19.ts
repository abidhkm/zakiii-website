import * as functions from 'firebase-functions';
import * as rp from "request-promise-native";

export const covid19 = functions.https.onRequest(async (request, response) => {

  const [gRes, cRes] = await Promise.all([
    rp({ uri: "https://view.inews.qq.com/g2/getOnsInfo?name=disease_other", json: true }),
    rp({ uri: "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5", json: true }),
  ]);
  const gData = JSON.parse(gRes.data);
  const data = JSON.parse(cRes.data);
  const cStatistics = data.chinaTotal;
  const lastUpdateTime = data.lastUpdateTime;

  const dz = (gData.foreignList as Array<any>).find((country) => country.name === "阿尔及利亚");
  const uae = (gData.foreignList as Array<any>).find((country) => country.name === "阿联酋");

  response.json({
    confirm: gData.globalStatis.confirm + cStatistics.confirm,
    heal: gData.globalStatis.heal + cStatistics.heal,
    dead: gData.globalStatis.dead + cStatistics.dead,
    lastUpdateTime: lastUpdateTime + " GMT+8",
    countries: [
      {
        code: "dz",
        name_en: "Algeria",
        name_ar: "الجزائر",
        confirm: dz.confirm,
        heal: dz.heal,
        dead: dz.dead,
      },
      {
        code: "uae",
        name_en: "Algeria",
        name_ar: "الإمارات العربية المتحدة",
        confirm: uae.confirm,
        heal: uae.heal,
        dead: uae.dead,
      }
    ],
  }).end();

});
