

import mongoose from "mongoose";

export function connection() {
    mongoose
      .connect("mongodb+srv://usefemad:1QWE23456789qwe@7mo.z4prwhk.mongodb.net")
      .then(() => console.log("db connected"))
      .catch((err) => console.log("db err"));

}

