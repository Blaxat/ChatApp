const RFID = require('../models/rfidModel');
const mongoose = require('mongoose');
const { sendOTPByEmail } = require('../helpers/otp');

const createRFID = async (req, res) => {
    const { rfid, name, phone, email, password } = req.body;
    const userId = req.user._id;

    try {
        const existingRFID = await RFID.findOne({ user: userId });
        if (existingRFID) {
            return res.status(400).json({ error: 'User already has an RFID' });
        }

        const newRFID = await RFID.create({ rfid, name, phone, email, password, user: userId });
        res.status(201).json(newRFID);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getRFID = async (req, res) => {
    const userId = req.user._id;

    try {
        const rfid = await RFID.findOne({ user: userId });
        if (!rfid) {
            return res.status(404).json({ error: 'RFID not found' });
        }
        res.status(200).json(rfid);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateRFID = async (req, res) => {
    const userId = req.user._id;
    const updates = req.body;

    try {
        const rfid = await RFID.findOneAndUpdate({ user: userId }, updates, { new: true });
        if (!rfid) {
            return res.status(404).json({ error: 'RFID not found' });
        }
        res.status(200).json(rfid);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteRFID = async (req, res) => {
    const userId = req.user._id;

    try {
        const rfid = await RFID.findOneAndDelete({ user: userId });
        if (!rfid) {
            return res.status(404).json({ error: 'RFID not found' });
        }
        res.status(200).json({ message: 'RFID deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const requestOTP = async (req, res) => {
    const { phone } = req.body;
    console.log(req.body);
    try {
        const rfid = await RFID.findOne({ phone });
        if (!rfid) {
            return res.status(404).json({ error: 'User not found for this phone number' });
        }

        await sendOTPByEmail(rfid.email);
        rfid.checkinTimes.push(new Date());

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

const verifyRfid = async (req, res) => {
    const { rfid, password } = req.body;
    
    try {
        const Rfid = await RFID.findOne({ rfid });
        if (!Rfid) {
            return res.status(404).json({ error: 'User not found with this rfid' });
        }

        const isPasswordMatch = await Rfid.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        res.status(200).json({ message: 'Authentication Successful' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createRFID, getRFID, updateRFID, deleteRFID, requestOTP, verifyRfid };
