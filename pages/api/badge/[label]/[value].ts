
import { NextApiRequest, NextApiResponse } from "next";
import renderBadge from "../../../../src/renderer/badge";

export default function handle(req: NextApiRequest, res: NextApiResponse) {
    renderBadge({
        createdAt: new Date(),
        data: req.query,
        updatedAt: new Date(),
        description: "",
        name: "",
        type: "badge",
    }, req, res)
}