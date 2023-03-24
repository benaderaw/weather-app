import MainView from "./mainView";

class MapView extends MainView {
  //
  parentElement = document.querySelector(".map-btn");

  // REMOVE HIDDEN FROM MAP CONTAINER
  displayMapContainer() {
    // toggle weather container = boarder zero to smooth
    this.container.classList.toggle("borderToZero");

    // toggle the map (show/hide)
    this.mapContainer.classList.toggle("hidden");

    // change the map-btn
    this.mapBtn.classList.toggle("map-btn-toggled");
  }

  // EVENT HANDLER
  displayBtnHandler(handler) {
    this.parentElement.addEventListener("click", handler);
  }
}

export default new MapView();
