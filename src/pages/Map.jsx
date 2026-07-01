import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";


export default function Map() {

  const [reports, setReports] = useState([]);
  const [satellite, setSatellite] = useState(false);


  useEffect(() => {

    async function fetchReports() {

      const snapshot = await getDocs(
        collection(db, "reports")
      );


      const data = snapshot.docs
        .map((doc) => doc.data())
        .filter(
          (item) =>
            item.latitude &&
            item.longitude
        );


      setReports(data);

    }


    fetchReports();

  }, []);



  function markerIcon(severity) {

    let color = "green";


    if(Number(severity) >= 70){

      color = "red";

    }
    else if(Number(severity) >= 40){

      color = "yellow";

    }


    return new L.Icon({

      iconUrl:
      `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,

      iconSize:[
        35,
        35
      ]

    });

  }



  return (

<div className="min-h-screen bg-gray-100">

<Navbar />


<div className="max-w-7xl mx-auto p-8">


<h1 className="text-4xl font-bold text-green-700 mb-2">
🗺️ Pollution Hotspot Map
</h1>


<p className="text-gray-600 mb-6">
Real-time pollution reports collected from citizens
</p>



<button

onClick={()=>setSatellite(!satellite)}

className="mb-5 bg-blue-600 text-white px-6 py-3 rounded-xl"

>

{satellite ? "🌍 Normal Map" : "🛰️ Satellite View"}

</button>




<div className="rounded-2xl overflow-hidden shadow-xl bg-white">


<MapContainer

center={[
20.5937,
78.9629
]}

zoom={5}

style={{
height:"600px",
width:"100%"
}}

>


{
satellite ?


<TileLayer

url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"

/>


:

<TileLayer

url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"

/>

}




{
reports.map((report,index)=>(


<Marker

key={index}

position={[
report.latitude,
report.longitude
]}

icon={
markerIcon(report.severity)
}

>


<Popup>


<div className="p-2">


<h2 className="font-bold text-lg">
🚨 {report.pollutionType}
</h2>


<p>
<strong>
Severity:
</strong>{" "}
{report.severity}%
</p>


<p>
<strong>
Health Risk:
</strong>{" "}
{report.healthRisk}
</p>


<p className="mt-2">
{report.recommendation}
</p>


</div>


</Popup>


</Marker>


))

}



</MapContainer>


</div>




<div className="mt-6 bg-white rounded-xl shadow p-5">


<h2 className="font-bold text-xl mb-3">
Pollution Severity Level
</h2>


<div className="flex gap-8">


<p>
🔴 High Risk (70%+)
</p>


<p>
🟡 Medium Risk (40-70%)
</p>


<p>
🟢 Low Risk (&lt;40%)
</p>


</div>


</div>



</div>

</div>


  );

}