import { Layout, Menu, Skeleton } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { LinkV2 } from "src/components/link-v2";
import { Article } from "t9/types/main/index";
import { ArticleSene } from "./article";
import { Landing } from "./landing";
import "./style";

class ArticlesScene extends React.Component<ArticlesSceneProps, {}> {

  public render() {

    return (
      <Layout className="articles">
        <Layout.Sider breakpoint="lg" collapsedWidth="0" width={200}>
          <Menu
            mode="inline"
            style={{ height: "100%" }}
            selectedKeys={this.props.selectedKeys ? [this.props.selectedKeys] : undefined}
          >
            {this.props.articles
              ? this.props.articles.map((article) => (
                <Menu.Item key={article.slug}>
                  <LinkV2 to={`/Articles/${article.slug}`}>
                    {article.title}
                  </LinkV2>
                </Menu.Item>
              ))
              : <Skeleton className="sidebar-skeleton" active={true} title={false} paragraph={{ rows: 10, width: ["80%", "70%", "60%", "50%", "90%", "50%", "70%", "80%", "70%"] }} />
            }
          </Menu>
        </Layout.Sider>
        <Switch>
          <Route
            exact={true}
            path={window.globals.frontendBaseURL + "/Articles"}
            render={() => <Landing articles={this.props.articles} />}
          />
          <Route
            exact={true}
            path={window.globals.frontendBaseURL + "/Articles/:articleSlug"}
            render={() => <ArticleSene article={this.props.article} />}
          />
        </Switch>
      </Layout>
    );
  }
}

export interface ArticlesSceneProps {
  articles?: Article[] | null;
  article?: Article | null;
  selectedKeys: string | null;
}

export default connect
  (
    (state: {
      articlesScene: ArticlesSceneProps,
      articles: Article[] | null,
      article: Article | null,
    }) => ({
      ...state.articlesScene,
      article: state.article,
      articles: state.articles,
    }),
  )
  (ArticlesScene);
