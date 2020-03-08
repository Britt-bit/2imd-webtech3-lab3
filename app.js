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
      // HINT🤩
      // this function should append the note to the screen somehow
      document.querySelector(".notes").appendChild(this.element);
    }
    
    saveToStorage(){
      // HINT🤩
      // localStorage only supports strings, not arrays
      // if you want to store arrays, look at JSON.parse and JSON.stringify
   
      let myData = JSON.parse(localStorage.getItem(`myData`));
      if(myData == null){
          myData = [];
      }
      myData.push(this.title);
      console.log("1 " + myData);
        
      localStorage.setItem(`myData`, JSON.stringify(myData));

      console.log("2 " + myData);
    }
    
    remove(){
      // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
      // in this function, 'this' will refer to the current note element
      let removeLink = this;
      console.log(removeLink);
      removeLink.addEventListener(`click`, e => {
        e.preventDefault();
      });
      let localData = JSON.parse(localStorage.getItem(`myData`));
      let title = this.querySelector(`p`).innerHTML;
      let ArrayIndex = localData.indexOf(title);
      localData.splice(ArrayIndex, 1);
      localStorage.setItem(`myData`, JSON.stringify(localData));
      removeLink.remove();
      
      


/*      let thisFuck = JSON.parse(window.localStorage.getItem(`myData`));
      let title = this.querySelector(`p`).innerHTML;
      console.log("mydata " + thisFuck);
      console.log("title " + title);

      if(title != null){
        //let spliced = myData.splice(this.title, myData);
        //console.log("spliced " + spliced);

        JSON.parse(window.localStorage.removeItem(myData));
        this.remove();
        console.log(this);
      }
*/
      
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

    }
    
    loadNotesFromStorage() {
      // HINT🤩
      // load all notes from storage here and add them to the screen
      // something like note.add() in a loop would be nice
      
      let retrieveData = JSON.parse(window.localStorage.getItem(`myData`));
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
        //this.reset();
    }
    
    reset(){
      // this function should reset the form 
    }
    
  }
  
  let app = new App();