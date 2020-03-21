import * as functions from 'firebase-functions';
import * as rp from "request-promise-native";

export const covid19 = functions.https.onRequest(async (request, response) => {

  const [gRes, cRes] = await Promise.all([
    rp({ uri: "https://view.inews.qq.com/g2/getOnsInfo?name=disease_other", json: true }),
    rp({ uri: "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5", json: true }),
  ]);
  const gStatistics = JSON.parse(gRes.data).globalStatis;
  const data = JSON.parse(cRes.data);
  const cStatistics = data.chinaTotal;
  const lastUpdateTime = data.lastUpdateTime;

  response.json({
    confirm: gStatistics.confirm + cStatistics.confirm,
    heal: gStatistics.heal + cStatistics.heal,
    dead: gStatistics.dead + cStatistics.dead,
    lastUpdateTime: lastUpdateTime + " GMT+8",
  }).end();

});
