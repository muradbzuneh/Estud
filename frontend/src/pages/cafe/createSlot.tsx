import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Card from "../../components/Card";
import api from "../../utils/api";

export default function CreateSlot() {

  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")

  const [formData,setFormData] = useState({
    date:"",
    startTime:"",
    endTime:"",
    capacity:""
  })

  const handleSubmit = async (e:React.FormEvent) => {

    e.preventDefault()
    setLoading(true)

    try{

      await api.post("/cafe/slots",{
        date:formData.date,
        startTime:formData.startTime,
        endTime:formData.endTime,
        capacity:Number(formData.capacity)
      })

      alert("Slot created successfully")

      navigate("/cafe")

    }catch(err:any){

      setError(err.response?.data?.message || "Failed to create slot")

    }finally{

      setLoading(false)

    }

  }

  return(

<div className="container mx-auto p-6 max-w-xl">

<Button onClick={()=>navigate("/cafe")} className="mb-4">
← Back
</Button>

<Card>

<h1 className="text-3xl font-bold mb-6">
Create Time Slot
</h1>

<form onSubmit={handleSubmit} className="space-y-4">

<Input
label="Date"
type="date"
value={formData.date}
onChange={(e)=>setFormData({...formData,date:e.target.value})}
required
/>

<Input
label="Start Time"
type="time"
value={formData.startTime}
onChange={(e)=>setFormData({...formData,startTime:e.target.value})}
required
/>

<Input
label="End Time"
type="time"
value={formData.endTime}
onChange={(e)=>setFormData({...formData,endTime:e.target.value})}
required
/>

<Input
label="Capacity"
type="number"
value={formData.capacity}
onChange={(e)=>setFormData({...formData,capacity:e.target.value})}
required
/>

{error && (
<div className="bg-red-100 text-red-700 p-3 rounded">
{error}
</div>
)}

<Button type="submit" disabled={loading} className="w-full">
{loading ? "Creating..." : "Create Slot"}
</Button>

</form>

</Card>
</div>

  )
}