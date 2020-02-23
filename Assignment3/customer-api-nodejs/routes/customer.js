const router = require("express").Router();
const multer = require("multer");
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now().toString() + file.originalname);
    },
});
const upload = multer({ storage: storage });

const fs = require('fs');
const { check, validationResult } = require('express-validator');

const customer = require('./../models/customer');

// Get All Customer. It calls getCustomer() to perform action.
router.get("/",
    (req, res) => getCustomer(req, res))

// Get 1 Customer by id. It calls getCustomerById() to perform action.
router.get("/:id",
    (req, res) => getCustomerById(req, res))

// Post Customer with Image data. 
// It receives Form Data in request body.
// If form body has image or any file info, it will save upload it under uploads.
// After file uploadimg, it will create file/image URL and store this URL in mongo db along with other details.
// This URL will be used by img src on UI to get image from backend server where image is stored.
//It calls createCustomerWithImage() to perform action.
router.post("/",
    upload.single('imageFile'),
    (req, res) => createCustomerWithImage(req, res))

// Update Customer. //It calls updateCustomer() to perform action.
router.put("/:id", (req, res) => updateCustomer(req, res))

// Delete Customer. //It calls deleteCustomer() to perform action.
router.delete("/:id", (req, res) => deleteCustomer(req, res))

////////////////////////   Core Functionality //////////////////////////

// This Method helps to get All the Customer.
function getCustomer(req, res) {
    try {
        customer.find(function (error, result) {
            let bSuccess = true;
                // If Error.
                if (error) {
                    bSuccess=false;
                }

                res.status(bSuccess?200:500).json({
                    status: bSuccess,
                    message: bSuccess?"Success":"Error",
                    result: result,
                });
        });
    }
    catch{
        res.status(500).json({
            status: false,
            message: "Bad Request!!"
        });
    }
}

// This Method helps to get the Customer by Id.
function getCustomerById(req, res) {
    try {
        customer.findById({ _id: req.params.id },
            function (error, result) {
                let bSuccess = true;
                // If Error.
                if (error) {
                    bSuccess=false;
                }

                res.status(bSuccess?200:500).json({
                    status: bSuccess,
                    message: bSuccess?"Success":"Error",
                    result: result,
                });
            });
    }
    catch{
        res.status(500).json({
            status: false,
            message: "Bad Request!!"
        });
    }
}

// This Method helps to add one customer.
function createCustomer(req, res) {
    try {
        // Check Validation errors from req body.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({
                status: false,
                message: "Form Validation Error!!",
                errors: errors.array(),
            });

        }
        console.log(req.body);

        var tempCustomer = new customer({
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            hobbies: req.body.hobbies,

        })

        tempCustomer.save(
            function (error, result) {
                let bSuccess = true;
                // If Error.
                if (error) {
                    bSuccess=false;
                }

                res.status(bSuccess?200:500).json({
                    status: bSuccess,
                    message: bSuccess?"Success":"Error",
                    result: result,
                });
            }
        );
    }
    catch{
        res.status(500).json({
            status: false,
            message: "Bad Request!!"
        });
    }
}

// This Method helps to add one customer.
function createCustomerWithImage(req, res) {
    try {
        let imageUrl = req.file ?
            process.env.HOST_NAME + process.env.PORT + '/image/' + req.file.filename
            : "";

        console.log(req.body);

        var tempCustomer = new customer({
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            hobbies: req.body.hobbies,
            imageUrl: imageUrl
        })

        tempCustomer.save(
            function (error, result) {
                let bSuccess = true;
                // If Error.
                if (error) {
                    bSuccess=false;
                }

                res.status(bSuccess?200:500).json({
                    status: bSuccess,
                    message: bSuccess?"Success":"Error",
                    result: result,
                });
            }
        );
    }
    catch{
        res.status(500).json({
            status: false,
            message: "Bad Request!!"
        });
    }
}

/// This Method helps to Update Customer.
function updateCustomer(req, res) {
    try {
        customer.updateOne({ _id: req.params.id },
            req.body,
            function (error, result) {
                let bSuccess = true;
                // If Error.
                if (error) {
                    bSuccess=false;
                }

                res.status(bSuccess?200:500).json({
                    status: bSuccess,
                    message: bSuccess?"Success":"Error",
                    result: result,
                });
            });
    }
    catch{
        res.status(500).json({
            status: false,
            message: "Bad Request!!"
        });
    }
}

// This Method helps to remove one Customer by Id.
function deleteCustomer(req, res) {
    try {
        customer.findByIdAndRemove({ _id: req.params.id },
            function (error, result) {
                let bSuccess = true;
                // If Error.
                if (error) {
                    bSuccess=false;
                }

                res.status(bSuccess?200:500).json({
                    status: bSuccess,
                    message: bSuccess?"Success":"Error",
                    result: result,
                });
            });
    }
    catch {
        res.status(500).json({
            status: false,
            message: "Bad Request!!"
        });
    }
}

module.exports = router;