const cloudinary = require("cloudinary");

// config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// req.files.file.path
exports.upload = async (req, res) => {
    try{   
        console.log(process.env.CLOUDINARY_API_KEY)
        console.log(process.env.CLOUDINARY_CLOUD_NAME)
        console.log(process.env.CLOUDINARY_API_SECRET)
        let result = await cloudinary.uploader.upload(req.body.image, {
            public_id: `${Date.now()}`,
            resource_type: "auto", // jpeg, png
          });
          console.log(result.public_id,result.secure_url);
          res.send({
            public_id: result.public_id,
            url: result.secure_url,
          });
    }
    catch(err){
        console.log(err.message)
        res.send({message:err.message});
    }

};

exports.remove = (req, res) => {
  let image_id = req.params.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.send({ success: false, err });
    res.send("ok");
  });
};