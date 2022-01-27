module.exports = (sequelize, DataTypes) => {
  const VehicleBoundaryEvent = sequelize.define(
    "VehicleBoundaryEvent",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      vehicle_telemetry_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: "VehicleTelemetry",
          key: "id",
        },
      },
      vehicle_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: "Vehicle",
          key: "id",
        },
      },
      boundary_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: "Boundary",
          key: "id",
        },
      },
      detected_event: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      position_latitude: {
        type: DataTypes.DOUBLE(14, 10),
        allowNull: true,
      },
      position_longitude: {
        type: DataTypes.DOUBLE(14, 10),
        allowNull: true,
      },
      detected_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "vehicle_boundary_events",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "vehicle_boundary_events_vehicle_telemetry_id_index",
          using: "BTREE",
          fields: [{ name: "vehicle_telemetry_id" }],
        },
        {
          name: "vehicle_boundary_events_vehicle_id_index",
          using: "BTREE",
          fields: [{ name: "vehicle_id" }],
        },
        {
          name: "vehicle_boundary_events_boundary_id_index",
          using: "BTREE",
          fields: [{ name: "boundary_id" }],
        },
      ],
    }
  );
  VehicleBoundaryEvent.associate = (models) => {
    VehicleBoundaryEvent.belongsTo(models.Boundary, {
      as: "boundary",
      foreignKey: "boundary_id",
    });
    VehicleBoundaryEvent.belongsTo(models.Vehicle, {
      as: "vehicle",
      foreignKey: "vehicle_id",
    });
    VehicleBoundaryEvent.belongsTo(models.VehicleTelemetry, {
      as: "vehicleTelemetry",
      foreignKey: "id",
    });
  };
  return VehicleBoundaryEvent;
};
