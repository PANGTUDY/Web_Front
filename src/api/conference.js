import instance from "./http";

export async function get_calendar(year) {
    return instance.get("/calendar/" + year + "/schedules");
}