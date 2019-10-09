const mongoose = require("mongoose");
const Progress = mongoose.model("Progress", { 
    goal: Number,
    total: String,
    weight: String, 
    milestone_1: Boolean,
    milestone_2: Boolean,
    milestone_3: Boolean,
    milestone_4: Boolean,
    milestone_5: Boolean,
    milestone_6: Boolean,
});

module.exports = Progress;