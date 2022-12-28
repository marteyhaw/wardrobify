import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function withExtras(Component) {
  return (props) => (
    <Component {...props} params={useParams()} useNavigate={useNavigate()} />
  );
}
class hatDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      succesful: false,
    };
    this.deleteHat = this.deleteHat.bind(this);
  }

  async componentDidMount() {
    let { id } = this.props.params;
    const detailUrl = `http://localhost:8090/api/hats/${id}/`;
    const response = await fetch(detailUrl);
    if (response.ok) {
      const data = await response.json();
      this.setState({ ...data });
      this.setState({ succesful: true });
    }
  }

  async deleteHat(event) {
    event.preventDefault();
    let { id } = this.props.params;
    const detailUrl = `http://localhost:8090/api/hats/${id}/`;
    const fetchConfig = {
      method: "DELETE",
    };
    const response = await fetch(detailUrl, fetchConfig);
    if (response.ok) {
      this.props.useNavigate("/hats/");
    }
  }

  render() {
    if (this.state.succesful) {
      return (
        <>
          <div className="mt-5 container" style={{ width: "500px" }}>
            <div className="card mb-3 shadow">
              <img
                src={this.state.picture_url}
                alt={this.state.style}
                className="card-img-top "
              />
              <div className="card-body">
                <h5 className="card-title">{this.state.fabric}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {this.state.style}
                </h6>
                <p className="card-text">{this.state.color}</p>
              </div>
              <div className="card-footer">
                Closet {this.state.location.closet_name} | Section No.{" "}
                {this.state.location.section_number} | Shelf No.{" "}
                {this.state.location.shelf_number}
              </div>
              <button onClick={this.deleteHat} value={this.state.href}>
                Delete
              </button>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="mt-5 container" style={{ width: "500px" }}>
            <div className="alert alert-danger"> The hat does not exsist.</div>
          </div>
        </>
      );
    }
  }
}

export default withExtras(hatDetail);
