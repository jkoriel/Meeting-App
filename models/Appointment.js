const { Model } = require("objection");

class Appointment extends Model {
  static get tableName() {
    return "appointments";
  }

  static get relationMappings() {
    const User = require("./User");
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "appointments.id",
          through: {
            // users_appointments is the join table.
            from: "users_appointments.appt_id",
            to: "users_appointments.user_id"
          },
          to: "users.id"
        }
      }
    };
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "body", "location", "time"],

      properties: {
        id: { type: "integer" },
        title: { type: "string" },
        body: { type: "string" },
        location: { type: "string" },
        time: { type: "string" }
      }
    };
  }
}

module.exports = Appointment;
