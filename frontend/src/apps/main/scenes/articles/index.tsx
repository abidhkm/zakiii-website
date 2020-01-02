import { Layout, Menu, Skeleton } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { LinkV2 } from "src/components/link-v2";
import { Article } from "t9/types/main/index";
import { ArticleSene } from "./article";
import { Landing } from "./landing";
import "./style";

class ArticlesScene extends React.Component<ArticlesScenePropsReduxed, {}> {

  public render() {

    const zeroWidthTriggerStyle = {
      boxShadow: "0 0 12px 6px #fff9",
      ...("{|language code|}" as any === "ar"
        ? { right: "unset", left: -36, borderRadius: "4px 0 0 4px", boxShadow: "0 0 12px 6px #fff9" }
        : undefined),
    };

    return (
      <Layout className="articles">
        <Layout.Sider breakpoint="lg" zeroWidthTriggerStyle={zeroWidthTriggerStyle} collapsedWidth="0" width={200}>
          <Menu mode="inline" style={{ height: "100%", borderLeft: "1px solid #e8e8e8" }} >
            {this.props.articles
              ? this.props.articles.map((article) => (
                <li
                  className={"ant-menu-item" + (this.props.selectedKeys === article.slug ? " ant-menu-item-selected" : "")}
                  role="menuitem"
                  key={article.slug}
                  style={{ paddingRight: 24 }}
                >
                  <LinkV2 to={`/Articles/${article.slug}`}>
                    {article.title}
                  </LinkV2>
                </li>
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
            render={() => <ArticleSene key={location.pathname} article={this.props.article} />}
          />
        </Switch>
      </Layout>
    );
  }
}

interface ArticlesScenePropsReduxed extends ArticlesSceneProps {
  articles?: Article[] | null;
  article?: Article | null;
}

export interface ArticlesSceneProps {
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
