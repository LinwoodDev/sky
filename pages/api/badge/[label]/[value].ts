import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import ejs from "ejs";
import { join } from "path";

const template = ejs.compile(fs.readFileSync(join(process.cwd(), "templates", "badge", "default.svg"), { encoding: "utf8" }).toString());

export default function handle(req: NextApiRequest, res: NextApiResponse) {
    const { label, value } = req.query;
    // Trim the label and value
    const trimmedLabel = label.toString().trim();
    const trimmedValue = value.toString().trim();

    const result = template({ label: trimmedLabel, value: trimmedValue });
    res.setHeader("Content-Type", "image/svg+xml");
    res.status(200).end(result);
}