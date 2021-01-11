const message = document.getElementById("pass");


function redirect() {
    fetch('/password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            PassWord: message.value,
        })
    })
}