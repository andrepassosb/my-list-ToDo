const mongoose = require("mongoose");

const mongoAtlasUri = process.env.URI_MONGO_ATLAS;

async function main() {
  try {
    mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected !")
    );
  } catch (error) {
    console.log(error);
  }
}

main().catch((err) => console.log(err));

module.exports = mongoose;
