const form = document.querySelector("#searchForm");
let div = document.querySelector("#container");
const ul = document.querySelector("#ratingList");
const searchBtn = document.querySelector("#searchBtn");
const title = document.querySelector("#title");

const reset = () => {
    ul.innerText = '';
}

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    reset();
    const showName = form.elements.query.value;
    const config = { params: { q: showName } }
    const res = await axios.get(`https://api.tvmaze.com/search/shows?q=`, config)
    display(res.data);
    form.elements.query.value = '';
});

searchBtn.addEventListener('click', () => {
    div.style.position = "relative";
    div.style.top = "0";
    title.style.marginTop = "5rem";
})

const display = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('IMG');
            img.classList.add('movieData')
            img.src = result.show.image.medium;
            ul.append(img);
        }
        if (result.show.name && result.show.premiered) {
            const title = result.show.name;
            const date = result.show.premiered;
            const li = document.createElement('li');
            li.classList.add('movieData')
            li.textContent = `${title} (${date})`;
            ul.append(li);
        }
        if (result.show.rating) {
            const avg = result.show.rating.average;
            const li = document.createElement('li');
            li.classList.add('movieData')
            li.textContent = `Rating: ${avg}`;
            ul.append(li);
            if (avg === null) {
                li.textContent = `Rating Unavailable`;
            }
        }
    }
}
