import dotenv from "dotenv"

export const DB_NAME = "feed-sense"
export const DOTENV_PATH = dotenv.config({
    path:"./.env"
})