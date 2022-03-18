import { NextApiRequest, NextApiResponse } from "next";
import { Activity } from "../../lib/activity";

export default function renderCountdown(data: any, req : NextApiRequest, res: NextApiResponse) {
    const {countdownType, dateTime, days, hours, minutes, seconds} = data;
    res.setHeader("Content-Type", "text/plain");
    res.status(200).end(`${countdownType} ${dateTime} ${days} ${hours} ${minutes} ${seconds}`);
}