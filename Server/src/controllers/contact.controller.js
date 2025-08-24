import { Contact } from "../models/contact.model.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";
import csv from "csv-parser";
import fs from "fs";

export const uploadContactsCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const contacts = [];
  try {
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => {
        // Expecting columns: name, email, phone, company, role
        contacts.push({
          name: row.Name || row.name,
          email: row.Email || row.email,
          phone: row.Phone || row.phone,
          company: row.Company || row.company,
          role: row.Role || row.role,
          createdBy: req.user._id,
        });
      })
      .on("end", async () => {
        try {
          const created = await Contact.insertMany(contacts);
          fs.unlinkSync(req.file.path); // Clean up uploaded file
          res.status(201).json(new ApiResponce(201, created, "Contacts uploaded"));
        } catch (err) {
          res.status(500).json({ message: "Failed to save contacts" });
        }
      });
  } catch (error) {
    res.status(500).json({ message: "Failed to process CSV" });
  }
};

// Get all contacts for the logged-in user
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ createdBy: req.user._id });
    res.status(200).json(new ApiResponce(200, contacts, "Fetched all contacts"));
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
};

// Edit a contact by ID
export const editContact = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const updated = await Contact.findOneAndUpdate(
      { _id: id, createdBy: req.user._id },
      update,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(new ApiResponce(200, updated, "Contact updated"));
  } catch (error) {
    res.status(500).json({ message: "Failed to update contact" });
  }
};

// Delete a contact by ID
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Contact.findOneAndDelete({ _id: id, createdBy: req.user._id });
    if (!deleted) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(new ApiResponce(200, deleted, "Contact deleted"));
  } catch (error) {
    res.status(500).json({ message: "Failed to delete contact" });
  }
};
