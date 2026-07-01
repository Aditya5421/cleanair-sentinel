import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export async function saveReport(data) {

  await addDoc(
    collection(db, "reports"),
    {
      ...data,
      status: "active",
      createdAt: new Date()
    }
  );

}