window.addEventListener ('load', allScript,false);
   
    function allScript () {
        const images = document.querySelectorAll('.imageMain');
         images.forEach(img => {
            setTimeout(() => {
            img.style.opacity = '1';
            }, 500); 
          });
    }

    const homePage = document.getElementById('homePage');
    const mainPage = document.getElementById('mainPage');
    function createBook() {    
        homePage.style.display = 'none';
        mainPage.style.display = 'flex';
       }

    class Photo {                                                 //описываем класс фото
        constructor (containerID) {
            this.container = document.getElementById(containerID);
        }
        createImage (src) {
            const imgElem = document.createElement('img');
            imgElem.src = src;
            imgElem.alt = 'Ваше добавленное фото';
            imgElem.style.width = '100px';
            imgElem.style.margin = '2px';
            this.container.appendChild(imgElem);
        }
    }

    function addPhotoForLoad () {                                     // по вводу каждой ссылки на фото создаем новый элемент класса Photo
        const imageURL = document.getElementById('inputUrlImg').value;
        const imgContainer = document.getElementById ('loadedPhotosContainer');
        if (!imageURL.includes('http') ) {
            alert ('URL фото должен начинаться с http, попробуйте еще раз');
        } else {
            const img = new Photo('loadedPhotosContainer');
            img.createImage(imageURL);
            document.getElementById('inputUrlImg').value = '';
        }
    }
