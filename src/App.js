import { useEffect } from "react";
import "./App.css";
import Login from "./pages/Login";
import { hashParams } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./pages/Player";
import { useDataLayerValue } from "./context/DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  // const [token, setToken] = useState(null);
  const [{ user,token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = hashParams();
    window.location.hash = "";
    const _token = hash.access_token;
    console.log("my token value is :", _token);

    if (_token) {
      // setToken(_token);
      dispatch({
        type:"SET_TOKEN",
        token:_token
      })
      spotify.setAccessToken(_token);

      spotify
        .getMe()
        .then((user) => {
          // console.log("🧑", user);
          dispatch({
            type: "SET_USER",
            user: user,
          });
        })
        .catch((err) => {
          console.log("Error", err);
        });
      }
    }, []);

    console.log("🧑", user);
    console.log("😎", token);

  return <div className="app">{token ? <Player spotify={spotify} /> : <Login />}</div>;
}

export default App;
