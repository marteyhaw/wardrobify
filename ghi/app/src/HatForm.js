import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function withExtras(Component) {
  return (props) => (
    <Component {...props} params={useParams()} useNavigate={useNavigate()} />
  );
}

class HatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fabric: "",
      style: "",
      color: "",
      picture_url: "",
      location: "",
      locations: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeFabric = this.handleChangeFabric.bind(this);
    this.handleChangeStyle = this.handleChangeStyle.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleChangePictureUrl = this.handleChangePictureUrl.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
  }

  async componentDidMount() {
    const url = "http://localhost:8100/api/locations/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ locations: data.locations });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.locations;

    const HatUrl = "http://localhost:8090/api/hats/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(HatUrl, fetchConfig);

    if (response.ok) {
      let hat_response = await response.json();
      let new_id = hat_response.href.slice(10);
      this.setState({
        fabric: "",
        style: "",
        color: "",
        picture_url: "",
        location: "",
      });
      this.props.useNavigate(`/hats/${new_id}`);
    }
  }

  handleChangeFabric(event) {
    const value = event.target.value;
    this.setState({ fabric: value });
  }

  handleChangeStyle(event) {
    const value = event.target.value;
    this.setState({ style: value });
  }

  handleChangeColor(event) {
    const value = event.target.value;
    this.setState({ color: value });
  }

  handleChangePictureUrl(event) {
    const value = event.target.value;
    this.setState({ picture_url: value });
  }
  handleChangeLocation(event) {
    const value = event.target.value;
    this.setState({ location: value });
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new Hat</h1>
            <form onSubmit={this.handleSubmit} id="create-hat-form">
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChangeFabric}
                  value={this.state.fabric}
                  placeholder="Name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
                <label htmlFor="name">Fabric</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChangeStyle}
                  value={this.state.style}
                  placeholder="Style"
                  required
                  type="text"
                  name="style"
                  id="style"
                  className="form-control"
                />
                <label htmlFor="style">Style</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChangeColor}
                  value={this.state.color}
                  placeholder="Color"
                  required
                  type="text"
                  name="color"
                  id="color"
                  className="form-control"
                />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChangePictureUrl}
                  value={this.state.picture_url}
                  placeholder="Picture Url"
                  required
                  type="url"
                  name="picture_url"
                  id="picture_url"
                  className="form-control"
                />
                <label htmlFor="picture_url">Picture Url</label>
              </div>
              <div className="mb-3">
                <select
                  onChange={this.handleChangeLocation}
                  value={this.state.location}
                  required
                  name="location"
                  id="location"
                  className="form-select"
                >
                  <option value="">Choose a location</option>
                  {this.state.locations.map((location) => {
                    return (
                      <option key={location.id} value={location.id}>
                        {location.closet_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withExtras(HatForm);
