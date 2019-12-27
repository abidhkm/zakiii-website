import { Empty, Layout } from "antd";
import * as React from "react";
import { Article } from "t9/apps/main/types";
import "./style";

export const Landing: React.FC<{ articles?: Article[] | null }> = ({ articles }) => {
  return (
    <Layout className="landing">
      <Empty description={"{|content|}"} />
    </Layout>
  );
};
