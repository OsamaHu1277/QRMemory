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
async function NewUser() {
    var message = document.getElementById('submitbox')
    if (!message.value) {
        alert('Please Enter a Password To Make a New User Data')
        message.focus()
        return
    }
    let QRCODE = QR()
    document.getElementById("qrcode").firstElementChild.remove()
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
}