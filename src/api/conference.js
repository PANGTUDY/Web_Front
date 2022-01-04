import instance from "./http";

export async function get_calendar(year) {
    return instance.get("/calendar/" + year + "/schedules");
}

export async function delete_schedule(id) {
    return instance.delete("/calendar/schedules/" + id);
}

export async function create_schedule(schedule) {
    console.log(schedule)
    return instance.post("/calendar/schedule", schedule, {
        headers: {
            'Content-Type': `application/json`,
        },
    });
}