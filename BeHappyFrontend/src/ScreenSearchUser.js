import React, { useState, useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "reactstrap";
import { Button } from "antd";
import { Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

import HeaderComposant from "./HeaderComposant";

function ScreenSearchUser(props) {
  const history = useHistory();
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState();

  useEffect(() => {
    const getAllUsers = async () => {
      const data = await fetch("/getAllUsers");
      const body = await data.json();
      setAllUsers(body);
    };
    getAllUsers();
  }, []);

  if (search) {
    var usersList = search.map((user, i) => {
      return (
        <div className="List">
          <div className="List">
            <img src="../AvatarTest.png" className="User-Avatar" />
            <p className="User-Pseudo">@{user.username}</p>
          </div>
          <FontAwesomeIcon
            icon={faChevronCircleRight}
            className="Right-Icon"
            onClick={() => {
              history.push(`/screensearchuserprofile/`, { user });
            }}
          />
        </div>
      );
    });
  }

  if (props.token) {
    return (
      <Container fluid>
        <HeaderComposant />
        <Row>
          <Col xs="1" md="3" lg="4"></Col>
          <Col xs="10" md="6" lg="4">
            <p className="Title">EXPLORE HAPPY LISTS</p>
          </Col>
          <Col xs="1" md="3" lg="4"></Col>
        </Row>
        <Row style={{ backgroundColor: "#DABFFF" }} className="Main-Row">
          <Col xs="1" md="3" lg="4"></Col>
          <Col
            xs="10"
            md="6"
            lg="4"
            style={{ height: "420px", overflowY: "auto" }}
          >
            <Input
              className="Input"
              type="title"
              name="title"
              placeholder="Search via pseudo"
              onChange={(e) => {
                setSearch(
                  allUsers.filter((user) =>
                    user.username.includes(e.target.value)
                  )
                );
              }}
            />
            {search ? usersList : null}
          </Col>
          <Col xs="1" md="3" lg="4"></Col>
        </Row>
        <Row>
          <Col xs="1" md="3" lg="4"></Col>
          <Col xs="10" md="6" lg="4" className="Bottom">
            <Button
              className="Button-Shadow"
              style={{ boxShadow: "10px 10px #DABFFF" }}
              onClick={() => {
                history.push("/screensearchreco");
              }}
            >
              UPDATE MY LIST
            </Button>
            <Button
              className="Button-Shadow"
              style={{ boxShadow: "10px 10px #DABFFF" }}
              onClick={() => {
                history.push("/screenrandom");
              }}
            >
              SURPRISE ME
            </Button>
          </Col>
          <Col xs="1" md="3" lg="4" className="col3"></Col>
        </Row>
      </Container>
    );
  } else {
    return <Redirect to="/screenrandom" />;
  }
}

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(ScreenSearchUser);
