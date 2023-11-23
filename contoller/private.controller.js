const connect = require('../db');
async function autho (req, res) {
    const db = await connect();
    try{
        res.status(201).json({ message: "you reached to privet route" });
    }
    catch (err) {
        res.status(500).json({ message: err });

    }

}
module.exports ={
    autho
}