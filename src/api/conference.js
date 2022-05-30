import { conference_instance } from "./http"
import store from "@/store/index.js"

export async function get_calendar(year) {
  return conference_instance.get("/calendar/" + year + "/schedules", {
    headers: {
      Authorization: "Bearer " + store.getters.getToken.access,
    },
  })
}

export async function delete_schedule(id) {
  return conference_instance.delete("/calendar/schedules/" + id, {
    headers: {
      Authorization: "Bearer " + store.getters.getToken.access,
    },
  })
}

export async function create_schedule(schedule) {
  return conference_instance.post("/calendar/schedule", schedule, {
    headers: {
      "Content-Type": `application/json`,
      Authorization: "Bearer " + store.getters.getToken.access,
    },
  })
}

export async function modify_schedule(schedule) {
  return conference_instance.put(
    "/calendar/schedules/" + schedule.id,
    schedule,
    {
      headers: {
        "Content-Type": `application/json`,
        Authorization: "Bearer " + store.getters.getToken.access,
      },
    },
  )
}
