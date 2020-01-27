import { Divider, Layout, Skeleton, Button, Affix } from "antd";
import * as React from "react";
import Markdown from "react-markdown";
import { Article } from "t9/apps/main/types";
import "./style";

export class ArticleSene extends React.Component<{ article?: Article | null }, {}> {
  public componentDidMount() {
    setTimeout(() => {
      window.FB.XFBML.parse();
    }, 3000);
  }

  public render() {
    const article = this.props.article;

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
                <div>
                  <h1 className="title">{article.title}</h1>
                  <Affix className="edit" offsetTop={50}>
                    <a
                      href={`https://github.com/ZibanPirate/zakiii-website/tree/master/backend/data/{|language code|}/articles/${article.slug}`}
                      target="blank"
                    >
                      <Button shape="circle" icon="edit" size="large" />
                    </a>
                  </Affix>
                </div>
                <p className="description">{article.description}</p>
                <Divider />
                <Markdown source={article.content} />
              </Layout.Content>
              <div
                className="fb-comments"
                data-href={location.origin + location.pathname}
                data-width="100%"
                data-numposts="5"
              />
            </React.Fragment>
          )
          : <Skeleton className="sidebar-skeleton" active={true} paragraph={{ rows: 6, width: ["80%", "70%", "60%", "50%", "90%"] }} />
        }
      </Layout>
    );
  }
}
