const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const userScheme = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    verified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userScheme.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 7);
  next();
});

module.exports = userScheme;
