import { Router } from "express";
import multer from "multer";
import {
  uploadContactsCSV,
  getAllContacts,
  editContact,
  deleteContact,
} from "../controllers/contact.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload-csv", verifyToken, upload.single("file"), uploadContactsCSV);
router.post("/", verifyToken, getAllContacts);
router.put("/:id", verifyToken, editContact);
router.delete("/:id", verifyToken, deleteContact);

export default router;
