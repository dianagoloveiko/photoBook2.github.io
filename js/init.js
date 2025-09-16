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
    
    let nameAlbum, myAlbum;
    let photoNumber=1;
    let photoDivNum = 1;
    let numPage = 1;

    function createBook() {    
        homePage.style.display = 'none';
        mainPage.style.display = 'flex';
         nameAlbum = prompt('Введите название альбома'); 
         myAlbum = new Album(nameAlbum);
       }

    function loadBook() {
        const nameForLoading = prompt('Введите название фотокниги для продолжения редактирования');
        let sp = new URLSearchParams();
        sp.append('f', 'READ');
        sp.append('n', `GOLOVEIKO_PHOTOALBUM_ALBUM_${nameForLoading}`);
        fetch(ajaxHandlerScript, { method: 'post', body: sp })
         .then( response => response.json() )
         .then( data => { 
            console.log(data); 
            homePage.style.display = 'none';
            mainPage.style.display = 'flex';
            console.log(data.result);
            const myAlbumData = JSON.parse(data.result);
             myAlbum =  Album.fromJSON(myAlbumData);
            console.log (myAlbum);
            numPage = myAlbum.pages.length+1;
            for (let i=0; i <myAlbum.pages.length; i++) {
                let page = myAlbum.pages[i];
                if (page.numPhotos == 0) {
                    //debugger; 
                    page.displayPage();
                    for (let i=0; i < page.photos.length; i++) {
                        const photo = page.photos[i];
                        const photoDiv = document.createElement('div');
                        photoDiv.classList.add('photo-div');
                        photoDiv.style.position = 'absolute';
                        photoDiv.style.left = '10%';
                        photoDiv.style.top = '10%';
                        photoDiv.style.width = '30%';
                        photoDiv.dataset.photoDivNum = photo.photoDivNum;
                        photoDivNum++;
                        const pageDivs = document.querySelectorAll('.page-div');
                        const pageDiv = Array.from(pageDivs).find(div => div.getAttribute('data-page-number') == page.pageNumber);
                        pageDiv.appendChild(photoDiv);
                        const img = document.createElement('img');
                        img.src = photo.url;
                        img.style.width = '100%';
                        img.classList.add ("photo-in-div");
                        photoDiv.appendChild(img);
                        const buttonDelete = document.createElement('button');
                        buttonDelete.classList.add('buttonDeletePhoto');
                        buttonDelete.textContent = 'удалить фото';
                        photoDiv.appendChild(buttonDelete);
                        buttonDelete.addEventListener('click', deletePhoto)
                        photoDiv.addEventListener ('mousedown', onMouseDown, false);  //подписываем картинку на mousedown, чтобы можно было ее таскать
                         for (let i=1; i<=4; i++) {                          //создаем управляющие элементы
                        const sizeElem = document.createElement('div');
                        sizeElem.classList.add('elemResize');
                        photoDiv.appendChild(sizeElem);
                        sizeElem.addEventListener ('mousedown', onMouseDown, false);
                        console.log (photoDiv.offsetWidth);
                            console.log (sizeElem.offsetWidth);
                        switch (i) {
                            case 1: 
                                sizeElem.dataset.size = 'tl';
                                sizeElem.style.left = '0';
                                sizeElem.style.top = '0';
                            break;
                            case 2:
                                sizeElem.dataset.size = 'tr';
                                sizeElem.style.right = '0';
                                sizeElem.style.top = '0';
                                break;
                            case 3:
                                sizeElem.dataset.size = 'br';
                                sizeElem.style.right = '0';
                                    sizeElem.style.bottom = '0';
                                break;
                            case 4:
                                sizeElem.dataset.size = 'bl';
                                sizeElem.style.left = '0';
                                sizeElem.style.bottom = '0';
                                break;
                            }       
                            }
                            }
                        }   else {
                     page.displayPage();
                    for (let i=0; i < page.photos.length; i++) {
                    //debugger;
                    const photo = page.photos[i];
                    photo.displayPhoto();
                }
                }
                if (i === myAlbum.pages.length-1) {
                    const activePageNum = page.pageNumber;
                    const pageDivs = document.querySelectorAll('.page-div');
                    const newActivePage = Array.from(pageDivs).find(div => div.getAttribute('data-page-number') === `${activePageNum}`);
                    newActivePage.classList.add('active');
                }
                
            }
        } )
         .catch( error => { console.error(error); } );
    }
        
    
   

    document.addEventListener ('mouseup', onMouseUp, false);  

     
  
   class Photo {
    constructor(photoNumber,url,description,posX,posY, photoDivNum) {
        this.url = url;
        this.description = description;
        this.photoNumber = photoNumber;
        this.posX = posX;
        this.posY = posY;
        this.photoDivNum = photoDivNum;
    }
      displayPhoto () {
        const photoDivs = document.querySelectorAll('.photo-div');
        const photoDiv = Array.from(photoDivs).find(div => div.dataset.photoDivNum == this.photoDivNum );
        const img = document.createElement('img');
            img.src = this.url;
            img.style.width = '100%';
            img.classList.add ("photo-in-div");
            img.dataset.photoNumber = photoNumber;
            
             photoNumber++;
            photoDiv.appendChild(img);
            const buttonDelete = document.createElement('button');
            buttonDelete.classList.add('buttonDeletePhoto');
            buttonDelete.textContent = 'удалить фото';
            photoDiv.appendChild(buttonDelete);
            buttonDelete.addEventListener('click', deletePhoto)
        const buttons = document.querySelectorAll('.buttonAddPhoto');
        console.log (buttons);
        const clickedButton = Array.from(buttons).filter(button => photoDiv.contains(button));
        console.log (clickedButton);
        clickedButton[0].style.display = 'none';  

            
      }
      static fromJSON (data) {
        return new Photo(data.photoNumber, data.url, data.description,data.posX, data.posY, data.photoDivNum);
      } 
   }
    class Page {
        constructor(pageNumber,numPhotos, photos =[]) {
            this.photos = photos;
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
                photoDiv.dataset.photoDivNum = photoDivNum;
                photoDivNum++;
                const buttonAddPhoto = document.createElement('button');
                buttonAddPhoto.classList.add('buttonAddPhoto');
                buttonAddPhoto.textContent = 'Добавить фото';
                buttonAddPhoto.id = 'oneButton';
                photoDiv.appendChild(buttonAddPhoto);
               photoDiv.addEventListener ('mousedown', onMouseDown, false);  //подписываем картинку на mousedown, чтобы можно было ее таскать
                buttonAddPhoto.addEventListener('click', () => this.createPhoto());
                photoDiv.classList.add('one-photo');
                pageDiv.appendChild(photoDiv);
            }
            if (this.numPhotos === 2) {
                for (let i=1; i<3; i++) {
                    const photoDiv=document.createElement('div');
                    photoDiv.classList.add ('photo-div');
                    if (i==1) {
                        photoDiv.style.left = '10%';
                    }
                    if (i==2) {
                        photoDiv.style.left = '55%';
                    }
                    photoDiv.classList.add('two-photo');
                    photoDiv.id = `twoPhoto${i}`;
                    photoDiv.dataset.photoDivNum = photoDivNum;
                    photoDivNum++;
                    const buttonAddPhoto = document.createElement('button');
                    buttonAddPhoto.classList.add('buttonAddPhoto');
                    buttonAddPhoto.textContent = 'Добавить фото';
                    buttonAddPhoto.id = `twoButton${i}`;
                    photoDiv.appendChild(buttonAddPhoto);
                    photoDiv.addEventListener ('mousedown', onMouseDown, false);  //подписываем картинку на mousedown, чтобы можно было ее таскать
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
                    photoDiv.dataset.photoDivNum = photoDivNum;
                    photoDivNum++;
                   if (i==1) {
                        photoDiv.style.left = '10%';
                    }
                    if (i==2) {
                        photoDiv.style.left = '38%';
                    }
                    if (i==3) {
                        photoDiv.style.left = '65%';
                    }
                    const buttonAddPhoto = document.createElement('button');
                    buttonAddPhoto.classList.add('buttonAddPhoto');
                    buttonAddPhoto.textContent = 'Добавить фото';
                    buttonAddPhoto.id = `threeButton${i}`;
                    photoDiv.appendChild(buttonAddPhoto);
                    photoDiv.addEventListener ('mousedown', onMouseDown, false);  //подписываем картинку на mousedown, чтобы можно было ее таскать
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
                    photoDiv.dataset.photoDivNum = photoDivNum;
                    photoDivNum++;
                    if (i==1) {
                        photoDiv.style.left = '10%';
                        photoDiv.style.top = '10%';
                    }
                    if (i==2) {
                        photoDiv.style.left = '55%';
                        photoDiv.style.top = '10%';
                    }
                    if (i==3) {
                        photoDiv.style.left = '10%';
                        photoDiv.style.top = '50%';
                    }
                    if (i==4) {
                        photoDiv.style.left = '55%';
                        photoDiv.style.top = '50%';
                    }
                    const buttonAddPhoto = document.createElement('button');
                    buttonAddPhoto.classList.add('buttonAddPhoto');
                    buttonAddPhoto.textContent = 'Добавить фото';
                    buttonAddPhoto.id = `fourButton${i}`;
                    photoDiv.appendChild(buttonAddPhoto);
                    photoDiv.addEventListener ('mousedown', onMouseDown, false);  //подписываем картинку на mousedown, чтобы можно было ее таскать
                    buttonAddPhoto.addEventListener('click', () => this.createPhoto());
                    pageDiv.appendChild(photoDiv);
                }
            }
            if (this.numPhotos === 0) {
                    const buttonAddPhoto = document.createElement('button');
                    buttonAddPhoto.classList.add('buttonAddPhoto');
                    buttonAddPhoto.textContent = 'Добавить фото';
                    buttonAddPhoto.id = `nullButton`;
                    buttonAddPhoto.dataset.index = this.pageNumber;
                    const buttonFinishAdding = document.createElement('button');
                    buttonFinishAdding.textContent = 'Закончить добавление фото';
                    buttonFinishAdding.classList.add('buttonFinishAdding');
                    buttonFinishAdding.id = `finishAddPhotoButton`;
                    pageDiv.appendChild(buttonFinishAdding);
                    pageDiv.classList.add('emptyPage');
                    pageDiv.appendChild(buttonAddPhoto);
                    buttonAddPhoto.addEventListener('click', () => this.addPhotoDiv());
                    buttonFinishAdding.addEventListener('click', () => this.finishAdding());

            }

        }
        createPhoto (eo) {                                   //добавляем фото в див-контейнер
           const clickedButton = event.target;
           console.log (clickedButton);
            const photoUrl = prompt('Введите url фото');
            const photoDiscription = prompt ('Введите описание фото');
           const photoDivClicked = clickedButton.parentNode;
           const posX = photoDivClicked.offsetLeft;
           const posY = photoDivClicked.offsetTop;
           const clickedPhotoDivNum = photoDivClicked.getAttribute('data-photo-div-num');
            
           const newPhoto = new Photo(photoNumber,photoUrl, photoDiscription,posX, posY, clickedPhotoDivNum);
           
                this.photos.push(newPhoto);
          
            newPhoto.displayPhoto();
            clickedButton.dataset.photoDivNum = clickedPhotoDivNum;
            //clickedButton.style.display = 'none';  
          
        } 
         addPhotoDiv (eo) {   
            const clickedButton = event.target;                       //создаем контейнер и фотографию в нем
            const pageDiv = clickedButton.parentNode;
            const photoUrl = prompt('Введите url фото');
            const photoDiscription = prompt ('Введите описание фото');
            const photoDiv = document.createElement('div');
            photoDiv.classList.add('photo-div');
            photoDiv.style.position = 'absolute';
            photoDiv.style.left = '10%';
            photoDiv.style.top = '10%';
            photoDiv.style.width = '30%';
            const posX = photoDiv.offsetLeft;
            const posY = photoDiv.offsetTop;
            photoDiv.dataset.photoDivNum = photoDivNum;
            pageDiv.appendChild(photoDiv);
            const newPhoto = new Photo(photoNumber,photoUrl, photoDiscription, posX, posY, photoDivNum);
            this.photos.push(newPhoto);
            photoDivNum++;
            photoDiv.addEventListener ('mousedown', onMouseDown, false);  //подписываем картинку на mousedown, чтобы можно было ее таскать
            newPhoto.displayPhoto();

            for (let i=1; i<=4; i++) {                          //создаем управляющие элементы
                const sizeElem = document.createElement('div');
                sizeElem.classList.add('elemResize');
                photoDiv.appendChild(sizeElem);
                sizeElem.addEventListener ('mousedown', onMouseDown, false);
                console.log (photoDiv.offsetWidth);
                    console.log (sizeElem.offsetWidth);
                switch (i) {
                    case 1: 
                        sizeElem.dataset.size = 'tl';
                        sizeElem.style.left = '0';
                        sizeElem.style.top = '0';
                    break;
                    case 2:
                        sizeElem.dataset.size = 'tr';
                        sizeElem.style.right = '0';
                        sizeElem.style.top = '0';
                        break;
                    case 3:
                        sizeElem.dataset.size = 'br';
                        sizeElem.style.right = '0';
                        sizeElem.style.bottom = '0';
                        break;
                    case 4:
                        sizeElem.dataset.size = 'bl';
                        sizeElem.style.left = '0';
                        sizeElem.style.bottom = '0';
                        break;
                }
            }

        }
        finishAdding () {                      //убираем кноки добавить фото с пустой страницы
            const buttonAddPhoto = document.getElementById('nullButton');
            const buttonFinishAdding = document.getElementById('finishAddPhotoButton');
            buttonAddPhoto.remove();
            buttonFinishAdding.remove();
        }
        static fromJSON (data) {
            const photos = data.photos.map(photoData => Photo.fromJSON(photoData));
            return new Page (data.pageNumber,data.numPhotos, photos);
        }
    }
       
        
  
    class Album {
        constructor(title, pages = []) {
            this.title = title; 
            this.pages = pages;
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
        static fromJSON (data) {
            const pages = data.pages.map (pageData => Page.fromJSON(pageData));
            return new Album (data.title, pages);
        }
        renderAlbum () {
            const redactorField = document.getElementById('redactor-field');
            for (let i=0; i <this.pages.length; i++) {
                const page = this.pages[i];
                page.displayPage();
            }
        }
    }
   
    
    
   
    
    function createPage (n) {
        
        const newPage = new Page (numPage,n);
        myAlbum.addPage(newPage);
        newPage.displayPage();
        const pages = document.querySelectorAll('.page-div');
        numPage++;
        const albumLength = myAlbum.pages.length;
        const activePage = pages[albumLength-1];
        const numbActivePage = activePage.getAttribute('data-page-number');
        activePage.classList.add('active');

        for (let i=0; i<pages.length-1; i++) {
            const page = pages[i];
            page.classList.remove('active');
        }
    }
    
    function prevPage () {
         const pageDivs = document.querySelectorAll('.page-div');
         const activePage = Array.from(pageDivs ).find(div => div.classList.contains('active'));
         const activePageNum = activePage.getAttribute('data-page-number');
         if (activePageNum === "1") {
            return;
         } else {
            activePage.classList.remove('active');
            activePage.classList.add('prev');
         const newActivePage = Array.from(pageDivs).find(div => div.getAttribute('data-page-number') === `${activePageNum-1}`);
         newActivePage.classList.remove('next');
         newActivePage.classList.add('active');
         }

    }
    function nextPage() {
         const pageDivs = document.querySelectorAll('.page-div');
         const activePage = Array.from(pageDivs ).find(div => div.classList.contains('active'));
         const activePageNum = activePage.getAttribute('data-page-number');
         if (activePageNum == pageDivs.length) {
            return;
         } else {
            activePage.classList.remove('active');
            activePage.classList.add('next');
         const newActivePage = Array.from(pageDivs).find(div => div.getAttribute('data-page-number') === `${parseFloat(activePageNum) + 1 }`);
         newActivePage.classList.remove('prev');
         newActivePage.classList.add('active');
         }
    }

    
    function deletePhoto (eo) {                  // удаляем фото с экрана и возвращаем кнопку добавить фото
         const clickedButton = eo.target;
         const clickedDiv = clickedButton.parentNode;
         const childrenElems = clickedDiv.childNodes;
         let clickedImg;
         for (let i = 0; i < childrenElems.length; i++) {
            const element = childrenElems[i];
            if (element.tagName === 'IMG') {
             clickedImg = element;
                break; 
              }
        }
        const numberOfClickedImg = clickedImg.getAttribute('data-photo-number');
        clickedDiv.removeChild(clickedImg);
        clickedDiv.removeChild(clickedButton);
        const buttonAddPhoto = clickedDiv.childNodes[0];
        if (buttonAddPhoto) {
            buttonAddPhoto.style.display= 'block';
        }
        
        
        const activePage = document.querySelector('.page-div.active');
        const numActivePage = activePage.getAttribute('data-page-number');
        for (let i=0; i< myAlbum.pages.length; i++) {                         //удаляем объект photo из массива в объекте page
            const page = myAlbum.pages[i];
            if (page.pageNumber == numActivePage) {
                console.log ('нужная страница найдена');
                console.log (page.photos);
                for (let i=0; i<page.photos.length; i++) {
                    const photo = page.photos[i];
                    if (photo.photoNumber == numberOfClickedImg) {
                        page.photos.splice(i,1);
                        console.log(page);
                    }
                }
            }
        }
         console.log(myAlbum);
         // console.log(nameAlbum);
    }
    let draggedElem = null;
    let startX, startY, startWidth, startHeight, startContainerX, startContainerY, imgX, imgY, startPageX, startPageY, startLeftBottomX, startLeftBottomY;

    function onMouseDown(eo) {
        eo=eo||window.event;
        eo.preventDefault();
        draggedElem = eo.target;
        const container = draggedElem.parentNode;
        const page = container.parentNode;
 
        startX = eo.clientX ;     //запоминаем координаты клика
        startY = eo.clientY ;
        imgX = eo.clientX - container.offsetLeft;
        imgY = eo.clientY - container.offsetTop;
        startWidth = container.offsetWidth;        //запоминаем начальные размеры
        startHeight = container.offsetHeight;
        startRightBottomX = startX-imgX+startWidth;  //запоминаем координаты правой нижней точки 
        startRightBottomY = startY-imgY + startHeight;
        startLeftBottomX = startX-imgX+startWidth;  //запоминаем координаты левой нижней точки 
        startLeftBottomY = startY-imgY + startHeight;
        startContainerX = container.offsetLeft;
        startContainerY = container.offsetTop; 
        startPageX = page.offsetLeft;
        startPageY = page.offsetTop;
            document.addEventListener ('mousemove', onMouseMove, false);   
        
    }
     function onMouseMove (eo) {
        
         eo=eo||window.event;
                eo.preventDefault(); 
               
            if (draggedElem.tagName === 'IMG')  {
                const container = draggedElem.parentNode;
                const page = container.parentNode;
               
              container.style.left=(eo.clientX - imgX) +"px";   //перемещаем координаты клика по курсору
              container.style.top=(eo.clientY- imgY) +"px";

              if (container.offsetLeft < 0) {
                container.style.left = '0px';
              }
              if (container.offsetTop < 0) {
                container.style.top = '0px';
              }
              if (container.offsetLeft + container.offsetWidth > page.offsetWidth) {
                container.style.left = page.offsetWidth - container.offsetWidth + 'px';
              }
              if (container.offsetTop + container.offsetHeight > page.offsetHeight) {
                container.style.top = page.offsetHeight - container.offsetHeight + 'px';
              }
              
            }
            if (draggedElem.className === 'elemResize') {
                eo.preventDefault();
                const newX = eo.clientX - startX;   //насколько переместилось
                const newY = eo.clientY - startY;
                const container = draggedElem.parentNode;
                const page = container.parentNode;
                switch (draggedElem.getAttribute('data-size')) {
                    case 'tr' :
                        container.style.height = startHeight - newY +'px';
                        container.style.width = startWidth * container.offsetHeight/startHeight + 'px';
                        container.style.top = startContainerY + newY + 'px';
                        container.style.bottom = startLeftBottomY + 'px';
                        break;
                    case 'br' :
                        container.style.height = startHeight + newY +'px';
                        container.style.width = startWidth * container.offsetHeight/startHeight + 'px';
                        break;
                    case 'bl' :
                        container.style.width = startWidth - newX +'px';
                        container.style.height = startHeight * container.offsetWidth/startWidth + 'px';
                        container.style.left = startContainerX + newX + 'px';
                        break;
                    case 'tl' :
                       container.style.width =  startWidth - newX +'px';
                       container.style.height = startHeight * container.offsetWidth/startWidth + 'px';
                       container.style.left  = startRightBottomX-container.offsetWidth +'px';
                       container.style.top = startRightBottomY-container.offsetHeight +'px';
                 
                        break;
                }
            }
                
     }
     function onMouseUp (eo) {
        eo=eo||window.event;
            eo.preventDefault();
            if (draggedElem) {
                draggedElem = null; 
            } 
           
            document.removeEventListener ('mousemove', onMouseMove, false);
     }
      const ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";  

    function saveToAjax () {
        const nameForSaving = prompt('Введите имя литанскими буквами для сохранения');
        const myAlbumData = JSON.stringify(myAlbum);
        let sp = new URLSearchParams();
        sp.append('f', 'INSERT');
        sp.append('n', `GOLOVEIKO_PHOTOALBUM_ALBUM_${nameForSaving}`);
        sp.append('v', myAlbumData);
        fetch(ajaxHandlerScript, { method: 'post', body: sp })
         .then(alert('Ваш альбом успешно сохранен'))
         .catch( error => { console.error(error); } );
    }

    

   

     /*function saveToAjax () {
        const nameForSaving = prompt('Введите имя литанскими буквами для сохранения');
        const myAlbumData = JSON.stringify(myAlbum);
        console.log(myAlbumData);
        $.ajax(
            {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'INSERT', n : `GOLOVEIKO_PHOTOALBUM_ALBUM_${nameForSaving}`, v: myAlbumData },
                success : successSaving, error : errorHandler
            }
        );
     }
     function successSaving() {
        alert('Ваш альбом успешно сохранен');
     }

     function loadBook() {
        const nameForLoading = prompt('Введите название фотокниги для продолжения редактирования');

        $.ajax(
            {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'READ', n : `GOLOVEIKO_PHOTOALBUM_ALBUM_${nameForLoading}` },
                success : readSavedAlbum, error : errorHandler
            }
        );
     }
    function readSavedAlbum (callresult) {
        if ( callresult.error!=undefined )
            alert(callresult.error);
        else if ( callresult.result!="" ) {
            homePage.style.display = 'none';
            mainPage.style.display = 'flex';
            const myAlbumData = JSON.parse(callresult.result);
            console.log (myAlbumData);
            const myAlbum =  Album.fromJSON(myAlbumData);
            console.log (myAlbum);
            myAlbum.renderAlbum();
        }
    }

     function errorHandler(jqXHR,statusStr,errorStr) {
            alert(statusStr+' '+errorStr);
    }
     */