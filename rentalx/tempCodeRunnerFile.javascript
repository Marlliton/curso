const fs = require("fs")


fs.promises.stat("./tmp/avatar/79c001eae1e6b9efbe930b750802c7c4-photo_2022-12-07_09-49-15.jpg").then(r => {

  console.log(r)
})
