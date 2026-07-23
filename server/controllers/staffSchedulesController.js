const StaffModel = require("../models/staffSchedulesModel");

class StaffController {
  static async create(req, res) {
    try {
      const { user_id, shift_date, start_time, end_time } = req.body;
      if (!user_id || !shift_date || !start_time || !end_time)
        return res
          .status(400)
          .json({ message: "Required fields musst be fill in" });

      const newTable = await StaffModel.create({
        user_id,
        shift_date,
        start_time,
        end_time,
      });

      res.status(201).json({ message: "schedules created successfullyd" });
    } catch (error) {
      console.error("Error creating schedules", error);
      res.status(500).json("Internal server error");
    }
  }

  static async getById(req, res) {
    try {
      const { schedule_id } = req.params;
      const schedule = await StaffModel.findById(schedule_id);
      if (!schedule)
        return res.status(404).json({ message: "Schedule not found" });
      res
        .status(200)
        .json({ message: "Schedule retrived successfully", data: schedule });
    } catch (error) {
      console.error("Error while retriving schedule", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByUser(req, res) {
    try {
      const { user_id } = req.params;
      const user = await StaffModel.findByUser(user_id);
      if (!user || user.length === 0)
        return res.status(404).json({ message: "Schedule not found" });
      res.status(200).json({ message: "Schedule retrived successfully" });
    } catch (error) {
      console.error("Error while retriving schedule", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByStart(req, res) {
    try {
      const { start_time } = req.params;
      const start = await StaffModel.findByStart(start_time);
      if (!start || start.length === 0)
        return res.status(404).json({ message: "Schedule not found" });
      res.status(200).json({ message: "Schedule retrived successfully" });
    } catch (error) {
      console.error("Error while retriving schedule", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByDate(req, res) {
    try {
      const { shift_date } = req.params;
      const shift = await StaffModel.findByDate(shift_date);
      if (!shift || shift.length === 0)
        return res.status(404).json({ message: "Schedule not found" });
      res.status(200).json({ message: "Schedule retrived successfully" });
    } catch (error) {
      console.error("Error while retriving schedule", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByEnd(req, res) {
    try {
      const { end_time } = req.params;
      const end = await StaffModel.findByEnd(end_time);
      if (!end || end.length === 0)
        return res.status(404).json({ message: "Schedule not found" });
      res.status(200).json({ message: "Schedule retrived successfully" });
    } catch (error) {
      console.error("Error while retriving schedule", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateUser(req, res) {
    try {
      const { schedule_id } = req.params;
      const { user_id } = req.body;
      const updatedUser = await StaffModel.UpdateUser(schedule_id, user_id);
      if (!updatedUser)
        return res.status(404).json({ message: "Schedule not found" });
      res.status(200).json({ message: "Schedule retrived successfully" });
    } catch (error) {
      console.error("Error occured while updating schedule", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateShift(req, res) {
    try {
      const { schedule_id } = req.params;
      const { shift_date } = req.body;
      const updatedShift = await StaffModel.UpdateShift(
        schedule_id,
        shift_date,
      );
      if (!updatedShift)
        return res.status(404).json({ message: "Schedule not found" });
      res.status(200).json({ message: "Schedule retrived successfully" });
    } catch (error) {
      console.error("Error occured while updating schedule", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdatedStart(req, res) {
    try {
      const { schedule_id } = req.params;
      const { start_time } = req.body;
      const updatedStart = await StaffModel.UpdateStart(
        schedule_id,
        start_time,
      );
      if (!updatedStart)
        return res.status(404).json({ message: "Schedule not found" });
      res.status(200).json({ message: "Schedule retrived successfully" });
    } catch (error) {
      console.error("Error occured while updating schedule", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdatedEnd(req, res) {
    try {
      const { schedule_id } = req.params;
      const { end_time } = req.body;
      const updatedEnd = await StaffModel.UpdateEnd(schedule_id, end_time);
      if (!updatedEnd)
        return res.status(404).json({ message: "Schedule not found" });
      res.status(200).json({ message: "Schedule retrived successfully" });
    } catch (error) {
      console.error("Error occured while updating schedule", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = StaffController;
