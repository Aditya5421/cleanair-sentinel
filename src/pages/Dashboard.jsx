import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";
import { db } from "../config/firebase";


export default function Dashboard() {

  const [reports,setReports] = useState([]);


  async function loadReports(){

    const snapshot = await getDocs(
      collection(db,"reports")
    );

    const data = snapshot.docs.map(
      (item)=>({
        id:item.id,
        ...item.data()
      })
    );

    setReports(data);

  }



  useEffect(()=>{

    loadReports();

  },[]);



  async function markResolved(id){

    await updateDoc(
      doc(db,"reports",id),
      {
        status:"resolved"
      }
    );


    loadReports();

  }



  const activeReports =
    reports.filter(
      (r)=>r.status !== "resolved"
    );


  const resolvedReports =
    reports.filter(
      (r)=>r.status === "resolved"
    );



  const highRisk =
    activeReports.filter(
      (r)=>Number(r.severity)>=70
    ).length;


  const mediumRisk =
    activeReports.filter(
      (r)=>
      Number(r.severity)>=40 &&
      Number(r.severity)<70
    ).length;


  const lowRisk =
    activeReports.filter(
      (r)=>Number(r.severity)<40
    ).length;



return (

<div className="min-h-screen bg-gray-50">

<Navbar/>


<div className="max-w-6xl mx-auto p-8">


<h1 className="text-4xl font-bold text-green-700">
📊 Pollution Dashboard
</h1>


<p className="text-gray-600 mt-2 mb-8">
Track active and resolved pollution complaints
</p>




<div className="grid md:grid-cols-5 gap-5">


<div className="bg-white p-5 rounded-xl shadow">
<h2 className="font-bold">
Total Reports
</h2>
<p className="text-3xl font-bold text-green-700">
{reports.length}
</p>
</div>



<div className="bg-white p-5 rounded-xl shadow">
<h2 className="font-bold">
🔴 High Risk
</h2>
<p className="text-3xl font-bold text-red-600">
{highRisk}
</p>
</div>



<div className="bg-white p-5 rounded-xl shadow">
<h2 className="font-bold">
🟡 Medium Risk
</h2>
<p className="text-3xl font-bold text-yellow-500">
{mediumRisk}
</p>
</div>



<div className="bg-white p-5 rounded-xl shadow">
<h2 className="font-bold">
🟢 Low Risk
</h2>
<p className="text-3xl font-bold text-green-600">
{lowRisk}
</p>
</div>



<div className="bg-white p-5 rounded-xl shadow">
<h2 className="font-bold">
✅ Resolved
</h2>
<p className="text-3xl font-bold text-blue-600">
{resolvedReports.length}
</p>
</div>



</div>





<div className="mt-10 bg-white rounded-xl shadow p-6">


<h2 className="text-2xl font-bold mb-5">
Active Reports
</h2>



{
activeReports.map((report)=>(


<div
key={report.id}
className="border rounded-xl p-5 mb-4"
>


<h3 className="text-xl font-bold">
🚨 {report.pollutionType}
</h3>


<p>
<b>Severity:</b> {report.severity}%
</p>


<p>
<b>Health Risk:</b> {report.healthRisk}
</p>


<p>
<b>Recommendation:</b> {report.recommendation}
</p>



<button

onClick={()=>markResolved(report.id)}

className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg font-bold"

>

Mark as Resolved

</button>



</div>


))

}



</div>





</div>

</div>

);


}