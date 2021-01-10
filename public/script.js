// fetch('src/Data.json')
//     .then(function (res) {
//         return res.json()
//     })
//     .then(function (data) {
//         appendData(data)
//         // console.log(data)

//     }).catch(err => {
//         console.log(err)
//     })



function QR() {
    var QRCODE = new QRCode(document.getElementById("qrcode"), {
        width: 150,
        height: 150,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
    return QRCODE
}

function NewUser() {
    var message = document.getElementById('submitbox')
    if (!message) {
        alert('Please Enter a Password To Make a New User Data')
        message.focus()
        return
    }
    let QRCODE = QR()
    QRCODE.makeCode(`http://localhost:3000/users?user=${message.value}`)
    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                name: message.value,
            }
        })
    });


    // fetch("/users").then(res => {
    //     res.json()
    // }).then(neww => {
    //     document.querySelector("form").addEventListener("submit", event => {
    //         event.preventDefault();
    //         console.log('runs')
    //     })
    //     neww.push(message.value)
    //     console.log(message.value)
    // })
}