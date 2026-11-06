
const places = [
    {
        name: "Tiger Hill",
        category: "Hill Station",
        district: "Darjeeling",
        description: "Enjoy a beautiful sunrise over the Himalayas.",
        image: "c:\Users\RIHAN SUBBA\Downloads\images.jpg"
    },
    {
        name: "Batasia Loop",
        category: "Historical",
        district: "Darjeeling",
        description: "A famous railway loop with a war memorial.",
        image: "c:\Users\RIHAN SUBBA\Downloads\tiger-hill-darjeeling-1024x541.webp"
    },
    {
        name: "Mirik Lake",
        category: "Hill Station",
        district: "Mirik",
        description: "A peaceful lake surrounded by green hills.",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600"
    },
    {
        name: "Rock Garden",
        category: "Waterfall",
        district: "Darjeeling",
        description: "A garden with waterfalls and beautiful scenery.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600"
    },
    {
        name: "Kurseong",
        category: "Hill Station",
        district: "Kurseong",
        description: "A quiet hill town surrounded by tea gardens.",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600"
    }
];

let favorites = [];

function displayPlaces(list) {
    const area = document.getElementById("placeList");
    area.innerHTML = "";

    if (list.length === 0) {
        area.innerHTML = "<p>No destinations found. Try another search.</p>";
        return;
    }

    list.forEach(place => {
        const saved = favorites.includes(place.name);

        area.innerHTML += `
            <div class="place">
                <img src="${place.image}" alt="${place.name}">
                <h3>${place.name}</h3>
                <p>${place.description}</p>
                <p>${place.category} | ${place.district}</p>
                <button onclick="toggleFavorite('${place.name}')">
                    ${saved ? "♥ Saved" : "♡ Add Favorite"}
                </button>
            </div>
        `;
    });
}

function showPlaces() {
    const search = document.getElementById("search").value.toLowerCase();
    const category = document.getElementById("category").value;
    const district = document.getElementById("district").value;

    const filtered = places.filter(place =>
        place.name.toLowerCase().includes(search) &&
        (category === "all" || place.category === category) &&
        (district === "all" || place.district === district)
    );

    displayPlaces(filtered);
}

function toggleFavorite(name) {
    if (favorites.includes(name)) {
        favorites = favorites.filter(place => place !== name);
    } else {
        favorites.push(name);
    }

    showPlaces();
}

function showFavorites() {
    const saved = places.filter(place => favorites.includes(place.name));
    displayPlaces(saved);
}

function randomPlace() {
    const place = places[Math.floor(Math.random() * places.length)];

    document.getElementById("randomResult").innerHTML =
        "Your next destination is: " + place.name;

    document.getElementById("randomResult").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

function calculateBudget() {
    const days = Number(document.getElementById("days").value);
    const people = Number(document.getElementById("people").value);
    const daily = Number(document.getElementById("daily").value);

    if (days < 1 || people < 1 || daily < 0 ||
        !Number.isInteger(days) || !Number.isInteger(people)) {
        document.getElementById("budgetResult").innerHTML =
            "Please enter valid values.";
        return;
    }

    const total = days * people * daily;

    document.getElementById("budgetResult").innerHTML =
        "Estimated Total Budget: ₹" + total.toLocaleString("en-IN");
}

function openImage(image) {
    document.getElementById("largeImage").src = image;
    document.getElementById("imageViewer").style.display = "flex";
}

function closeImage() {
    document.getElementById("imageViewer").style.display = "none";
}

document.getElementById("search").addEventListener("input", showPlaces);
document.getElementById("category").addEventListener("change", showPlaces);
document.getElementById("district").addEventListener("change", showPlaces);

displayPlaces(places);
