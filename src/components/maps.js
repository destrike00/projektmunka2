import React from "react";
import { compose, withProps } from "react-recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCtbOcct0fXFZb7divjazGMcihOpfv9DMg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, width: "100%" }} />,
    mapElement: <div style={{ height: `100%`, width: "100%" }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={17}
    defaultCenter={{ lat: 47.695214914312466, lng: 17.627176071971903 }}
  >
    <Marker position={{ lat: 47.69517261988088, lng: 17.627355078538464 }} />
  </GoogleMap>
));

class Map extends React.PureComponent {
  state = {
    isMarkerShown: true,
  };

  render() {
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    );
  }
}
export default Map;
