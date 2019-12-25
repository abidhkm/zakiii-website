import { Avatar, Button, Card, Col, Icon, Row, Skeleton } from "antd";
import * as React from "react";
import { Project } from "t9/apps/main/types";
import "./style";

export const Projects: React.SFC<{ projects: Project[] | null }> = ({ projects }) => {
  return (
    <Row className="projects-component" type="flex" justify="space-around">
      {projects ?
        projects.map((project, i) => (
          <Col lg={8} sm={14} xs={20} key={`project-${i}`}>
            <Card
              className="project-card"
              cover={<img alt={project.name} src={project.image} />}
              actions={[
                (
                  <a href={project.link} target="blank" key="see more">
                    <Button type="link">{"{|See project|}".toUpperCase()}<Icon type="select" /></Button>
                  </a>
                ),
              ]}
            >
              <Card.Meta
                avatar={<Avatar src={project.logo} alt={project.name} />}
                title={project.name}
                description={project.description}
              />
            </Card>
          </Col>
        ))
        : [1, 2, 3].map((n, i) => (
          <Col lg={8} sm={14} xs={20} key={`project-${i}`}>
            <Card
              className="project-card"
              actions={[(<Button type="link"><Icon type="loading" /></Button>)]}
            >
              <Skeleton loading={true} avatar={true} active={true} />
            </Card>
          </Col>
        ))
      }
    </Row>
  );
};
