//video from webcam
const video = document.querySelector('.player');
//snapshots of video
const canvas = document.querySelector('.photo');
//
const ctx = canvas.getContext('2d');
//list of images
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

//get the video from webcam
function getVideo() {
  //way to get video media. pass in video as true and audio as false
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    //return a promise
    .then(localMediaStream => {
      //console.log(localMediaStream);
      //set video to be live stream
      video.src = window.URL.createObjectURL(localMediaStream);
      //play the live video
      video.play();
    })
    //promise if error for access denied
    .catch(err => {
      console.error("no video found ", err);
    })
}
//create canvas of video
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  //make canvas same size as video
  canvas.width = width;
  canvas.height = height;
  //for every 16 milisec take an video image and app in canvas
  return setInterval(() => {
    //take canvas context and start at top left corner of canvas
    ctx.drawImage(video, 0, 0)
    //get pixel data
    let pixels = ctx.getImageData(0, 0, width, height);
     apply function to pixels as red color
    //pixels = redEffect(pixels);
    //apply pixels with rgb colors
    //pixels = rgbSplit(pixels);
    //apply greenscreen function to pixels
    //pixels = greenScreen(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 16)
}

function takePhoto() {
  //photo snap audio when called
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg');
  //create an anchor link
  const link = document.createElement('a');
  link.href = data;
  //name when photo is downloaded handsome.jpeg
  link.setAttribute('download', 'handsome');
  //name of image on DOM and image visible
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firstChild);
  //photo in text based form
  //console.log(data);
}
//filter by taking the pixels on the canvas and apply function
function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i+=4) {
      pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}
getVideo();



video.addEventListener('canplay', paintToCanvas);