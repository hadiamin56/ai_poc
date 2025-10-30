





//last change for dlt botton in sha allah

const express = require("express");
const router = express.Router();
const ExcelJS = require("exceljs");
const Invoice = require("../models/Invoice");
const User = require("../models/Users");
const authMiddleware = require("../middleware/authMiddleware");

/* =========================================================
   📦 ADMIN EXPORT — All Invoices
   ========================================================= */
router.get("/invoices/export", authMiddleware, async (req, res) => {
  try {
    const { type } = req.query; // ?type=deleted or ?type=active (default)
    const isDeleted = type === "deleted";
    const user = req.user;

    let invoices = [];

    // =============== 🔹 ADMIN LOGIC ===============
    if (user.role === "admin") {
      const subUsers = await User.find({ parentBusinessId: user.id });
      const subUserIds = subUsers.map((u) => u._id);

      invoices = await Invoice.find({
        uploadedBy: { $in: [...subUserIds, user.id] },
        isDeleted: isDeleted,
      }).populate("uploadedBy", "email businessName");
    } else {
      // fallback so normal users don't break this route
      invoices = await Invoice.find({
        uploadedBy: user.id,
        $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
      });
    }

    // 🧾 Create workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(
      isDeleted ? "Deleted Invoices" : "Active Invoices"
    );

    worksheet.columns = [
      { header: "Invoice ID", key: "_id", width: 25 },
      { header: "Invoice Number", key: "invoiceNumber", width: 20 },
      { header: "Invoice Date", key: "invoiceDate", width: 20 },
      { header: "Vendor Name", key: "vendorName", width: 25 },
      { header: "Total Amount", key: "totalAmount", width: 15 },
      { header: "Tax Amount", key: "taxAmount", width: 15 },
      { header: "Status", key: "status", width: 15 },
      { header: "Uploaded By (Business)", key: "uploadedBy", width: 30 },
      { header: "Uploaded By Name", key: "uploadedByName", width: 25 },
      { header: "Created At", key: "createdAt", width: 25 },
    ];

    invoices.forEach((inv) => {
      worksheet.addRow({
        _id: inv._id.toString(),
        invoiceNumber: inv.invoiceNumber || "",
        invoiceDate: inv.invoiceDate
          ? inv.invoiceDate.toISOString().split("T")[0]
          : "",
        vendorName: inv.vendorName || "",
        totalAmount: inv.totalAmount || 0,
        taxAmount: inv.taxAmount || 0,
        status: inv.isDeleted ? "Deleted" : "Active",
        uploadedBy:
          inv.uploadedBy?.businessName || inv.uploadedBy?.email || "N/A",
        uploadedByName: inv.uploadedByName || "",
        createdAt: inv.createdAt
          ? inv.createdAt.toISOString().split("T")[0]
          : "",
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoices_${isDeleted ? "deleted" : "active"}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("❌ Error exporting invoices:", error);
    res.status(500).json({ error: "Failed to export invoices" });
  }
});

/* =========================================================
   👤 USER EXPORT — Only their active invoices
   ========================================================= */
router.get("/my-invoices/export", authMiddleware, async (req, res) => {
  try {
    const user = req.user;

    // ✅ Fetch only active or old invoices (no isDeleted field)
    const invoices = await Invoice.find({
      uploadedBy: user.id,
      $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
    }).sort({ createdAt: -1 });

    if (!invoices || invoices.length === 0) {
      return res.status(404).json({ message: "No active invoices found" });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("My Invoices");

    worksheet.columns = [
      { header: "Invoice ID", key: "_id", width: 25 },
      { header: "Invoice Number", key: "invoiceNumber", width: 20 },
      { header: "Invoice Date", key: "invoiceDate", width: 20 },
      { header: "Vendor Name", key: "vendorName", width: 25 },
      { header: "Total Amount", key: "totalAmount", width: 15 },
      { header: "Tax Amount", key: "taxAmount", width: 15 },
      { header: "Status", key: "status", width: 15 },
      { header: "Created At", key: "createdAt", width: 25 },
    ];

    invoices.forEach((inv) => {
      worksheet.addRow({
        _id: inv._id.toString(),
        invoiceNumber: inv.invoiceNumber || "",
        invoiceDate: inv.invoiceDate
          ? inv.invoiceDate.toISOString().split("T")[0]
          : "",
        vendorName: inv.vendorName || "",
        totalAmount: inv.totalAmount || 0,
        taxAmount: inv.taxAmount || 0,
        status: inv.isDeleted ? "Deleted" : "Active",
        createdAt: inv.createdAt
          ? inv.createdAt.toISOString().split("T")[0]
          : "",
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=my_invoices.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("❌ Error exporting my invoices:", error);
    res.status(500).json({ error: "Failed to export my invoices" });
  }
});

module.exports = router;
