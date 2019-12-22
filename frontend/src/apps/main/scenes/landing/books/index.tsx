import { Button, Card, Col, Icon, Row, Skeleton } from "antd";
import * as React from "react";
import { LinkV2 } from "src/components/link-v2";
import { Book } from "t9/apps/main/types";
import "./style";

export const Books: React.SFC<{ books: Book[] | null }> = ({ books }) => {
  return (
    <>
      <div className="books-title">{"{|Recent books|}"}</div>
      <Row className="books-component" type="flex" justify="space-around">
        {books ?
          books.map((book, i) => (
            <Col lg={8} sm={14} xs={20} key={`book-${i}`}>
              <Card
                className="book-card"
                cover={<img alt={book.title} src={book.image} />}
                actions={[
                  (
                    <LinkV2 to={`/Books/${book.slug}`} key="see more">
                      <Button type="link">{"{|Read more|}".toUpperCase()}<Icon type="{|arrow right|}" /></Button>
                    </LinkV2>
                  ),
                ]}
              >
                <Card.Meta
                  title={book.title}
                  description={book.description}
                />
              </Card>
            </Col>
          ))
          : [1, 2, 3].map((n, i) => (
            <Col lg={8} sm={14} xs={20} key={`book-${i}`}>
              <Card
                className="book-card"
                actions={[(<Button type="link"><Icon type="loading" /></Button>)]}
              >
                <Skeleton loading={true} avatar={true} active={true} />
              </Card>
            </Col>
          ))
        }
      </Row>
      <div className="books-footer">
        <LinkV2 to={`/Books`}>
          <Button type="link">{"{|See all|}".toUpperCase()}<Icon type="{|arrow right|}" /></Button>
        </LinkV2>
      </div>
    </>
  );
};
