import { NextApiRequest, NextApiResponse } from "next";
import { Activity } from "../../lib/activity";
import renderBadge from "../../src/renderer/badge";
import renderCountdown from "../../src/renderer/countdown";

export default function handle(req: NextApiRequest, res: NextApiResponse) {
    const input = req.query.data.toString();
    if (!input) {
        res.status(400).json({
            error: 'No data'
        });
        return
    }
    // Data from base64
    const dataBuffer = Buffer.from(input, 'base64');
    // Decode the data
    const dataDecoded = dataBuffer.toString('utf8');
    // Parse the data
    const activity = JSON.parse(dataDecoded);
    // Render the data
    switch (activity.type) {
        case 'badge':
            renderBadge(activity.data, req, res);
            break;
        case 'countdown':
            renderCountdown(activity.data, req, res);
            break;
        default:
            res.status(400).json({
                error: 'Unknown type'
            });
    }
}
