const MealPost = require("../../database/models/Meal");

module.exports = async (req, res) => {
    try {
        let highlight = false;
        if (req.body.highlight) highlight = true;
        await MealPost.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            mealCount: req.body.mealCount,
            highlight,
        }, { new: true });
        req.flash("success", "Meal Package Updated successfully")
        res.redirect("/packages");
    } catch (error) {
        console.log("[controller:product:storeMealPackage] e", error);
        req.flash("fail", "Failed to update Meal Package");
        res.redirect("/packages");
    }
}