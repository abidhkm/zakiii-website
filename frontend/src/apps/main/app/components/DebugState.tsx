import React from "react";
import { puke } from "../helpers/utils";

const styles = { position: "fixed", top: 0, left: 16 };
export const DebugState = ({ data }) => <div style={styles as unknown}>{puke(data)}</div>;
