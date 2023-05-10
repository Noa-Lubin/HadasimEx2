const con = require('../sqlConnection')
async function GetPositive(req, res) {
    let connection = await con.openConnect()
    res.status(200).send("succseed")
}
module.exports = { GetPositive }
const functions = {
    AddPositive: (req, res) => {
        try {
            const { positiveCode, clientID, positiveResultDate, recoveryDate } = req.body;
            let sql = `INSERT INTO positive ( positiveCode, clientID, positiveResultDate, recoveryDate)
                        value ('${positiveCode}', '${clientID}',  '${positiveResultDate}' , '${recoveryDate}')`
                        console.log(sql)
            con.query(sql, (err, result) => {
                if (err) {
                    res.status(400).send("We have a problem inserting this data");
                }
                else {
                    res.status(200).send(result);
                }
            })
        } catch (err) {
            res.status(500).send("We have a problem connecting to database");
        }
    },
    GetPositives: (req, res) => {
        try {
            const { positiveCode } = req.query;
            let sql = `SELECT * FROM positive `
            con.query(sql, (err, result) => {
                if (err) {
                    res.status(400).send('wrong data');
                } else {
                    res.status(200).send(result);
                }
            })
        } catch (err) {
            res.status(500).send("We have a problem connecting to database");
        }
    },
    GetPositive: (req, res) => {
        try {
            const { clientID } = req.body;

            let sql = `SELECT * FROM positive where clientID = ${req.params.clientID}`
            console.log(sql);
            con.query(sql, (err, result) => {
                if (err) {
                    res.status(400).send('wrong data')
                } else {
                    res.status(200).send(result)
                }
            })
        } catch (err) {
            res.status(500).send("We have a problem connecting to database")
        }
    },
    GetRecoveriesToday: (req, res) => {
        try {
            const { recoveryDate } = req.body;

            let sql = `SELECT clientID, Date(recoveryDate) AS recoveryDate
            FROM positive
            WHERE Date(recoveryDate) = curdate()`
            console.log(sql);
            con.query(sql, (err, result) => {
                if (err) {
                    res.status(400).send('wrong data')
                } else {
                    res.status(200).send(result)
                }
            })
        } catch (err) {
            res.status(500).send("We have a problem connecting to database")
        }
    }
}
module.exports = functions;