import React, { Component } from "react";
import "./User.css";
import Request from "react-http-request";
import Loader from "../loader/Loader";
import { loaderStatus } from "../../utils/utilities";

class User extends Component {
  userId;

  constructor(props) {
    super(props);
    this.userId = this.props.match.params.id;
  }

  getUser() {
    console.log(this.pages);
    var object_send = { userId: this.userId };
    loaderStatus.next(true);
    return (
      <Request
        url="http://localhost:9000/user"
        method="post"
        accept="application/json"
        send={object_send}
        verbose={true}
      >
        {({ error, result, loading }) => {
          if (loading) {
            return <Loader />;
          } else {
            loaderStatus.next(false);
            var user = result.body.data;
            return (
              <div>
                <div className="row">
                  <div className="col text-center">
                    <img
                      style={{ borderRadius: "50%" }}
                      className="icon"
                      src={user.avatar}
                      alt="test"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col text-center">
                    <h1 style={{ color: "white" }}>
                      {user.first_name + " " + user.last_name}
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col text-center">
                    <p>{user.email}</p>
                  </div>
                </div>                
              </div>
            );
          }
        }}
      </Request>
    );
  }

  redirect() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        {this.getUser()}
        <div className="col-12 text-center">
          <button
            onClick={() => this.redirect()}
            type="button"
            className="btn btn-light"
          >
            Regresar
          </button>
        </div>
      </div>
    );
  }
}

export default User;
