import { Divider, Layout, Skeleton } from "antd";
import * as React from "react";
import Markdown from "react-markdown";
import { Article } from "t9/apps/main/types";
import "./style";

export const ArticleSene: React.FC<{ article?: Article | null }> = ({ article }) => {

  if (article) {
    document.title = article.title + " | zakiii";
  }

  return (
    <Layout className="article">
      {article
        ? (
          <React.Fragment key={article.slug}>
            <img className="image" src={article.image} alt={article.title} />
            <Layout.Content
              style={{
                background: "#fff",
                padding: "1rem",
              }}
            >
              <h1 className="title">{article.title}</h1>
              <p className="description">{article.description}</p>
              <Divider />
              <Markdown source={article.content} />
            </Layout.Content>
          </React.Fragment>
        )
        : <Skeleton className="sidebar-skeleton" active={true} paragraph={{ rows: 6, width: ["80%", "70%", "60%", "50%", "90%"] }} />
      }
    </Layout>
  );
};
