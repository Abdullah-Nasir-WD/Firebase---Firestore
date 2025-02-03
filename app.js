import { db } from "./firebaseconfig.js";

import { collection, addDoc, Timestamp,  getDocs, query, orderBy, doc, deleteDoc, updateDoc} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";


const form = document.querySelector('#form');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const div = document.querySelector('.container');
const dataBaseArr = []


//  get data from database
async function getData() {
  const q = query(collection(db, "todos"), orderBy("date", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, doc.data());
    dataBaseArr.push({ ...doc.data(), id: doc.id });
  });

  console.log(dataBaseArr);
  renderData(dataBaseArr)
}

// renderData

function renderData(arr) {
  div.innerHTML = ""
  arr.map(item => {
    div.innerHTML += `
    <div class="box">
    <p>Title: ${item.title}</p>
    <p>description: ${item.description}.</p>
    <button class="deleteBtn">delete</button>
    <button class="editBtn">edit</button>
    </div>
    `
  })

  const deleteBtn = document.querySelectorAll('.deleteBtn')
  const editBtn = document.querySelectorAll('.editBtn')


  deleteBtn.forEach((item, index) => {
    item.addEventListener('click', async (event) => {
      console.log("btn clicked");
      console.log(dataBaseArr[index]);
      await deleteDoc(doc(db, "todos", dataBaseArr[index].id));
      console.log('todo deleted...');
      dataBaseArr.splice(index, 1)
      renderData(dataBaseArr)
    })
  })
  editBtn.forEach((item, index) => {
    item.addEventListener('click', async (event) => {
      console.log("edit clicked");
      console.log(dataBaseArr[index]);
      const updatedTitle = prompt("enter updated title")

      const todoRef = doc(db, "todos", dataBaseArr[index].id);
      await updateDoc(todoRef, {
        title: updatedTitle
      });
      console.log('todo updated successfully');
      dataBaseArr[index].title = updatedTitle
      renderData(dataBaseArr)
    })
  })
}

getData()


form.addEventListener('submit', async (event) => {
  event.preventDefault()
  console.log(title.value);
  console.log(description.value);


  try {
    const docRef = await addDoc(collection(db, "todos"), {
      title: title.value,
      description: description.value,
      date: Timestamp.fromDate(new Date()),
    });
    console.log("Document written with ID: ", docRef.id);
    dataBaseArr.unshift({
      title: title.value,
      description: description.value,
      date: Timestamp.fromDate(new Date()),
      id: docRef.id
    })

    renderData(dataBaseArr)
  } catch (e) {
    console.error("Error adding document: ", e);
  }


})


// delete and edit