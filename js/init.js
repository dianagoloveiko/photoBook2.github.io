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

       let currentIndex=1;
  
   class Photo {
    constructor(url,description) {
        this.url = url;
        this.description = description;
    }
   }
    class Page {
        constructor(pageNumber,numPhotos) {
            this.photos = [];
            this.numPhotos = numPhotos;
            this.pageNumber = pageNumber;
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
        displayPage () {                                 //создаем шаблон страницы
            const redactorField = document.getElementById('redactor-field');
            const pageDiv = document.createElement('div');
            pageDiv.dataset.pageNumber = this.pageNumber;
            redactorField.appendChild(pageDiv);
            pageDiv.classList.add('page-div');
            if (this.numPhotos === 1) {
                const photoDiv=document.createElement('div');
                photoDiv.classList.add ('photo-div');
                photoDiv.classList.add('one-photo');
                const buttonAddPhoto = document.createElement('button');
                buttonAddPhoto.classList.add('buttonAddPhoto');
                buttonAddPhoto.textContent = 'Добавить фото';
                buttonAddPhoto.id = 'oneButton';
                photoDiv.dataset.index = `11`;
                     buttonAddPhoto.dataset.index = `11`;
                photoDiv.appendChild(buttonAddPhoto);
                buttonAddPhoto.addEventListener('click', () => this.createPhoto());
                photoDiv.classList.add('one-photo');
                pageDiv.appendChild(photoDiv);
            }
            if (this.numPhotos === 2) {
                for (let i=1; i<3; i++) {
                    const photoDiv=document.createElement('div');
                    photoDiv.classList.add ('photo-div');
                    photoDiv.classList.add('two-photo');
                    photoDiv.id = `twoPhoto${i}`;
                    const buttonAddPhoto = document.createElement('button');
                    buttonAddPhoto.classList.add('buttonAddPhoto');
                    buttonAddPhoto.textContent = 'Добавить фото';
                    buttonAddPhoto.id = `twoButton${i}`;
                     photoDiv.dataset.index = `2${i}`;
                     buttonAddPhoto.dataset.index = `2${i}`;
                    photoDiv.appendChild(buttonAddPhoto);
                    buttonAddPhoto.addEventListener('click', () => this.createPhoto());
                    pageDiv.appendChild(photoDiv);
                }
            }
             if (this.numPhotos === 3) {
                for (let i=1; i<4; i++) {
                    const photoDiv=document.createElement('div');
                    photoDiv.classList.add ('photo-div');
                    photoDiv.classList.add('three-photo');
                    photoDiv.id = `threePhoto${i}`;
                   
                    const buttonAddPhoto = document.createElement('button');
                    buttonAddPhoto.classList.add('buttonAddPhoto');
                    buttonAddPhoto.textContent = 'Добавить фото';
                    buttonAddPhoto.id = `threeButton${i}`;
                     photoDiv.dataset.index = `3${i}`;
                     buttonAddPhoto.dataset.index = `3${i}`;
                    photoDiv.appendChild(buttonAddPhoto);
                    buttonAddPhoto.addEventListener('click', () => this.createPhoto());
                    pageDiv.appendChild(photoDiv);
                }
            }
             if (this.numPhotos === 4) {
                for (let i=1; i<5; i++) {
                    const photoDiv=document.createElement('div');
                    photoDiv.classList.add ('photo-div');
                    photoDiv.classList.add('four-photo');
                    photoDiv.id = `fourPhoto${i}`;
                    const buttonAddPhoto = document.createElement('button');
                    buttonAddPhoto.classList.add('buttonAddPhoto');
                    buttonAddPhoto.textContent = 'Добавить фото';
                    buttonAddPhoto.id = `fourButton${i}`;
                     photoDiv.dataset.index = `4${i}`;
                     buttonAddPhoto.dataset.index = `4${i}`;
                    photoDiv.appendChild(buttonAddPhoto);
                    buttonAddPhoto.addEventListener('click', () => this.createPhoto());
                    pageDiv.appendChild(photoDiv);
                }
            }
            if (this.numPhotos === 0) {
                    const buttonAddPhoto = document.createElement('button');
                    buttonAddPhoto.classList.add('buttonAddPhoto');
                    buttonAddPhoto.textContent = 'Добавить фото';
                    buttonAddPhoto.id = `nullButton`;
                    buttonAddPhoto.dataset.index = `0`;
                    const buttonFinishAdding = document.createElement('button');
                    buttonFinishAdding.textContent = 'Закончить добавление фото';
                    buttonFinishAdding.classList.add('buttonFinishAdding');
                    buttonFinishAdding.id = `finishAddPhotoButton`;
                    pageDiv.appendChild(buttonFinishAdding);
                    pageDiv.appendChild(buttonAddPhoto);
                    buttonAddPhoto.addEventListener('click', () => this.addPhotoAbsolute());
                    buttonFinishAdding.addEventListener('click', () => this.finishAdding());
            }

        }
        createPhoto (eo) {                                   //добавляем фото в див-контейнер
           const clickedButton = event.target;
           console.log (clickedButton);
            const photoUrl = prompt('Введите url фото');
            const photoDiscription = prompt ('Введите описание фото');
            const index = clickedButton.dataset.index;
            const newPhoto = new Photo(photoUrl, photoDiscription);
                this.photos.push(newPhoto);
            console.log (index);
           const photoDivs = document.querySelectorAll('.photo-div');
           const photoDivClicked =  Array.from(photoDivs).find(div => div.dataset.index === index );
           console.log(photoDivClicked);
           const img = document.createElement('img');
            img.src = newPhoto.url;
            img.style.width = '100%';
            img.classList.add ("photo-in-div");
            photoDivClicked.appendChild(img);
            clickedButton.remove();  
        } 
         addPhotoAbsolute () {                           //добавляем абсолютно-спозиционированное фото на пустую страницу
            const pageDiv = document.querySelector('.page-div');
            const photoUrl = prompt('Введите url фото');
            const photoDiscription = prompt ('Введите описание фото');
            const newPhoto = new Photo(photoUrl, photoDiscription);
            this.photos.push(newPhoto);
            const img = document.createElement('img');
            img.src = newPhoto.url;
            img.style.width = '300px';
            img.style.position = 'absolute';
            img.style.left = '10px';
            img.style.top = '10px';
            img.classList.add ("photo-in-div") ;
            pageDiv.appendChild(img);
        }
        finishAdding () {                      //убираем кноки добавить фото с пустой страницы
            const buttonAddPhoto = document.getElementById('nullButton');
            const buttonFinishAdding = document.getElementById('finishAddPhotoButton');
            buttonAddPhoto.remove();
            buttonFinishAdding.remove();
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

   let numPage = 1;
    
    function createPage (n) {
        
        const newPage = new Page (numPage,n);
        myAlbum.addPage(newPage);
        newPage.displayPage();
        const pages = document.querySelectorAll('.page-div');
        numPage++;
        const albumLength = myAlbum.pages.length;
        console.log (pages);
        console.log(albumLength);
        const activePage = pages[albumLength-1];
        const numbActivePage = activePage.getAttribute('data-page-number');
        console.log (activePage);
        activePage.classList.add('active');

        for (let i=0; i<pages.length-1; i++) {
            const page = pages[i];
            page.classList.remove('active');
        }
    }
    
    function prevPage () {
         const pageDivs = document.querySelectorAll('.page-div');
         const activePage = Array.from(pageDivs ).find(div => div.classList.contains('active'));
         console.log (activePage);
         const activePageNum = activePage.getAttribute('data-page-number');
         if (activePageNum === "1") {
            return;
         } else {
            activePage.classList.remove('active');
            activePage.classList.add('prev');
         const newActivePage = Array.from(pageDivs).find(div => div.getAttribute('data-page-number') === `${activePageNum-1}`);
         newActivePage.classList.remove('next');
         newActivePage.classList.add('active');
         console.log (newActivePage);
         }

    }
    function nextPage() {
         const pageDivs = document.querySelectorAll('.page-div');
         const activePage = Array.from(pageDivs ).find(div => div.classList.contains('active'));
         console.log (activePage);
         const activePageNum = activePage.getAttribute('data-page-number');
         console.log (activePageNum);
         if (activePageNum == pageDivs.length) {
            return;
         } else {
            activePage.classList.remove('active');
            activePage.classList.add('next');
         const newActivePage = Array.from(pageDivs).find(div => div.getAttribute('data-page-number') === `${parseFloat(activePageNum) + 1 }`);
         console.log (newActivePage);
         newActivePage.classList.remove('prev');
         newActivePage.classList.add('active');
         }
    }

     const allPhotos = document.querySelectorAll('photo-in-div');
     for (let i=0; i<allPhotos.length; i++) {
        const photo = allPhotos[i];
        photo.addEventListener('mousedown', deletePhoto);
     }
    //const redactorField = document.getElementById('redactor-field');
    //redactorField.addEventListener('mousedown', deletePhoto);
    function deletePhoto (eo) {
        eo=eo||window.event;
        //eo.preventDefault();
        const currentImage = eo.target;
        console.log(currentImage);
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