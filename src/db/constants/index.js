import path from 'node:path'

export const sortOrderList = ["asc", "desc"];
export const contactList = ["work", "home", "personal"]

export const ACCESS_TOKEN_LEFETIME = 15 * 60 * 1000;
export const REFRESH_TOKEN_LEFETIME = 30 * 24 * 60 * 60 * 1000;

export const SMTP = {
    SMTP_HOST: 'SMTP_HOST',
    SMTP_PORT: 'SMTP_PORT',
    SMTP_USER: 'SMTP_USER',
    SMTP_PASSWORD: 'SMTP_PASSWORD',
    SMTP_FROM: 'SMTP_FROM',
}

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const TEMP_UPLOAD_DIR = path.resolve("src", "temp");
export const PUBLIC_UPLOAD_DIR = path.resolve("src", "public");
export const PUBLIC_PHOTOS_DIR = path.resolve("src", "public", "photos");
