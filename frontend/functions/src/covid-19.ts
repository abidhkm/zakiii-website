import * as functions from 'firebase-functions';
import axios from "axios";

export const covid19 = functions.https.onRequest(async (request, response) => {
  const gStatistics = JSON.parse((await (await axios.get("https://view.inews.qq.com/g2/getOnsInfo?name=disease_other")).data).data).globalStatis;
  const data = JSON.parse((await (await axios.get("https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5")).data).data);
  const cStatistics = data.chinaTotal;
  const lastUpdateTime = data.lastUpdateTime;

  response.json({
    confirm: gStatistics.confirm + cStatistics.confirm,
    heal: gStatistics.heal + cStatistics.heal,
    dead: gStatistics.dead + cStatistics.dead,
    lastUpdateTime: lastUpdateTime + " GMT+8",
  }).end();

});
