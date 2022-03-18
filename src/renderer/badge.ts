import { NextApiRequest, NextApiResponse } from "next";
import { Activity } from "../../lib/activity";
import ejs from "ejs";
import fs from "fs";
import { join } from "path";

export const template = ejs.compile(fs.readFileSync(join(process.cwd(), "templates", "badge", "default.svg"), { encoding: "utf8" }).toString());
export const fontData = fs.readFileSync(join(process.cwd(), "public", "fonts", "RobotoMono-Regular.ttf"));
export const fontDataUrl = `data:application/x-font-ttf;base64,${fontData.toString("base64")}`;

export default function renderBadge(data: any, req : NextApiRequest, res: NextApiResponse) {
    const { label, value } = data;
    res.setHeader("Content-Type", "image/svg+xml");
    const trimmedLabel = label.toString().trim();
    const trimmedValue = value.toString().trim();

    const fontName = "Roboto Mono";
    
    const result = template({ label: trimmedLabel, value: trimmedValue, fontName, fontDataUrl });
    res.status(200).end(result);
}