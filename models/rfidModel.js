const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const rfidSchema = new mongoose.Schema({
    rfid: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    checkinTimes: {
        type: [Date], 
        default: [], 
    },
}, { timestamps: true }); 

rfidSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(SALT_ROUNDS);
            this.password = await bcrypt.hash(this.password, salt);
            this.checkinTimes.push(new Date());
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

rfidSchema.methods.comparePassword = async function(candidatePassword) {
    const passwordMatch = await bcrypt.compare(candidatePassword, this.password);
    if (passwordMatch) {
        this.checkinTimes.push(new Date()); 
        await this.save();
    }
    return passwordMatch;
};

const RFID = mongoose.model('RFID', rfidSchema);

module.exports = RFID;
