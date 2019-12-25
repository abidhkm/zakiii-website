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

    return (
      <Layout className="books">
        <Layout.Sider breakpoint="lg" collapsedWidth="0" width={200}>
          <Menu
            mode="inline"
            style={{ height: "100%" }}
            selectedKeys={this.props.selectedKeys ? [this.props.selectedKeys] : undefined}
          >
            {this.props.books
              ? this.props.books.map((book) => (
                <Menu.Item key={book.slug}>
                  <LinkV2 to={`/Books/${book.slug}`}>
                    {book.title}
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
            path={window.globals.frontendBaseURL + "/Books"}
            render={() => <Landing books={this.props.books} />}
          />
          <Route
            exact={true}
            path={window.globals.frontendBaseURL + "/Books/:bookSlug"}
            render={() => <BookSene book={this.props.book} />}
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
