import React from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import PropTypes from "prop-types";

export default function StatCard(props) {
  const { name, value, precision, suffix, prefix, color } = props;


  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            style={{
              display: `flex`,
              width: `200px`,
              justifyContent: `center`,
              textAlign: `center`,
            }}
            bordered={false}
          >
            <Statistic
              title={name ? name : ""}
              value={value ? value : 0}
              precision={precision ? precision : ""}
              valueStyle={{
                color: `${color ? color : "black"}`,
              }}
              prefix={prefix ? prefix : ""}
              suffix={suffix ? suffix : ""}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

// PropTypes validation
StatCard.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
  precision: PropTypes.number, // precision is usually a number
  suffix: PropTypes.string,
  prefix: PropTypes.string,
  color: PropTypes.string,
};

// Default props
StatCard.defaultProps = {
  name: "",
  value: "",
  precision: 0,
  suffix: "",
  prefix: "",
  color: "black",
};
