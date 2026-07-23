const ReservationModel = require("../models/reservationModel");

class ReservationController {
  static async create(req, res) {
    try {
      const {
        customer_name,
        customer_phone,
        table_id,
        reservation_datetime,
        num_guests,
        status,
      } = req.body;
      if (
        !customer_name ||
        !customer_phone ||
        !table_id ||
        !reservation_datetime ||
        !num_guests ||
        !status
      )
        return res.status(400).json({ message: "Required fields are missing" });
      const newReservation = await ReservationModel.create({
        customer_name,
        customer_phone,
        table_id,
        reservation_datetime,
        num_guests,
        status,
      });
      res.status(201).json({ message: "Reservation created successfully" });
    } catch (error) {
      console.error("Error while creating reservation", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getById(req, res) {
    try {
      const { reservation_id } = req.params;
      const reservation = await ReservationModel.findById(reservation_id);
      if (!reservation)
        return res.status(404).json({ message: "Reservation not found" });
      res.status(200).json({
        message: "Reservation retrived successfully",
        data: reservation,
      });
    } catch (error) {
      console.error("Error while retriving", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByName(req, res) {
    try {
      const { customer_name } = req.params;
      const name = await ReservationModel.findByName(customer_name);
      if (!name || name.length === 0)
        return res.status(404).json({ message: "Reservation not found" });

      res.status(200).json({
        message: "Reservation retrieved successfully",
        data: name,
      });
    } catch (error) {
      console.error("Error while retrieving", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByContact(req, res) {
    try {
      const { customer_phone } = req.params;
      const phone = await ReservationModel.findByContact(customer_phone);
      if (!phone || phone.length === 0)
        return res.status(404).json({ message: "Reservation not found" });

      res.status(200).json({
        message: "Reservation retrieved successfully",
        data: phone,
      });
    } catch (error) {
      console.error("Error while retrieving", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByDate(req, res) {
    try {
      const { reservation_datetime } = req.params;
      const dateRecords =
        await ReservationModel.findByDate(reservation_datetime);
      if (!dateRecords || dateRecords.length === 0)
        return res.status(404).json({ message: "Reservation not found" });

      res.status(200).json({
        message: "Reservation retrieved successfully",
        data: dateRecords,
      });
    } catch (error) {
      console.error("Error while retrieving", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByTable(req, res) {
    try {
      const { table_id } = req.params;
      const table = await ReservationModel.findByTable(table_id);
      if (!table || table.length === 0)
        return res.status(404).json({ message: "Reservation not found" });

      res.status(200).json({
        message: "Reservation retrieved successfully",
        data: table,
      });
    } catch (error) {
      console.error("Error while retrieving", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByGuests(req, res) {
    try {
      const { num_guests } = req.params;
      const guests = await ReservationModel.findByGuests(num_guests);
      if (!guests || guests.length === 0)
        return res.status(404).json({ message: "Reservation not found" });

      res.status(200).json({
        message: "Reservation retrieved successfully",
        data: guests,
      });
    } catch (error) {
      console.error("Error while retrieving", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByStatus(req, res) {
    try {
      const { status } = req.params;
      const stat = await ReservationModel.findByStatus(status);
      if (!stat || stat.length === 0)
        return res.status(404).json({ message: "Reservation not found" });

      res.status(200).json({
        message: "Reservation retrieved successfully",
        data: stat,
      });
    } catch (error) {
      console.error("Error while retrieving", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateName(req, res) {
    try {
      const { reservation_id } = req.params;
      const { customer_name } = req.body;
      const UpdatedName = await ReservationModel.UpdateName(
        reservation_id,
        customer_name,
      );
      if (!UpdatedName)
        return res.status(404).json({ message: "Reservation not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error while updating reservation", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateContact(req, res) {
    try {
      const { reservation_id } = req.params;
      const { customer_phone } = req.body;
      const UpdatedPhone = await ReservationModel.UpdatePhone(
        reservation_id,
        customer_phone,
      );
      if (!UpdatedPhone)
        return res.status(404).json({ message: "Reservation not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error while updating reservation", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateTable(req, res) {
    try {
      const { reservation_id } = req.params;
      const { table_id } = req.body;
      const UpdatedTable = await ReservationModel.UpdateTable(
        reservation_id,
        table_id,
      );
      if (!UpdatedTable)
        return res.status(404).json({ message: "Reservation not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error while updating reservation", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateDate(req, res) {
    try {
      const { reservation_id } = req.params;
      const { reservation_datetime } = req.body;
      const UpdatedDate = await ReservationModel.UpdateDate(
        reservation_id,
        reservation_datetime,
      );
      if (!UpdatedDate)
        return res.status(404).json({ message: "Reservation not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error while updating reservation", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateNum(req, res) {
    try {
      const { reservation_id } = req.params;
      const { num_guests } = req.body;
      const UpdatedNum = await ReservationModel.UpdateNum(
        reservation_id,
        num_guests,
      );
      if (!UpdatedNum)
        return res.status(404).json({ message: "Reservation not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error while updating reservation", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateStatus(req, res) {
    try {
      const { reservation_id } = req.params;
      const { status } = req.body;
      const UpdatedStatus = await ReservationModel.UpdateStatus(
        reservation_id,
        status,
      );

      if (!UpdatedStatus)
        return res.status(404).json({ message: "Reservation not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error while updating reservation", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = ReservationController;
