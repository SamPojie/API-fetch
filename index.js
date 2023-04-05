const express = require('express');
const axios = require('axios');
const sql = require('mysql');
const path = require('path')

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));

const con = sql.createConnection({
  host : "localhost",
  user :'root',
  password : '',
  database : 'apiDB'
}
);

con.connect((err)=>{
  if (err) throw err;
  else{
      console.log("Connected to database Successfully");
  }
})

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers/');
    const data = Object.values(response.data).sort((a,b)=>b.volume-a.volume).slice(0,10);
      res.render('index', {data});
  } catch (error) {
    console.log(error);
    res.send('Error fetching data from API');
  }
});



 
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});