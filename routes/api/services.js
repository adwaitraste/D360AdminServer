const express = require('express');
const router = express.Router();
const db = require('../../database');

router.get("/getChannels/", (req, res) =>{    
    db.all(
        "SELECT * FROM ChannelInfo",
        (err, result) => {
            if (err) 
            {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(200).send(result);
        }
    );
})

router.get("/getSalesOffices/", (req, res) =>{    
    db.all(
        "SELECT * FROM SalesOfficeInfo",
        (err, result) => {
            if (err) 
            {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(200).send(result);
        }
    );
})

router.get("/getSalesGroups/", (req, res) =>{    
    db.all(
        "SELECT * FROM SalesGroupInfo",
        (err, result) => {
            if (err) 
            {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(200).send(result);
        }
    );
})

router.get("/getUserFullnamesAndID/", (req, res) =>{    
    db.all(
        "SELECT id, FirstName, LastName FROM Users WHERE isDeleted = 0",
        (err, result) => {
            if (err) 
            {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(200).send(result);
        }
    );
})

module.exports = router;