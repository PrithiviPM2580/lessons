import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

userSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    await this.model("Post").deleteMany({ author: this._id });
    next();
  },
);

userSchema.statics.findByUserId = function (id) {
  return this.findById(id);
};

userSchema.query.active = function () {
  return this.where({ isActive: true });
};

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "author",
  justOne: true,
});

// 1. Unique email
userSchema.index({ email: 1 }, { unique: true });

// 2. Compound index for dashboard queries
userSchema.index({ role: 1, isActive: 1 });

// 3. Text index for search
userSchema.index({ firstName: "text", lastName: "text" });

// 4. Partial index (optional)
userSchema.index(
  { email: 1 },
  { unique: true, partialFilterExpression: { isActive: true } },
);

const User = mongoose.model("User", userSchema);
export default User;
