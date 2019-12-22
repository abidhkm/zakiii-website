import { Empty, Layout } from "antd";
import * as React from "react";
import { Book } from "t9/apps/main/types";
import "./style";

export const Landing: React.FC<{ books?: Book[] | null }> = ({ books }) => {
  return (
    <Layout className="landing">
      <Empty description={"👈 Browse books from the left sidebar 👈"} />
    </Layout>
  );
};
