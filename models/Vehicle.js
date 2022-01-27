module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define(
    "Vehicle",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      tracking_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: "vehicles_tracking_id_unique",
      },
      vehicle_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      default_tracking_provider: {
        type: DataTypes.STRING(30),
        allowNull: true,
        defaultValue: "flespi_teltonika",
      },
    },
    {
      sequelize,
      tableName: "vehicles",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "vehicles_tracking_id_unique",
          unique: true,
          using: "BTREE",
          fields: [{ name: "tracking_id" }],
        },
        {
          name: "vehicles_vehicle_id_index",
          using: "BTREE",
          fields: [{ name: "vehicle_id" }],
        },
        {
          name: "vehicles_default_tracking_provider_index",
          using: "BTREE",
          fields: [{ name: "default_tracking_provider" }],
        },
      ],
    }
  );
  Vehicle.associate = (models) => {
    Vehicle.hasMany(models.VehicleBoundaryEvent, {
      as: "vehicleBoundaryEvents",
      foreignKey: "vehicle_id",
    });
    Vehicle.hasMany(models.VehicleTelemetry, {
      as: "vehicleTelemetry",
      foreignKey: "vehicle_id",
    });
  };
  return Vehicle;
};
