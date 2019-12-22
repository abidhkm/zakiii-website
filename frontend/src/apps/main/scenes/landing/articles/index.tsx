import { Button, Card, Col, Icon, Row, Skeleton } from "antd";
import * as React from "react";
import { LinkV2 } from "src/components/link-v2";
import { Article } from "t9/apps/main/types";
import "./style";

export const Articles: React.SFC<{ articles: Article[] | null }> = ({ articles }) => {
  return (
    <>
      <div className="articles-title">{"Recent Articles"}</div>
      <Row className="articles-component" type="flex" justify="space-around">
        {articles ?
          articles.map((article, i) => (
            <Col lg={8} sm={14} xs={20} key={`article-${i}`}>
              <Card
                className="article-card"
                cover={<img alt={article.title} src={article.image} />}
                actions={[
                  (
                    <LinkV2 to={`/Articles/${article.slug}`} key="see more">
                      <Button type="link">READ MORE<Icon type="arrow-right" /></Button>
                    </LinkV2>
                  ),
                ]}
              >
                <Card.Meta
                  title={article.title}
                  description={article.description}
                />
              </Card>
            </Col>
          ))
          : [1, 2, 3].map((n, i) => (
            <Col lg={8} sm={14} xs={20} key={`article-${i}`}>
              <Card
                className="article-card"
                actions={[(<Button type="link"><Icon type="loading" /></Button>)]}
              >
                <Skeleton loading={true} avatar={true} active={true} />
              </Card>
            </Col>
          ))
        }
      </Row>
      <div className="articles-footer">
        <LinkV2 to={`/Articles`}>
          <Button type="link">SEE ALL<Icon type="arrow-right" /></Button>
        </LinkV2>
      </div>
    </>
  );
};
