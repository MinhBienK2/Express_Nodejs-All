const socket = io();

const output = (() => {
  const outputs = document.querySelector('#tbodyId');
  socket.on('qrcode',(data)=>{
    const datas = JSON.parse(data)
    let lastElement = datas[datas.length - 1]
    outputs.insertAdjacentHTML('beforeend', `
      <tr>
        <td> ${lastElement.name} </td>
        <td> ${lastElement.email} </td>
        <td> ${lastElement.phoneNumber} </td>
        <td> ${lastElement.className} </td>
        <td> ${lastElement.point} </td>
        <td> ${lastElement.comment} </td>
      </tr>
    `)

    // console.log(datas)
  // console.log(outputs)

    // outputs.innerHTML = datas
    // console.log(data)
  })
})();

const errorScan = (() => {
  socket.on('errorScan',(data)=>{
    alert(data)
  })
})()

let lastResult, countResults = 0;

function onScanSuccess(decodedText, decodedResult) {
    if(decodedText === lastResult && countResults == 1){
      alert('exist Student')
    }
  
  if (decodedText !== lastResult) {
    ++countResults;
    lastResult = decodedText;
    socket.emit('qrcode',lastResult)
    alert('Scan success')
  }
}

let html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  { fps: 100, qrbox: { width: 250, height: 250 } },
  /* verbose= */ false
);

html5QrcodeScanner.render(onScanSuccess);
// This method will trigger user permissions
Html5Qrcode.getCameras()
  .then((devices) => {
    /**
     * devices would be an array of objects of type:
     * { id: "id", label: "label" }
     */
    console.log(devices);
    if (devices && devices.length) {
      var cameraId = devices[0].id;
      console.log(cameraId);
    }
  })
  .catch((err) => {
    // handle err
  });