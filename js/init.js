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

    /*class Photo {                                                 //описываем классы фото, страницы и альбом
        constructor (containerID) {
            this.container = document.getElementById(containerID);
        }
        createImage (src) {
            const imgDiv = document.createElement('div');
            const imgElem = document.createElement('img');
            const closeSpan = document.createElement('span');
            imgElem.src = src;
            imgElem.alt = 'Ваше добавленное фото';
            imgElem.style.width = '100px';
            imgDiv.className = "imgDiv";
            closeSpan.textContent= "x"
            closeSpan.className = 'closeSpan';
            this.container.appendChild(imgDiv);
            imgDiv.appendChild(imgElem);
            imgDiv.appendChild(closeSpan);
            closeSpan.addEventListener('click', deleteImg, false);
           
            

        }
    }*/
   class Photo {
    constructor(url) {
        this.url = url;
    }
   }
    class Page {
        constructor(title) {
            this.photos = [];
        }
        addPhoto (photo) {
            this.photos.push(photo);
        }
        removePhoto(photo) {
            const index = this.photos.indexOf(photo);
                if (index > -1) {
                    this.photos.splice(index, 1);
                }
        }  
        getPhotos() {
             return this.photos;
          }
    }
    class Album {
        constructor(title) {
            this.title = title; 
            this.pages = [];
        } 
        addPage(page) {
            this.pages.push(page);
        }
        removePage(pageIndex) {
            if (pageIndex >= 0 && pageIndex < this.pages.length) {
                this.pages.splice(pageIndex, 1);
            } else {
            alert(`Страницы с индексом ${pageIndex} не существует.`);
            }
        }
        getPages() {
            return this.pages;
        }
        getPageCount() {
            return this.pages.length;
        }
    }

    const myAlbum = new Album('Путешествия');
    const page1 = new Page();
    const page2 = new Page();
    const page3 = new Page();

    const img1 = new Photo('https://amiel.club/uploads/posts/2022-03/1647653856_1-amiel-club-p-krasivie-kartinki-puteshestviya-1.jpg');
    const img2 = new Photo('https://krots.top/uploads/posts/2022-02/1644831473_5-krot-info-p-fon-turizm-5.jpg');
    const img3 = new Photo('https://st.depositphotos.com/1000970/2346/i/450/depositphotos_23467114-stock-photo-couple-on-a-beach.jpg');
    const img4 = new Photo('https://st.depositphotos.com/1000970/4291/i/450/depositphotos_42911817-stock-photo-couple-in-green-on-a.jpg');
    const img5 = new Photo('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZtIOhwEhf2JoZqyd8ViBfteOsxWzhoDCESA&s');
    const img6 = new Photo('https://static.aviasales.com/psgr-v2/ru/quickie/ang5_819x1024_8b9b360aa9.jpg?');

    myAlbum.addPage(page1);
    myAlbum.addPage(page2);
    myAlbum.addPage(page3);

    page1.addPhoto(img4);
    page1.addPhoto(img6);

    page2.addPhoto(img3);
    page2.addPhoto(img4);
    page2.addPhoto(img5);

    page3.addPhoto(img6);

    console.log(myAlbum);

    const constructor = document.getElementById('redactor-field');
    function drawPage1(page) {
        const photoCont1 = document.createElement('div');
        const photoCont2 = document.createElement('div');
        const photo1 = document.createElement('img');
        const photo2 = document.createElement('img');
        photo1.src = page.photos[0].url;
        photo2.src = page.photos[1].url;
        photo1.style.width = '100%';
        photo2.style.width = '100%';
        photoCont1.classList.add('page1');
        photoCont2.classList.add('page1');
        photoCont1.appendChild(photo1);
        photoCont2.appendChild(photo2);
        constructor.appendChild(photoCont1);
        constructor.appendChild(photoCont2);
    }
    drawPage1(page1);


   /* function addPhotoForLoad () {                                     // по вводу каждой ссылки на фото создаем новый элемент класса Photo
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

        function deleteImg (eo) {
                const clickedImg = eo.currentTarget;
                const parent =clickedImg.parentElement; 
                parent.remove();
        }*/