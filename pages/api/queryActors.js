import executeQuery from "../../lib/db";

const getAllActors = async (req, res) => {
    try {
        const result = await executeQuery({
            query: "SELECT * FROM actors LIMIT 10",
            //            values: [ email ],
        });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};

export default getAllActors;
