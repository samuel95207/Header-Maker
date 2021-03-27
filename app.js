// fabric.js process
var canvas = new fabric.Canvas('edit-area', { width: 400, height: 500 });


//config
defaultTextPos = { top: 367, left: canvas.width / 2 }
defaultImagePos = { top: 0, left: 0 }



// Add frame
fabric.Image.fromURL('./assets/frame.png', function (img) {
    img.scaleX = canvas.width / img.width,
        img.scaleY = canvas.height / img.height
    img.selectable = false;
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height
    });
});



// Add text
var textbox = new fabric.Text('', { ...defaultTextPos });
canvas.add(textbox);
canvas.bringToFront(textbox);
var textInput = document.getElementById('text-input');
console.log(textInput)
textInput.addEventListener('input', (event) => {
    textbox.set('text', textInput.value);
    textbox.set('left', (canvas.width - textbox.width) / 2);
    canvas.renderAll();
})



// File process
var fileElement = document.getElementById("formFile")
fileElement.addEventListener('change', (event) => {
    const fileList = event.target.files;
    console.log(fileList);
    readImage(fileList[0])
})

function readImage(file) {
    // Check if the file is an image.
    if (file.type && file.type.indexOf('image') === -1) {
        console.log('File is not an image.', file.type, file);
        return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        let src = event.target.result;
        fabric.Image.fromURL(src, function (img) {
            let scale = canvas.width / img.width;
            img.scale(scale);

            img.set('left', defaultImagePos.left)
            img.set('top', defaultImagePos.top)

            img.opacity = 0.7;

            canvas.add(img);
            canvas.bringToFront(textbox);

        });
    });
    reader.readAsDataURL(file);
    console.log(file)
}




// Download event
var downloadButton = document.getElementById("download-button")
downloadButton.addEventListener('click', (event) => {
    const dataURL = canvas.toDataURL({
        width: canvas.width,
        height: canvas.height,
        left: 0,
        top: 0,
        format: 'png',
    });
    const link = document.createElement('a');
    link.download = 'header.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
})
