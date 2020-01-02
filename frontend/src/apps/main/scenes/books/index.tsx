import { Layout, Menu, Skeleton } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { LinkV2 } from "src/components/link-v2";
import { Book } from "t9/types/main/index";
import { BookSene } from "./book";
import { Landing } from "./landing";
import "./style";

class BooksScene extends React.Component<BooksScenePropsReduxed, {}> {

  public render() {

    const zeroWidthTriggerStyle = {
      boxShadow: "0 0 12px 6px #fff9",
      ...("{|language code|}" as any === "ar"
        ? { right: "unset", left: -36, borderRadius: "4px 0 0 4px", boxShadow: "0 0 12px 6px #fff9" }
        : undefined),
    };

    return (
      <Layout className="books">
        <Layout.Sider breakpoint="lg" zeroWidthTriggerStyle={zeroWidthTriggerStyle} collapsedWidth="0" width={200}>
          <Menu mode="inline" style={{ height: "100%", borderLeft: "1px solid #e8e8e8" }} >
            {this.props.books
              ? this.props.books.map((book) => (
                <li
                  className={"ant-menu-item" + (this.props.selectedKeys === book.slug ? " ant-menu-item-selected" : "")}
                  role="menuitem"
                  key={book.slug}
                  style={{ paddingRight: 24 }}
                >
                  <LinkV2 to={`/Books/${book.slug}`}>
                    {book.title}
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
            path={window.globals.frontendBaseURL + "/Books"}
            render={() => <Landing books={this.props.books} />}
          />
          <Route
            exact={true}
            path={window.globals.frontendBaseURL + "/Books/:bookSlug"}
            render={() => <BookSene key={location.pathname} book={this.props.book} />}
          />
        </Switch>
      </Layout>
    );
  }
}

interface BooksScenePropsReduxed extends BooksSceneProps {
  books?: Book[] | null;
  book?: Book | null;
}

export interface BooksSceneProps {
  selectedKeys: string | null;
}

export default connect
  (
    (state: {
      booksScene: BooksSceneProps,
      books: Book[] | null,
      book: Book | null,
    }) => ({
      ...state.booksScene,
      book: state.book,
      books: state.books,
    }),
  )
  (BooksScene);
