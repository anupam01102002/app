import { Component } from "react";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { MapContainer, Popup, TileLayer, Marker } from "react-leaflet";
import { Spinner } from "react-bootstrap";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      loading: false,
      isEdit: false,
      isEdit2: false,
    };
  }

  componentDidMount() {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          user: response.results,
          loading: true,
          newName: response.results[0].login.username,
          email: response.results[0].email,
        });
      });
  }

  render() {
    var { user, loading, isEdit, newName, email, isEdit2 } = this.state;

    if (!loading) {
      return (
        <div className="App">
          <div className="wrap">
            <Spinner animation="border" variant="secondary" />
          </div>
        </div>
      );
    } else {
      return user.map((item) => {
        
        var dob = moment(item.dob.date).format("DD MMM YYYY");
        var registeredAt = moment(item.registered.date).format("DD MMM YYYY");

        return (
          <div className="App" key={item.cell}>
            <div className="map">
              <div className="mapLeft">
            <h2>Map with Location</h2>
              </div>
              <div className="mapRight">
                <MapContainer
                  center={[
                    user[0].location.coordinates.latitude,
                    user[0].location.coordinates.longitude,
                  ]}
                  zoom={13}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[
                      user[0].location.coordinates.latitude,
                      user[0].location.coordinates.longitude,
                    ]}
                  >
                    <Popup>
                      location of {user[0].name.title} {user[0].name.first}{" "}
                      {user[0].name.last} .
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
            <div className="main-container">
              <div className="profile-container">
                    <div className="image">
                      <img src={item.picture.large}/>
                    </div>
                    <div className="profile-name">
                      <h2>{item.name.title} {item.name.first} {item.name.last}</h2>
                    </div>
              </div>

              <div className="datadiv" style={{ marginTop:"70px" }}>
                <div className="divLeft">
                  <span>Username</span>
                </div>
                <div className="divRight">
                  {isEdit ? (
                    <>
                      <input
                        type={"text"}
                        onChange={(e) =>
                          this.setState({ newName: e.target.value })
                        }
                        value={newName}
                      />{" "}
                      <button
                        onClick={() => this.setState({ isEdit: false })}
                        className="btn"
                      >
                        save
                      </button>
                    </>
                  ) : (
                    <div>
                      {newName}{" "}
                      <button
                        onClick={() => this.setState({ isEdit: true })}
                        className="btn"
                      >
                        edit
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="datadiv">
                <div className="divLeft">
                  <span>Email</span>
                </div>
                <div className="divRight">
                  {isEdit2 ? (
                    <>
                      <input
                        type={"text"}
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                        value={email}
                      />{" "}
                      <button
                        onClick={() => this.setState({ isEdit2: false })}
                        className="btn"
                      >
                        save
                      </button>
                    </>
                  ) : (
                    <div>
                      {email}{" "}
                      <button
                        onClick={() => this.setState({ isEdit2: true })}
                        className="btn"
                      >
                        edit
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="datadiv">
                <div className="divLeft">
                  <span>Gender</span>
                </div>
                <div className="divRight">
                  <span>{item.gender}</span>
                </div>
              </div>

              <div className="datadiv">
                <div className="divLeft">
                  <span>Date of Birth</span>
                </div>
                <div className="divRight">
                  <span>{dob}</span> 
                </div>
              </div>

              <div className="datadiv">
                <div className="divLeft">
                  <span>Date of Registering</span>
                </div>
                <div className="divRight">
                  <span>{registeredAt}</span> 
                </div>
              </div>

              <div className="datadiv">
                <div className="divLeft">
                  <span>Phone Number</span>
                </div>
                <div className="divRight">
                  <span>{item.phone}</span>
                </div>
              </div>

              <div className="datadiv">
                <div className="divLeft">
                  <span>Address</span>
                </div>
                <div className="divRight">
                  <span>
                    {item.location.street.number}, {item.location.street.name} ,{" "}
                    {item.location.city} , {item.location.state} , {item.location.country}{" "}
                  </span>
                </div>
              </div>

            </div>
            {/* 
            {dob}
            {registeredAt}
            {item.dob.date}
            {item.name.first}

            <h2>{user[0].dob.date}</h2>
            <h2>{newName}</h2> */}
          </div>
        );
      });
    }
  }
}
