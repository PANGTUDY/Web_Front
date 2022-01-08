import boardInstance from "./http";

export async function get_calendar(year) {
    return boardInstance.get("/calendar/" + year + "/schedules");
}