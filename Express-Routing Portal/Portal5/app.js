const express = require('express')
const app = express();

app.get('/',(req,res)=>{
    res.send("this is home page")
})

function getMonth(monthNumber) {
  const month =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dev"];
  return month[monthNumber-1]
}


app.get("/blog/:year/:month/:slug",(req,res)=>{

    const {year,month,slug}=req.params;
    let mnth = getMonth(Number(month))
   

    res.send(`Viewing blog post: "${slug}"<br>
        <h3>Published: ${mnth}, ${year}</h3>`);
})
app.listen(3000,()=>{
    console.log("Server Started");
})