const DataList = document.getElementById("List");
const DataForm = document.querySelector("form");
const message = document.getElementById("AddData");

function appendNewDream(Data) {
    const newListItem = document.createElement("li");
    newListItem.innerText = Data;
    DataList.appendChild(newListItem);
}

function updateDiv() {
    $("#List").load(window.location.href + " #List");
}

var GetURL = window.location.href.match(/\/users\?user=.+/g)
var file = GetURL[0].split(/\/users\?user=/g).join(" ").slice(1)
console.log(file)
fetch(`/${file}.json`)
    .then(response => response.json())
    .then(List => {
        DataList.firstElementChild.remove();
        List.forEach(appendNewDream);
        DataForm.addEventListener("submit", event => {
            fetch('/NewData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        name: message.value,
                    }
                })
            })
            DataForm.reset()
            event.preventDefault();
            DataList.load(`user.html`)
        });
    });