import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

export async function saveReport(data) {
  try {
    await addDoc(collection(db, "reports"), {
      ...data,
      status: "Pending",
      createdAt: serverTimestamp(),
    });

    console.log("Report saved");
  } catch (error) {
    console.error("Save failed:", error);
  }
}