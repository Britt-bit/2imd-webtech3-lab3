class Note {
    constructor(title) {
      this.title = title;
      this.element = this.createElement(title);
    }
    
    createElement(title){
      let newNote = document.createElement('div');
      newNote.setAttribute("class", "card");

      let newP = document.createElement("p");
      newP.innerHTML = title;

      let newA = document.createElement("a");
      newA.setAttribute("class", "card-remove");
      newA.innerHTML = 'Remove';

      newNote.appendChild(newP);
      newNote.appendChild(newA);
      
      // HINT🤩 
      let removeNote = newNote.querySelector(`.card-remove`);
      removeNote.addEventListener(`click`, this.remove.bind(newNote));
      return newNote;
      //a.addEventListener('click', this.remove.bind(newNote));

    }
    
    add(){
      document.querySelector(".notes").appendChild(this.element);
    }
    
    saveToStorage(){
      let myData = JSON.parse(localStorage.getItem(`myData`));
      if(myData == null){
          myData = [];
      }
      myData.push(this.title);
      console.log("1 " + myData);
        
      localStorage.setItem(`myData`, JSON.stringify(myData));
    }
    
    remove(){
      let localData = JSON.parse(localStorage.getItem(`myData`));
      let title = this.querySelector(`p`).innerHTML;
      let ArrayIndex = localData.indexOf(title);
      localData.splice(ArrayIndex, 1);
      localStorage.setItem(`myData`, JSON.stringify(localData));
      this.remove();
      
      //localStorage.removeItem(`myData`, JSON.stringify(myData));
  }
  
}
  class App {
    constructor() {
      console.log("👊🏼 The Constructor!");
        
      // HINT🤩
      // clicking the button should work
      // pressing the enter key should also work
        this.btnAdd = document.querySelector("#btnAddNote");
        this.btnAdd.addEventListener("click", this.createNote.bind(this));
        

        this.loadNotesFromStorage();


        document.querySelector(`#txtAddNote`).addEventListener(`keydown`, enter => {
          if(enter.keyCode === 13) {
            enter.preventDefault();
            console.log(enter);
            document.querySelector(`#btnAddNote`).click();
            return true;
          }
        });



    }
    
    loadNotesFromStorage() {
      let retrieveData = JSON.parse(localStorage.getItem(`myData`));
      console.log("4 " + retrieveData);
        if (retrieveData.length > 0){
            retrieveData.forEach(title => {
                let note = new Note(title);
                note.add();
            });
            }
        }
      
    createNote(e){
      // this function should create a new note by using the Note() class
      
      // HINT🤩
       // alert("click");
       let text = document.querySelector("#txtAddNote").value;
       //console.log(text);

       let note = new Note(text);
        note.add();
        note.saveToStorage();
        this.reset();
    }
    
    reset(){
      // this function should reset the form 
      document.querySelector("#txtAddNote").value = ('');
    }
    
  }
  
  let app = new App();