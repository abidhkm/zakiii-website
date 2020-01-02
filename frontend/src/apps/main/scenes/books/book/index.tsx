import { Divider, Layout, Skeleton } from "antd";
import * as React from "react";
import Markdown from "react-markdown";
import { Book } from "t9/apps/main/types";
import "./style";

export class BookSene extends React.Component<{ book?: Book | null }, {}> {
  public componentDidMount() {
    setTimeout(() => {
      window.FB.XFBML.parse();
    }, 3000);
  }

  public render() {
    const book = this.props.book;

    if (book) {
      document.title = book.title + " | zakiii";
    }

    return (
      <Layout className="book">
        {book
          ? (
            <React.Fragment key={book.slug}>
              <img className="image" src={book.image} alt={book.title} />
              <Layout.Content
                style={{
                  background: "#fff",
                  padding: "1rem",
                }}
              >
                <h1 className="title">{book.title}</h1>
                <p className="description">{book.description}</p>
                <Divider />
                <Markdown source={book.content} />
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
