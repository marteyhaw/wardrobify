import React from "react";
import { Link } from "react-router-dom";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function ClothingColumn(props) {
  return (
    <div className="col" style={{ minWidth: "200px" }}>
      {props.list.map((data) => {
        return (
          <div
            key={data.href}
            className="card mb-3 shadow"
            style={{ maxHeight: "200px", maxWidth: "200px" }}
          >
            <Link to={`${data.href.slice(4)}`}>
              <img
                src={data.picture_url}
                className="card-img-top"
                style={{ maxHeight: "200px", maxWidth: "200px" }}
                alt={data.picture_url}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hats: [],
      shoes: [],
      clothingColumns: [],
    };
  }

  async componentDidMount() {
    const hatsUrl = "http://localhost:8090/api/hats/";
    const shoeUrl = "http://localhost:8080/api/shoes/";

    try {
      const response = await fetch(hatsUrl);
      const response2 = await fetch(shoeUrl);
      if (response.ok && response2.ok) {
        const data = await response.json();
        const data2 = await response2.json();
        data.hats = shuffle(data.hats);
        data2.shoes = shuffle(data2.shoes);
        this.setState({ ...data });
        this.setState({ ...data2 });
        const requests = [];
        for (let hat of data.hats) {
          const hatDetailUrl = `http://localhost:8090/api/hats/${hat.id}/`;
          requests.push(fetch(hatDetailUrl));
        }
        for (let shoe of data2.shoes) {
          const shoeDetailUrl = `http://localhost:8080${shoe.href}`;
          requests.push(fetch(shoeDetailUrl));
        }
        const responses = await Promise.all(requests);
        const clothingColumns = [[], [], [], [], []];
        let i = 0;
        for (const clothingResponse of responses) {
          if (clothingResponse.ok) {
            const clothingDetails = await clothingResponse.json();
            clothingColumns[i].push(clothingDetails);
            i = i + 1;
            if (i > 4) {
              i = 0;
            }
          } else {
            console.error(clothingResponse);
          }
        }
        for (let eachArray in clothingColumns) {
          shuffle(clothingColumns[eachArray]);
        }
        this.setState({ clothingColumns: clothingColumns });
      }
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    return (
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">WARDROBIFY!</h1>
        <div className="col-lg-7 mx-auto">
          <p className="lead mb-4">
            Need to keep track of your shoes and hats? We have the solution for
            you!
          </p>
          <div className="row">
            {this.state.clothingColumns.map((clothingList, index) => {
              return <ClothingColumn key={index} list={clothingList} />;
            })}
          </div>
          {/* <div className="grid">
            <div className="col">
              {this.state.hats.map((hat) => {
                return (
                  <div key={hat.id}>
                    <Link to={`/hats/${hat.id}`}>
                      <img
                        src={hat.picture_url}
                        alt={hat.style}
                        className="card-img-top "
                        style={{ width: "250px" }}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="col">
              {this.state.shoes.map((shoe) => {
                return (
                  <div key={shoe.href}>
                    <Link to={`/shoes/${shoe.href.slice(11)}`}>
                      <img
                        src={shoe.picture_url}
                        alt={shoe.manufacturer}
                        className="card-img-top "
                        style={{ width: "250px" }}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default MainPage;
