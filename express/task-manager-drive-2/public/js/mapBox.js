
export const mapBox = () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWluaGJpZW4iLCJhIjoiY2wweHhtcjQ3MWoxeTNqb2EzdDRlZHo4MCJ9.7LVK46-MdnV30KWXyNc5bQ';

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
}