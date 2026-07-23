const MenuItemModel = require("../models/menuitemModel");

class MenuItemController {
  static async create(req, res) {
    try {
      const { category_id, name, description, price, is_available, image_url } =
        req.body;

      if (
        !category_id ||
        !name ||
        !description ||
        !price ||
        !is_available ||
        !image_url
      )
        return res.status(400).json({ message: "Required fields are missing" });

      const newMenuItem = await MenuItemModel.create({
        category_id,
        name,
        description,
        price,
        is_available,
        image_url,
      });

      res.status(201).json({ message: "Menu Items created successfully" });
    } catch (error) {
      console.error("Error while creating menu item", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAll(req, res) {
    try {
      const items = await MenuItemModel.findAll();

      if (!items || items.length === 0) {
        return res.status(404).json({ message: "No menu items found" });
      }

      res.status(200).json({ message: "Retrieved successfully", data: items });
    } catch (error) {
      console.error("Error occurred while retrieving menu items", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getById(req, res) {
    try {
      const { item_id } = req.params;
      const menus = await MenuItemModel.findById(item_id);
      if (!menus)
        return res.status(404).json({ message: "Menu items not found" });
      res.status(200).json({ message: "Retrived successfully", data: menus });
    } catch (error) {
      console.error({ message: "Error while retriving menu items", error });
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByCategory(req, res) {
    try {
      const { category_id } = req.params;
      const categories = await MenuItemModel.findByCategory(category_id);
      if (!categories || categories.length === 0)
        return res.status(404).json({ message: "Menu items not found" });
      res
        .status(200)
        .json({ message: "Retrived successfully", data: categories });
    } catch (error) {
      console.error({ message: "Error while retriving menu items", error });
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByName(req, res) {
    try {
      const { name } = req.params;
      const Names = await MenuItemModel.findByName(name);
      if (!Names || Names.length === 0)
        return res.status(404).json({ message: "Menu items not found" });
      res.status(200).json({ message: "Retrived successfully", data: Names });
    } catch (error) {
      console.error({ message: "Error while retriving menu items", error });
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByDescription(req, res) {
    try {
      const { description } = req.params;
      const Descriptions = await MenuItemModel.findByDescription(description);
      if (!Descriptions || Descriptions.length === 0)
        return res.status(404).json({ message: "Menu items not found" });
      res
        .status(200)
        .json({ message: "Retrived successfully", data: Descriptions });
    } catch (error) {
      console.error({ message: "Error while retriving menu items", error });
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByPrice(req, res) {
    try {
      const { price } = req.params;
      const Price = await MenuItemModel.findByPrice(price);
      if (!Price || Price.length === 0)
        return res.status(404).json({ message: "Menu items not found" });
      res.status(200).json({ message: "Retrived successfully", data: Price });
    } catch (error) {
      console.error({ message: "Error while retriving menu items", error });
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByAvailabilty(req, res) {
    try {
      const { is_available } = req.params;
      const Availabilty = await MenuItemModel.findByAvailability(is_available);
      if (!Availabilty || Availabilty.length === 0)
        return res.status(404).json({ message: "Menu items not found" });
      res
        .status(200)
        .json({ message: "Retrived successfully", data: Availabilty });
    } catch (error) {
      console.error({ message: "Error while retriving menu items", error });
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByImage(req, res) {
    try {
      const { image_url } = req.params;
      const Images = await MenuItemModel.findByImage(image_url);
      if (!Images || Images.length === 0)
        return res.status(404).json({ message: "Menu items not found" });
      res.status(200).json({ message: "Retrived successfully", data: Images });
    } catch (error) {
      console.error({ message: "Error while retriving menu items", error });
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateName(req, res) {
    try {
      const { item_id } = req.params;
      const { name } = req.body;
      const updatedName = await MenuItemModel.updateName(item_id, name);
      if (!updatedName)
        return res.status(404).json({ message: "Menu items not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error while updating menu items", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async Updatecategory(req, res) {
    try {
      const { item_id } = req.params;
      const { category_id } = req.body;
      const updatedCategory = await MenuItemModel.updatecategory(
        item_id,
        category_id,
      );
      if (!updatedCategory)
        return res.status(404).json({ message: "Menu items not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error while updating menu items", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdatecDescription(req, res) {
    try {
      const { item_id } = req.params;
      const { description } = req.body;
      const updatedDescriptions = await MenuItemModel.updateDescription(
        item_id,
        description,
      );
      if (!updatedDescriptions)
        return res.status(404).json({ message: "Menu items not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error while updating menu items", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdatePrice(req, res) {
    try {
      const { item_id } = req.params;
      const { price } = req.body;
      const updatedPrice = await MenuItemModel.updatePrice(item_id, price);
      if (!updatedPrice)
        return res.status(404).json({ message: "Menu items not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error while updating menu items", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateAvailability(req, res) {
    try {
      const { item_id } = req.params;
      const { is_available } = req.body;
      const updatedAvailabilty = await MenuItemModel.updateAvailability(
        item_id,
        is_available,
      );
      if (!updatedAvailabilty)
        return res.status(404).json({ message: "Menu items not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error while updating menu items", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateImage(req, res) {
    try {
      const { item_id } = req.params;
      const { image_url } = req.body;
      const updatedImage = await MenuItemModel.updateImage(item_id, image_url);
      if (!updatedImage)
        return res.status(404).json({ message: "Menu items not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error while updating menu items", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = MenuItemController;
