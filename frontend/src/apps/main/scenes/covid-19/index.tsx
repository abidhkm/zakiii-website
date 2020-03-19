import { Col, Row } from "antd";
import React from "react";
import CountUp from "react-countup";
import { connect } from "react-redux";
import "./style";

const cols = [
  { name: "confirm", label: "All Cases" },
  { name: "heal", label: "Recovered" },
  { name: "dead", label: "Deaths" },
];

const COVID19Scene = ({ statistics, oldStatistics }: COVID19ScenePropsReduxed) => {
  return (
    <div className="covid-19">
      <h2>Coronavirus Live Updates</h2>
      <Row className="table">
        {cols.map((field, i) => (
          <Col className={"col " + field.name} key={"col-" + i} span={8} >
            <p>{field.label}</p>
            <h2>
              <CountUp
                start={oldStatistics ? (oldStatistics as any)[field.name] : 0}
                end={statistics ? (statistics as any)[field.name] : 0}
                separator=","
              />
            </h2>
          </Col>
        ))}
      </Row>
      {statistics ? <small>Last Updated: {statistics.lastUpdateTime}</small> : null}
    </div>
  );
};

interface COVID19ScenePropsReduxed extends COVID19SceneProps {
}

export interface COVID19SceneProps {
  statistics: {
    confirm: number;
    dead: number;
    heal: number;
    lastUpdateTime: string;
  } | null;
  oldStatistics: {
    confirm: number;
    dead: number;
    heal: number;
  } | null;
}

export default connect
  (
    (state: {
      covid19Scene: COVID19SceneProps,
    }) => ({
      ...state.covid19Scene,
    }),
  )
  (COVID19Scene);
