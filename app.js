import { db } from "./firebaseconfig.js";

import { collection, addDoc , getDocs , Timestamp, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";


const form = document.querySelector("#form")
const description = document.querySelector("#description")
const text = document.querySelector("#text")
const div = document.querySelector("#container")
const dataBaseArr = []



form.addEventListener('submit' , async (event)=>{
  event.preventDefault();
  // div.innerHTML = ''
  // console.log(text.value);
  // console.log(description.value);
   
  try {
      const docRef = await addDoc(collection(db, "Todo"), {
        title: text.value,
        description: description.value,
        date: Timestamp.fromDate(new Date()),

      });


      console.log("Document written with ID: ", docRef.id);

    } catch (e) {
      console.error("Error adding document: ", e);
    }

    
    dataBaseArr.map((item) => {
      div.innerHTML += `<div class="box">
        <p><h1>Title</h1>:${item.text}</p>
        <p><h1>Description</h1>:${item.description}</p>
        <button id="editBtn">Edit</button>
        <button id="deleteBtn">Delete</button>
    
       </div>`
       text.innerHTML = ""
       description.innerHTML = ""
    })

})

async function getData(){
  const querySnapshot = await getDocs(collection(db, "Todo"));
  querySnapshot.forEach((doc) => {
    dataBaseArr.push(doc.data())
  });
}

console.log(dataBaseArr);

// dataBaseArr.map((item) => {
//   div.innerHTML += `<div class="box">
//     <p><h1>Title</h1>:${item.text}</p>
//     <p><h1>Description</h1>:${item.description}</p>
//     <button id="editBtn">Edit</button>
//     <button id="deleteBtn">Delete</button>

//    </div>`
// })





getData()
