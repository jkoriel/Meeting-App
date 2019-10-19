const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    const Appointment = require("./Appointment");

    return {
      appointments: {
        relation: Model.ManyToManyRelation,
        modelClass: Appointment,
        join: {
          from: "users.id",
          through: {
            // users_appointments is the join table.
            from: "users_appointments.user_id",
            to: "users_appointments.appt_id"
          },
          to: "appointments.id"
        }
      }
    };
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "company", "email", "phone", "address", "password"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        company: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        address: { type: "string" },
        password: { type: "string", minLength: 1, maxLength: 255 }
      }
    };
  }
}

module.exports = User;
