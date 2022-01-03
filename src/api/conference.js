import instance from "./http";

export async function get_calendar(year) {
    return instance.get("/calendar/" + year + "/schedules");
}

export async function delete_schedule(id) {
    return instance.delete("/calendar/schedules/" + id);
}