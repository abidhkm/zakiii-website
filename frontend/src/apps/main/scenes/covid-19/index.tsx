import React from "react";
import { connect } from "react-redux";
import { GoTop } from "../../components/go-top";
import "./style";

class COVID19Scene extends React.Component<COVID19ScenePropsReduxed, {}> {

  public render() {
    return (
      <div className="covid-19">
        <GoTop />
      </div>
    );
  }
}

interface COVID19ScenePropsReduxed extends COVID19SceneProps {
}

export interface COVID19SceneProps {
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
