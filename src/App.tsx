import { Routes, Route } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { app } from "./services/firebase.ts";
import { login } from "./services/auth.ts";
import Login from "./pages/Login.tsx";

function App() {
  const db = getFirestore(app);

  // як оновити дані в адмінці

  // const updateName = async (docId, newName) => {
  //   try {
  //     // Вказуємо документ, який потрібно оновити
  //     const docRef = doc(db, "projects", docId);
  //     // Оновлюємо поле 'name' в об'єкті
  //     await updateDoc(docRef, {
  //       "positive.0.name": newName, // Припускаємо, що ми оновлюємо перший об'єкт масиву 'positive'
  //     });
  //     console.log(`Document ${docId} updated with new name: ${newName}`);
  //   } catch (error) {
  //     console.error("Error updating document:", error);
  //   }
  // };

  // як вивести дані на сайті
  // const [projects, setProjects] = useState({});
  //
  // const fetchData = () => {
  //   const unsubscribe = onSnapshot(
  //     collection(db, "projects"),
  //     (querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         const data = doc.data();
  //
  //         if (data) {
  //           setProjects(data);
  //         }
  //       });
  //     },
  //   );
  //
  //   return () => unsubscribe();
  // };
  //
  // useEffect(() => {
  //   const unsubscribe = fetchData();
  //   return () => unsubscribe();
  // }, []);
  //
  // console.log(projects);

  // як залогінитися, та показати дані, та оновити

  const fetchData = async () => {
    try {
      await login("oleg220298d@gmail.com", "Welcome1!"); // Дочекаємося входу

      const querySnapshot = await getDocs(collection(db, "projects"));

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);

        // Якщо потрібно оновити ім'я
        const docId = doc.id; // ID документа
        const newName = "Updated Name"; // Нове ім'я для оновлення
        // updateName(docId, newName); // Викликаємо функцію оновлення
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
