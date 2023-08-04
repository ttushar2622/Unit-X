const accessKey = 'jdY1km6bzJdKrWScPmtpk8KrWR_39hc-6C9uODKPrw4';
const APIURL = 'https://api.unsplash.com/search/photos';

const categoryInput = document.getElementById('categoryInput');
const searchButton = document.getElementById('searchButton');
const pictureGrid = document.getElementById('pictureGrid');

searchButton.addEventListener('click', () => {
    const category = categoryInput.value.trim();
    if (category === '') {
        alert("Input box can't be empty");
        return;
    }
    fetchData(category);
});

async function fetchData(category) {
    const res = await fetch(`${APIURL}?query=${category}&per_page=12`, {
        headers: {
            Authorization: `Client-ID ${accessKey}`,
        },
    });
    const data = await res.json();
    console.log(data)
    displayImage(data.results);
}

function displayImage(pictures) {
    pictureGrid.innerHTML = "";

    pictures.forEach((picture) => {
        const pictureCard = document.createElement('div');
        pictureCard.setAttribute("class","picture-card");

        const pictureImg = document.createElement('img');
        pictureImg.setAttribute("class","picture-img");
        pictureImg.src = picture.urls.small;
        pictureImg.alt = picture.alt_description;

        const pictureInfo = document.createElement('div');
        pictureInfo.setAttribute("class","picture-info");
        pictureInfo.innerHTML = `
            <p>By: ${picture.user.name}</p>
            <p>${picture.alt_description}</p>
            <a href="${picture.links.html}" target="_blank">View on Unsplash</a>
        `;

        pictureCard.append(pictureImg,pictureInfo);
        pictureGrid.append(pictureCard);
    });
}
