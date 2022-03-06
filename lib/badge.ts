import fs from "fs";
import ejs from "ejs";
import { join } from "path";

export const constructBadgeLink = (label: string, value: string): string => {
    const labelEncoded = encodeURIComponent(label)
    const valueEncoded = encodeURIComponent(value)
    return `/api/badge/${labelEncoded}/${valueEncoded}`
}