import { NextApiRequest, NextApiResponse } from "next";
import renderBadge from "../../../../src/renderer/badge";

export default function handle(req: NextApiRequest, res: NextApiResponse) {
  const { label, value } = req.query;
  renderBadge(
    {
      label,
      value,
    },
    req,
    res
  );
}
