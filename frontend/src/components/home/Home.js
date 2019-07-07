import React, { Component } from "react";
import "./Home.css";
import Loader from "../loader/Loader";
import { loaderStatus } from "../../utils/utilities";
import axios from "axios";

class Home extends Component {

  constructor(props) {
    super(props);
    loaderStatus.next(true);
    this.state = { data: null, buttons: null, page: 1 };
  }

  pushButtom(e) {
    this.getUsers(e.target.innerHTML);
  }

  redirect(id) {
    console.log(id);
    this.props.history.push(`/user/${id}`);
  }

  getUsers(page) {
    var object_send = { page: page };
    console.log(this.signal);
    loaderStatus.next(true);
    this.setState({ data: <Loader /> });
    axios.post("http://localhost:9000/", object_send).then(res => {
      console.log(res);
      var users = [];
      var buttons = [];
      res.data.data.forEach((element, index) => {
        users.push(
          <div key={index.toString()} className="col app-content">
            <div className="row app-icon">
              <div className="col">
                <img style={{borderRadius: "50%"}} className="icon" src={element.avatar} alt="test" />
              </div>
            </div>

            <div className="row">
              <div className="col text-center">
                <button
                  onClick={() => this.redirect(element.id)}
                  type="button"
                  className="btn btn-link"
                >
                  {element.first_name + " " + element.last_name}
                </button>
              </div>
            </div>
          </div>
        );
      });

      for (var i = 1; i <= res.data.total_pages; i++) {
        console.log();
        buttons.push(
          <button
            key={i.toString()}
            type="button"
            className="btn btn-secondary"
            onClick={e => this.pushButtom(e)}
          >
            {i}
          </button>
        );
      }

      console.log(buttons);
      loaderStatus.next(false);
      this.setState({ data: users, buttons: buttons, page: res.data.page });
    });
  }

  componentDidMount() {
    this.getUsers(this.state.page);
  }

  render() {
    return (
      <div className="card-apps container-fluid">
        <div className="row title-container m-3">
          <div className="col-12">
            <h1 style={{ color: "white" }}>Bienvenido</h1>
          </div>
          <p className="col-12">
            Selecciona uno de los usuarios para ver sus detalles
          </p>
          <p className="col-12">
            Página actual: {this.state.page}
          </p>
        </div>
        <div className="row">{this.state.data}</div>
        <div className="row">
          <div className="col text-center">
            <div className="btn-group" role="group" aria-label="Basic example">
              {this.state.buttons}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
