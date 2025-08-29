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
        getPhotoCount() {
            return this.photos.length;
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
    const page4 = new Page();
    const page5 = new Page();

    const img1 = new Photo('https://amiel.club/uploads/posts/2022-03/1647653856_1-amiel-club-p-krasivie-kartinki-puteshestviya-1.jpg');
    const img2 = new Photo('https://krots.top/uploads/posts/2022-02/1644831473_5-krot-info-p-fon-turizm-5.jpg');
    const img3 = new Photo('https://st.depositphotos.com/1000970/2346/i/450/depositphotos_23467114-stock-photo-couple-on-a-beach.jpg');
    const img4 = new Photo('https://st.depositphotos.com/1000970/4291/i/450/depositphotos_42911817-stock-photo-couple-in-green-on-a.jpg');
    const img5 = new Photo('https://cdn.pixabay.com/photo/2015/05/02/06/58/friends-749571_640.jpg');
    const img6 = new Photo('https://static.aviasales.com/psgr-v2/ru/quickie/ang5_819x1024_8b9b360aa9.jpg?');

    myAlbum.addPage(page1);
    myAlbum.addPage(page2);
    myAlbum.addPage(page3);
    myAlbum.addPage(page4);
    myAlbum.addPage(page5);

    page1.addPhoto(img4);
    page1.addPhoto(img6);

    page2.addPhoto(img3);
    page2.addPhoto(img4);
    page2.addPhoto(img5);

    page3.addPhoto(img6);

    page4.addPhoto(img2);
    page4.addPhoto(img3);
    page4.addPhoto(img5);
    page4.addPhoto(img6);

    console.log(myAlbum);

    
    function drawPage (page) {                       //функция рисования страницы в зависимости от количества фото на ней
        const redactorField = document.getElementById('redactor-field');
        const pageField = document.createElement('div');
        redactorField.appendChild(pageField);
        pageField.classList.add('page-field');
        const numPhotos = page.getPhotoCount();
        
        for (i=0; i < numPhotos; i++) {
            const photoCont=document.createElement('div');
            const photo = document.createElement('img');
            photo.src = page.photos[i].url;
            photo.style.width = '100%';
            switch (numPhotos) {
                case 1:
                    photoCont.classList.add('page1');
                    break;
                case 2:
                    photoCont.classList.add('page2');
                    break;
                case 3:
                    photoCont.classList.add('page3');
                    break;
                case 4:
                    photoCont.classList.add('page4');
                    break;
            }
           
            photoCont.appendChild(photo);
            pageField.appendChild(photoCont);
        }
    }
 
    
    drawPage(page4);
    drawPage(page3);
    drawPage(page1);
    drawPage(page2);
    const pageFields = document.querySelectorAll('.page-field');
    let currentIndex=0;
   
    function setActivePage (index) {
        
        for (let i=0; i<pageFields.length; i++) {
           
            pageFields[i].classList.remove('active');
             pageFields[i].style.transform = `translateX(${(i-index)*100}%)`;
        }
        pageFields[index].classList.add('active');
        pageFields[index].style.transform = 'translateX(0)';
    }
    
    function prevPage () {
        if (currentIndex === 0) {
            return;
        } else {
            currentIndex = (currentIndex-1+pageFields.length)%pageFields.length;
        console.log(currentIndex);
        
        setActivePage (currentIndex);
        }
        
    }
    function nextPage() {
        if (currentIndex === pageFields.length - 1) {
            return;
        } else {
            currentIndex = (currentIndex+1)%pageFields.length;
        setActivePage (currentIndex);
        }
        
    }
    setActivePage(currentIndex);

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