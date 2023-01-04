const userName = localStorage.getItem('name');
const userInfo = document.querySelector("#user_info");

async function draw(){
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    let result = await response.json();
    console.log(result);

    for(let user of result){
        if(user.name === userName){
            console.log(user.name);

            userInfo.innerHTML += `
            <p>${user.name}</p>
            <p>email: ${user.email}</p>
            <p>address: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
            <p>geo: ${user.address.geo.lat}, ${user.address.geo.lng}</p>
            `;

            ymaps.ready(init);
            function init(){
                let myMap = new ymaps.Map("map", {
                    center: [user.address.geo.lat, user.address.geo.lng],
                    zoom: 5
                });

                let myGeoObject = new ymaps.GeoObject({
                    geometry: {
                        type: "Point", // тип геометрии - точка
                        coordinates: [user.address.geo.lat, user.address.geo.lng] // координаты точки
                    }
                });

                myMap.geoObjects.add(myGeoObject);
            }

        }
    }
}

draw();