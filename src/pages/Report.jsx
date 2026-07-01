import { useState } from "react";
import Navbar from "../components/Navbar";
import { analyzePollution } from "../services/gemini";
import { saveReport } from "../services/saveReport";

export default function Report() {

  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);


  function getLocation() {

    navigator.geolocation.getCurrentPosition(

      (position)=>{

        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });

      },

      ()=>{
        alert("Location permission denied");
      }

    );

  }



  async function handleAnalyze(){

    if(!description.trim() || !image){

      alert("Please add description and image");
      return;

    }


    setLoading(true);
    setResult(null);


    const aiResult = await analyzePollution(
      description,
      image
    );


    setResult(aiResult);



    await saveReport({

      description,

      pollutionType: aiResult.pollutionType,

      severity: aiResult.severity,

      healthRisk: aiResult.healthRisk,

      recommendation: aiResult.recommendation,

      latitude: location?.latitude || null,

      longitude: location?.longitude || null

    });


    setLoading(false);

  }




  return (

<div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">

<Navbar />


<div className="max-w-5xl mx-auto p-8">


<div className="bg-white rounded-3xl shadow-xl p-8">


<h1 className="text-4xl font-extrabold text-green-700">
📷 Report Pollution
</h1>


<p className="text-gray-600 mt-2 mb-8">
Upload pollution images and let AI analyze environmental risks.
</p>



<div className="border-2 border-dashed border-green-300 rounded-2xl p-6 text-center">


<input

type="file"

accept="image/*"

className="w-full"

onChange={(e)=>setImage(e.target.files[0])}

/>



{
image &&

<img

src={URL.createObjectURL(image)}

alt="preview"

className="mt-6 mx-auto w-72 h-72 object-cover rounded-2xl shadow"

/>

}



</div>




<button

onClick={getLocation}

className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"

>

📍 Capture Location

</button>



{
location &&

<div className="mt-5 bg-blue-50 border rounded-xl p-4">

<h3 className="font-bold text-blue-700">
Location Captured ✅
</h3>

<p>
Latitude: {location.latitude}
</p>

<p>
Longitude: {location.longitude}
</p>

</div>

}




<textarea

rows="5"

className="w-full mt-6 border rounded-xl p-4"

placeholder="Describe pollution problem..."

value={description}

onChange={(e)=>setDescription(e.target.value)}

/>





<button

onClick={handleAnalyze}

disabled={loading}

className="mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-xl font-bold text-lg"

>

{
loading
?
"🤖 AI Analyzing..."
:
"🤖 Analyze With AI"
}


</button>




{
result &&

<div className="mt-10 bg-green-50 border border-green-200 rounded-2xl p-6">


<h2 className="text-3xl font-bold text-green-700 mb-5">
🤖 AI Analysis Result
</h2>



<div className="space-y-3 text-lg">


<p>
<strong>Pollution Type:</strong>{" "}
{result.pollutionType}
</p>



<p>
<strong>Health Risk:</strong>{" "}
{result.healthRisk}
</p>



<div>

<strong>
Severity:
</strong>

<div className="w-full bg-gray-200 rounded-full h-4 mt-2">


<div

className="bg-red-500 h-4 rounded-full"

style={{
width:`${result.severity}%`
}}

/>


</div>


<p className="mt-1 font-bold">
{result.severity}%
</p>

</div>




<p>
<strong>Recommendation:</strong>{" "}
{result.recommendation}
</p>



</div>


</div>

}


</div>


</div>


</div>

  );

}