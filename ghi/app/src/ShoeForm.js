import React from "react";

class ShoeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturer: "",
      model_name: "",
      color: "",
      picture_url: "",
      bin: "",
      bins: [],
      success: false,
      failedAttempt: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.bins;
    delete data.success;
    delete data.failedAttempt;

    const shoesUrl = `http://localhost:8080/api/bins/${data.bin}/shoes/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(shoesUrl, fetchConfig);
    if (response.ok) {
      const cleared = {
        manufacturer: "",
        model_name: "",
        color: "",
        picture_url: "",
        bin: "",
        success: true,
        failedAttempt: false,
      };
      this.setState(cleared);
      setTimeout(() => {
        this.setState({ success: false });
      }, 2000);
    } else {
      this.setState({ failedAttempt: true });
      setTimeout(() => {
        this.setState({ failedAttempt: false });
      }, 1000);
    }
  }

  handleInputChange(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  async componentDidMount() {
    const url = "http://localhost:8100/api/bins/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ bins: data.bins });
    }
  }

  render() {
    let addedShoeClasses = "d-none";
    if (this.state.success) {
      addedShoeClasses = "mt-5 container alert alert-success mb-0";
    }
    let failedAttemptClasses = "d-none";
    if (this.state.failedAttempt) {
      failedAttemptClasses = "mt-5 container alert alert-danger mb-0";
    }

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new shoe</h1>
            <form onSubmit={this.handleSubmit} id="create-shoe-form">
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleInputChange}
                  value={this.state.manufacturer}
                  placeholder="Manufacturer"
                  required
                  type="text"
                  name="manufacturer"
                  id="manufacturer"
                  className="form-control"
                />
                <label htmlFor="name">Manufacturer</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleInputChange}
                  value={this.state.model_name}
                  placeholder="Model name"
                  required
                  type="text"
                  name="model_name"
                  id="model_name"
                  className="form-control"
                />
                <label htmlFor="model_name">Model name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleInputChange}
                  value={this.state.color}
                  placeholder="Color"
                  type="text"
                  name="color"
                  id="color"
                  className="form-control"
                />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleInputChange}
                  value={this.state.picture_url}
                  placeholder="Picture URL"
                  required
                  type="url"
                  name="picture_url"
                  id="picture_url"
                  className="form-control"
                />
                <label htmlFor="picture_url">Picture URL</label>
              </div>
              <div className="mb-3">
                <select
                  onChange={this.handleInputChange}
                  value={this.state.bin}
                  required
                  name="bin"
                  id="bin"
                  className="form-select"
                >
                  <option value="">Choose a bin</option>
                  {this.state.bins.map((bin) => {
                    return (
                      <option key={bin.id} value={bin.id}>
                        Bin# {bin.bin_number} in Closet {bin.closet_name} (ID:
                        {bin.id})
                      </option>
                    );
                  })}
                </select>
              </div>

              <button className="btn btn-primary">Create</button>
            </form>
          </div>
          <div className={addedShoeClasses} id="added-shoe-message">
            The shoe has been added.
          </div>
          <div className={failedAttemptClasses} id="failed-attempt-message">
            Failed to add the shoe... please try again in one minute...
          </div>
        </div>
      </div>
    );
  }
}

export default ShoeForm;
