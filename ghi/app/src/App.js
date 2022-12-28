import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ShoeList from "./ShoeList";
import HatList from "./HatList";
import ShoeForm from "./ShoeForm";
import HatForm from "./HatForm";
import ShoeDetail from "./ShoeDetail";
import HatDetail from "./HatDetail";
import BinForm from "./BinForm";
import BinList from "./BinList";
import LocationList from "./Locationlist";
import LocationForm from "./LocationForm";

function App(props) {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="shoes">
            <Route index element={<ShoeList />} />
            <Route path="new" element={<ShoeForm />} />
            <Route path=":id" element={<ShoeDetail />} />
          </Route>
          <Route path="hats">
            <Route index element={<HatList />} />
            <Route path="new" element={<HatForm />}></Route>
            <Route path=":id" element={<HatDetail />} />
          </Route>
          <Route path="bins">
            <Route index element={<BinList />} />
            <Route path="new" element={<BinForm />} />
          </Route>
          <Route path="locations">
            <Route index element={<LocationList />} />
            <Route path="new" element={<LocationForm />} />
          </Route>
          <Route
            path="*"
            element={
              <main className="danger danger-alert" style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
