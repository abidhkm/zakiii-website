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

const COVID19Scene = ({ stats, oldStats, lastUpdateTime }: COVID19ScenePropsReduxed) => {
  return (
    <div className="covid-19">
      <h2>Coronavirus Live Updates</h2>
      {lastUpdateTime ?
        (
          <div>
            <small>Last Updated: {lastUpdateTime}</small>
            {
              stats.map((stat, si) => (
                <div key={"stat-" + si}>
                  <h4>{stat.name_en}</h4>
                  <Row className="table">
                    {cols.map((field, i) => (
                      <Col className={"col " + field.name} key={"col-" + i} span={8} >
                        <p>{field.label}</p>
                        <h2>
                          <CountUp
                            // start={(oldStats[si] as any)[field.name]}
                            end={(stat as any)[field.name]}
                            separator=","
                          />
                        </h2>
                      </Col>
                    ))}
                  </Row>
                </div>
              ),
              )
            }
          </div>
        ) :
        "Loading"
      }
    </div>
  );
};

interface COVID19ScenePropsReduxed extends COVID19SceneProps {
}

export interface COVID19SceneProps {
  lastUpdateTime: string | null;
  stats: Array<{ name_en: string; confirm: number; dead: number; heal: number; }>;
  oldStats: Array<{ name_en: string; confirm: number; dead: number; heal: number; }>;
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
