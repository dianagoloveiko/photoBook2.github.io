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
        displayPage () {
            const redactorField = document.getElementById('redactor-field');
            const pageDiv = document.createElement('div');
            redactorField.appendChild(pageDiv);
            pageDiv.classList.add('page-div');
            if (this.numPhotos === 1) {
                const photoDiv=document.createElement('div');
                photoDiv.classList.add ('photo-div');
                const buttonAddPhoto = document.createElement('button');
                buttonAddPhoto.classList.add('buttonAddPhoto');
                buttonAddPhoto.textContent = 'Добавить фото';
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
                    photoDiv.appendChild(buttonAddPhoto);
                    buttonAddPhoto.addEventListener('click', () => this.createPhoto());
                    pageDiv.appendChild(photoDiv);
                }
            }


        }
        createPhoto () {
            const photoUrl = prompt('Введите url фото');
            const photoDiscription = prompt ('Введите описание фото');
            if (photoUrl) {
                const newPhoto = new Photo(photoUrl, photoDiscription);
                this.photos.push(newPhoto);
                if (this.photos.length === 1) {
                    this.displayPhoto(newPhoto);
                }
                if (this.photos.length === 2) {
                    this.displayPhoto2(newPhoto);
                }
                if (this.photos.length === 3) {
                    this.displayPhoto3(newPhoto);
                }
                
            }
        }
        displayPhoto (photo) {
            const photoDiv = document.querySelectorAll('.photo-div');
            const photoDiv1= photoDiv[0];
            const buttonsAddPhoto = document.querySelectorAll('.buttonAddPhoto');
            const buttonAddPhoto=buttonsAddPhoto[0];
            const img = document.createElement('img');
            img.src = photo.url;
            img.style.width = '100%';
            photoDiv1.appendChild(img);
            photoDiv1.removeChild(buttonAddPhoto);
        }
        displayPhoto2 (photo) {
            console.log (this.photos);
            const photoDiv = document.querySelectorAll('.photo-div');
            const photoDiv2= photoDiv[1];
            console.log (photoDiv2);
            const buttonsAddPhoto = document.querySelectorAll('.buttonAddPhoto');
            const buttonAddPhoto2 = buttonsAddPhoto[0];
            const img = document.createElement('img');
            img.src = photo.url;
            img.style.width = '100%';
            photoDiv2.appendChild(img);
           photoDiv2.removeChild(buttonAddPhoto2 );
        }
        displayPhoto3 (photo) {
            const photoDiv = document.querySelectorAll('.photo-div');
            const photoDiv3= photoDiv[2];
            const buttonsAddPhoto = document.querySelectorAll('.buttonAddPhoto');
            const buttonAddPhoto3 = buttonsAddPhoto[0];
            const img = document.createElement('img');
            img.src = photo.url;
            img.style.width = '100%';
            photoDiv3.appendChild(img);
            photoDiv3.removeChild(buttonAddPhoto3);
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
    /*const page1 = new Page(1,2);
        page1.displayPage();*/
   let numPage = 1;
    
    function createPage (n) {
        const newPage = new Page (numPage,n);
        myAlbum.addPage(newPage);
        newPage.displayPage();
        numPage++;
    }
    
    
   /* function drawPage (page) {                       //функция рисования страницы в зависимости от количества фото на ней
        const redactorField = document.getElementById('redactor-field');
        const pageDiv = document.createElement('div');
        redactorField.appendChild(pageDiv);
        pageDiv.classList.add('page-div');
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
    
 
    
    drawPage(page4);
    drawPage(page3);
    drawPage(page1);*/
    
   
   /* let currentIndex=0;
   
    function setActivePage (index) {
         const pageDivs = document.querySelectorAll('.page-div');
         if (pageDivs.length === 0) {
            return;
         } else {
            for (let i=0; i<pageDivs.length; i++) {
           
            pageDivs[i].classList.remove('active');
             pageDivs[i].style.transform = `translateX(${(i-index)*100}%)`;
        }
        pageDivs[index].classList.add('active');
        pageDivs[index].style.transform = 'translateX(0)';
         }
        
    }
    
    function prevPage () {
         const pageDivs = document.querySelectorAll('.page-div');
        if (currentIndex === 0) {
            return;
        } else {
            currentIndex = (currentIndex-1+pageDivs.length)%pageDivs.length;
        console.log(currentIndex);
        
        setActivePage (currentIndex);
        }
        
    }
    function nextPage() {
         const pageDivs = document.querySelectorAll('.page-div');
        if (currentIndex === pageDivs.length - 1) {
            return;
        } else {
            currentIndex = (currentIndex+1)%pageDivs.length;
        setActivePage (currentIndex);
        }
        
    }
    setActivePage(currentIndex);

    //drawPage(page2);
   
   

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