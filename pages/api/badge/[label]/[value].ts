import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import ejs from "ejs";
import { join } from "path";
import { createCanvas, GlobalFonts } from "@napi-rs/canvas";

GlobalFonts.registerFromPath(join(process.cwd(), 'fonts', 'Roboto.ttf'), 'Roboto')

const canvas = createCanvas(200, 200)
const template = ejs.compile(fs.readFileSync(join(process.cwd(), "templates", "badge", "default.svg"), { encoding: "utf8" }).toString());

const ctx = canvas.getContext('2d')

ctx.font = "28px Roboto";
export default function handle(req: NextApiRequest, res: NextApiResponse) {
    const { label, value } = req.query;
    // Render svg image


    const labelWidth = ctx.measureText(label.toString()).width;
    const valueWidth = ctx.measureText(value.toString()).width;

    const result = template({ label, value, labelWidth, valueWidth });
    res.setHeader("Content-Type", "image/svg+xml");
    res.status(200).end(result);
}